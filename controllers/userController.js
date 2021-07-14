const router = require("express").Router();
const { UserModel } = require('../models');
// const { CredentialModel } = require('../models')
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');
const validateRole = require('../middleware/validate-role');


// ! authenticated routes

/*
============================
    Register User
============================
*/

router.post('/register', async(req, res)=>{
    let { firstName, lastName, email, password, role  } = req.body.user;
    try {
        const User = await UserModel.create({
            firstName,
            lastName,
            fullName: (firstName + ' ' + lastName),
            email,
            password: bcrypt.hashSync(password, 13),
            role: ('User')
        });

        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})

        res.status(201).json({
            msg: 'User successfully registered!',
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError){
            res.status(409).json({
                msg: 'Email already registered! Login instead?'
            });
        } else {
            res.status(500).json({
                msg: `Registration failed due to ${err}`
            })
        }
    }
});

/*
============================
        Login User
============================
*/

router.post('/login', async (req, res) =>{
    let { email, password } = req.body.user;

    try {
        let loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });

        if(loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if(passwordComparison){
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24})
                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    msg: `Incorrect email or password ${err}`
                });
            }
        } else {
            res.status(401).json({
                msg: `Incorrect email or password ${err}`
            })
        }
    } catch (err) {
        res.status(500).json({
            msg: `User login failed ${err}`
        })
    }
});

/*
============================
    User Profile Get by ID
============================
*/

router.get('/view/:id', async(req, res)=>{
    const { id } = req.params;
    try {
        const thisUser = await UserModel.findOne({
            where: { id: id},
            include: [
                {
                    model: CredentialModel
                }
            ]
        });
        if(thisUser !== null ){
            res.status(200).json(thisUser)
        } else {
            res.status(404).json({ message: 'No such user exists.'})
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
===============================
    Get All Users 
===============================
*/

router.get('/', async(req, res)=>{
    try{
        const allUsers = await UserModel.findAll({
            // include: [
            //     {
            //         model: CredentialModel
            //     }
            // ]
        });
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({
            msg: `Oh no! Server error: ${err}`
        })
    }
})

/*
===============================
    Get All Users by Specialty
===============================
*/

router.get('/view/:specialty', async(req, res)=>{
    try{
        const allUsers = await UserModel.findAll({
            include: [
                {
                    model: CredentialModel
                }
            ]
        });
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({
            msg: `Oh no! Server error: ${err}`
        })
    }
})

/*
===============================
    Update Logged In User
===============================
*/

router.put('/edit', validateSession, async(req, res)=>{
    try {
        const { firstName, lastName, email, password } = req.body;

        const updatedUser = await UserModel.update({
            firstName,
            lastName,
            email,
            password,
            // role,
            }, {where: {id: req.user.id}
        });
        res.status(200).json({
            msg: `User updated`,
            updatedUser
        });
    } catch (err) {
        res.status(500).json({msg: `Error: ${err}`})
    }
})

/*
===============================
    Delete Logged In User
===============================
*/
router.delete('/delete', validateSession, async(req, res)=>{

    try {
        // const deletedCredential = await CredentialModel.destroy({
        //     where: { userId: req.user.id }
        // });
        const deletedUser = await UserModel.destroy({
            where: { id: req.user.id},
        });
        res.status(200).json({
            msg: `User deleted (sad)`,
            deletedUser: deletedUser,
            // deletedCredential: deletedCredential == 0? `no credentials to delete` : deletedCredential,
        })
    } catch (err) {
        res.status(500).json({
            msg: `Error: ${err}`
        })
    }
})

/*
===============================
    ADMIN Edit User
===============================
*/
router.put('/edit/:id/admin', validateRole, async(req, res)=>{
    const { id } = req.params
    try {
        const { firstName, lastName, email, password, } = req.body;

        const updatedUser = await UserModel.update({
            firstName,
            lastName,
            email,
            password,
            // role,
            }, {where: {id: id}
        });
        res.status(200).json({
            msg: `User updated`,
            updatedUser
        });
    } catch (err) {
        res.status(500).json({msg: `Error: ${err}`})
    }
})



/*
===============================
    ADMIN Delete User
===============================
*/
router.delete('/delete/:id/admin', validateRole, async(req, res)=>{
    const { id } = req.params;
    
    try {
        // const deletedCredential = await CredentialModel.destroy({
        //     where: { userId: req.user.id }
        // });
        const deletedUser = await UserModel.destroy({
            where: { id: id},
        });
        res.status(200).json({
            msg: `User deleted (sad)`,
            deletedUser: deletedUser,
            // deletedCredential: deletedCredential == 0? `no credentials to delete` : deletedCredential,
        })
    } catch (err) {
        res.status(500).json({
            msg: `Error: ${err}`
        })
    }
})

module.exports = router;
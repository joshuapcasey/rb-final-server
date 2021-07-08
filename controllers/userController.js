const router = require("express").Router();
const { UserModel } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post("/register", async (req, res) => {
    const { email, password} = req.body.user;
    try {
    const User = await UserModel.create({
        email,
        password: bcrypt.hashSync(password, 13)
    });
    const token = jwt.sign(
        {id: User.id},
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 }
        );

    res.status(201).json({
        msg: 'User successfully registered!',
        user: User,
        sessionToken: token
    });

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: "Failed to register user",
            });
        }
    }
});

router.post("/login", async (req, res) => {
    const { email, password} = req.body.user;

    try {
        const loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
    });

    if (loginUser) {

        const passwordComparison = await bcrypt.compare(password, loginUser.password);

        if (passwordComparison) {
            
            const token = jwt.sign(
                {id: loginUser.id},
                process.env.JWT_SECRET,
                { expiresIn: 60 * 60 * 24 }
                );
    
            res.status(200).json({
                user: loginUser,
                message: "User successfully logged in!",
                sessionToken: token
            });
        } else {
            res.status(401).json({
                message: 'Incorrect email or password'
            });
        }
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            });
        }
        } catch (error) {
        res.status(500).json({
            message:"Failed to log user in"
        })
    }
});


// ! authenticated routes


// let bOne = bcrypt.hashSync('password123', 13);
// let bTwo = bcrypt.hashSync('abc123', 13);
// console.log('B-ONE: ', bOne);
// console.log('B-TWO: ', bTwo);
// console.log('One to Two SAME?: ', bcrypt.compareSync(bOne, bTwo));
// console.log('One to String SAME?: ', bcrypt.compareSync('abc123', bTwo));

// router.post('/register', async (req, res) => {
//     const { firstName, lastName, email, password
//     } = req.body;

//     try {
//         const User = await UserModel.create({
//             firstName,
//             lastName,
//             email,
//             password: bcrypt.hashSync(password, 13)
//         })
//         const token = jwt.sign(
//             { id: User.id, },
//             process.env.JWT_SECRET,
//             { expiresIn: 60 * 60 * 12 }
//         )

//         res.status(201).json({
//             msg: 'User Registered!',
//             user: User,
//             sessionToken: token
//         })
//     } catch (err) {
//         if(err instanceof UniqueConstraintError){
//             res.status(409).json({
//                 msg: `Email already in use.`
//             });
//         } else {
//             res.status(500).json({
//                 error: `Failed to register user: ${err}`
//             })
//         }
//     }
// });

module.exports = router;
const router = require("express").Router();
const {UserModel} = require('../models');

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { UniqueConstraintError } = require('sequelize');

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
//         const newUser = await UserModel.create({
//             firstName,
//             lastName,
//             email,
//             password: bcrypt.hashSync(password, 13)
//         })
//         const token = jwt.sign(
//             { id: newUser.id, },
//             process.env.JWT_SECRET,
//             { expiresIn: 60 * 60 * 12 }
//         )

//         res.status(201).json({
//             msg: 'User Registered!',
//             user: newUser,
//             token
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

router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route!')
});

router.get('/about', (req, res) => {
    res.send('This is the about route!')
});

router.post("/register", async (req, res) => {

    UserModel.create({
        email: "Newuser@email.com",
        password: "isThisWorking"
    })
})

// router.post("/register", async (req, res) => {

//     let { email, password} = req.body.user;
//     UserModel.create({
//         email,
//         password
//     })
// });

module.exports = router;
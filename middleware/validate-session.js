require('dotenv').config()
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');

//! Refactored Module Code Removing "Bearer"
const validateSession = async(req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next()
    } else if (req.headers.authorization) {
        const {authorization} = req.headers;
        const payload = authorization 
        ? jwt.verify(authorization, process.env.JWT_SECRET) 
        : undefined
        
        // console.log("payload -->", payload);    

        if(payload) {
            const foundUser = await UserModel.findOne({
                where: { id: payload.id }
            });

            // console.log("founduser -->", foundUser);

            if (foundUser) {
                // console.log("request -->", req);
                req.user = foundUser;
                next()
            } else {
                res.status(400).send({
                    msg: `Not Authorized!`
                })
            }
            } else {
                res.status(401).send({
                    msg: `Invalid Token.`
            })
            }
            } else {
                res.status(403).send({ 
                    msg: `Forbidden.`
                })
    }
}

//! Module Code Verbatim
// const validateSession = async(req, res, next) => {
//     if(req.method === 'OPTIONS') {
//         return next()
//     } else if (
//         req.headers.authorization &&
//         req.headers.authorization.includes("Bearer")
//         ) {
//         const {authorization} = req.headers;
//         const payload = authorization 
//         ? jwt.verify(
//             authorization.includes("Bearer")
//             ? authorization.split(" ")[1]
//             : authorization,
//             process.env.JWT_SECRET
//             ) 
//             : undefined;
        
//         console.log("payload -->", payload);    

//         if(payload) {
//             const foundUser = await UserModel.findOne({
//                 where: { id: payload.id }
//             });

//             console.log("founduser -->", foundUser);

//             if (foundUser) {
//                 console.log("request -->", req);
//                 req.user = foundUser;
//                 next();
//             } else {
//                 res.status(400).send({
//                     msg: `Not Authorized!`
//                 })
//             }
//             } else {
//                 res.status(401).send({
//                     msg: `Invalid Token.`
//             })
//             }
//             } else {
//                 res.status(403).send({ 
//                     msg: `Forbidden`
//                 })
//     }
// }

//! Original Code
// const validateSession = async(req, res, next) => {
//     if(req.method === 'OPTIONS') {
//         return next()
//     } else if (req.headers.authorization) {
//         const {authorization} = req.headers;
//         const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined;
//         if(payload) {
//             let foundUser = await UserModel.findOne({
//                 where: { id: payload.id }
//             });
//             if (foundUser) {
//                 req.user = foundUser;
//                 next()
//             } else {
//                 res.status(400).send({
//                     msg: `Not Authorized!`
//                 })
//             }
//         } else {
//             res.status(401).send({
//                 msg: `Invalid Token.`
//             })
//         }
//     } else {
//         res.status(403).send({ 
//             msg: `Forbidden`
//         })
//     }
// }

module.exports = validateSession;
const {DataTypes} = require("sequelize");    
const db = require("../db");      


const User = db.define("user", {            
    email: {                               
        type: DataTypes.STRING(100),       
        allowNull: false,                   
        unique: true,                      
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// const User = db.define('user', {
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true
//     },
//     firstName:{
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lastName:{
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email:{
//         type: DataTypes.STRING(100),
//         allowNull: false,
//         unique: true
//     },
//     password:{
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });

module.exports = User   
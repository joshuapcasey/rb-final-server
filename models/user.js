const {DataTypes} = require("sequelize");    
const db = require("../db");      


const User = db.define("user", {            
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    // fullName: {
    //     type: DataTypes.STRING,
    // },
    email: {                               
        type: DataTypes.STRING,       
        allowNull: false,                   
        unique: true,                      
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin:{
        type: DataTypes.ENUM('Admin', 'User'),
        allowNull: false,
    },
});


module.exports = User   
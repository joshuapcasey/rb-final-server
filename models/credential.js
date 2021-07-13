const { DataTypes } = require('sequelize');
const db = require('../db');

const Credential = db.define('credential', {
    npi: {
        type: DataTypes.INTEGER ,
        allowNull: false
    },
    med_school: {
        type: DataTypes.STRING,
        allowNull: false
    },
    licenses: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    specialty: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Credential   
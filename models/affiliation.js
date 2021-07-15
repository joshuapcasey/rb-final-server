const { DataTypes } = require('sequelize');
const db = require('../db');

const Affiliation = db.define('affiliation', {
    organization: {
        type: DataTypes.STRING ,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Affiliation   
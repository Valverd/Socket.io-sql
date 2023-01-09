const db = require('../db/connect')
const { DataTypes } = require('sequelize')

const User = db.define('User', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth: {
       type: DataTypes.STRING,
    }
})

module.exports = User
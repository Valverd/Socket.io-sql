const { Sequelize } = require('sequelize')

module.exports = new Sequelize('socketio', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})
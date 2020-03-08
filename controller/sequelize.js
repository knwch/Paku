const Sequelize = require('sequelize')

const BookModel = require('../models/book')

const { DATABASE_NAME, USERNAME, PASSWORD, HOST, DIALECT} = require('../config/db.sql')

const sequelize = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
    host: HOST,
    dialect: DIALECT,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const Book = BookModel(sequelize, Sequelize)

sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & tables created here!`)
    })

module.exports = Book
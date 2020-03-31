const Sequelize = require('sequelize')

const BookModel = require('../models/book')
const CheckModel = require('../models/bookcheck')

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
const Check = CheckModel(sequelize, Sequelize)

Book.hasOne(Check)

sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & tables created here!`)
    })

module.exports = {
    Book,
    Check
}
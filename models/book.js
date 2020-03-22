const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define('book', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        bookDate: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        idCar: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        note: {
            type: DataTypes.TEXT,
        },
        payment: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        idPost: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        idUser: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        idCheck: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        timeIn: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        timeOut: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        hours: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            required: true
        },
        statusBook: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
            required: true
        }
    })
}
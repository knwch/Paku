module.exports = (sequelize, DataTypes) => {
    return sequelize.define('check', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        idRenter: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        idUser: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        checkInStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        checkInUser: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        checkInRenter: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        checkOutStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        checkOutUser: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        checkOutRenter: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
}
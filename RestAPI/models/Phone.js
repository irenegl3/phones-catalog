
module.exports = function (sequelize, DataTypes) {
    let Phone = sequelize.define('Phone', {
        // Model attributes 
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        manufacturer: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING(1234)
        },
        color: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        imageFileName: {
            type: DataTypes.STRING
        },
        screen: {
            type: DataTypes.STRING
        },
        processor: {
            type: DataTypes.STRING
        },
        ram: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
    });
    return Phone;
};
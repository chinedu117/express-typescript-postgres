const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize("sqlite::memory:");

class User extends Model {}

User.init({
     firstName: {
        type: DataTypes.STRING,
        allowNull: false

     },
     lastName: {
        type: DataTypes.STRING,
        allowNull: false

     }
},
{
    modelName: "User",
    sequelize 
})

console.log(User === sequelize.models.User); // true
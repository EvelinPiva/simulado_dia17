const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Insepcao = db.define('insepcao',{
    codInsepcao:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idEquipamento:{
        type: DataTypes.INTEGER,
        references:{
            model: 'equipamentos',
            key: 'codEquipamento'
        },
        allowNull: false
    },
    vistoria:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('PENDENTE','REALIZADA'),
        allowNull: false
    },
    dataInsepcao:{
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'insepcoes'
})
module.exports = Insepcao
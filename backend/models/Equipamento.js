const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Equipamento = db.define('equipamento',{
    codEquipamento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idCliente:{
        type: DataTypes.INTEGER,
        references:{
            model: 'clientes',
            key: 'codCliente'
        },
        allowNull: false
    },
    modelo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fabricante:{
        type: DataTypes.STRING,
        allowNull: false
    },
    numSerie:{
        type: DataTypes.STRING,//criptografar esse
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'equipamentos'
})
module.exports = Equipamento
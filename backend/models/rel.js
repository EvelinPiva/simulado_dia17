const Funcionario = require('./Funcionario')
const Insepcao = require('./Insepcao')
const Equipamento = require('./Equipamento')
const Cliente = require('./Cliente')
const db = require('../db/conn')

Cliente.hasMany(Equipamento,{
    foreignKey: 'idCliente',
    as: 'equipamentoCliente',
    onDelete: 'CASCADE'
})

Equipamento.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'clienteEquipamento',
    allowNull: false
})

Equipamento.hasMany(Insepcao,{
    foreignKey: 'idEquipamento',
    as: 'insepcaoEquipamento',
    onDelete: 'CASCADE'
})

Insepcao.belongsTo(Equipamento,{
    foreignKey: 'idEquipamento',
    as: 'equipamentoCliente',
    allowNull: false
})

module.exports = {Funcionario,Equipamento,Cliente,Insepcao}
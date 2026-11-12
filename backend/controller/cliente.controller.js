const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Cliente = require('../models/Cliente')

const cadastrar = async(req,res)=>{
    const valores = req.body
    if(!valores.nome || !valores.cpf || !valores.codIdentificacao){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }
    try{
        const cpfCripto = cryptoJS.AES.encrypt(valores.cpf,CHAVE_SECRETA).toString()
        await Cliente.create({
            nome: valores.nome,
            cpf: cpfCripto,
            codIdentificacao: valores.codIdentificacao
        })
    }catch(err){
        console.error('erro ao cadastrar cliente',err)
        res.status(500).json({message: 'Erro ao cadastrar cliente'})
    }
}

const consultarId = async(req,res)=>{
    const id = req.params.id
    try{
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(400).json({message: 'cliente não encontrado'})
        }
        const bytes = cryptoJS.AES.decrypt(cliente.cpf,CHAVE_SECRETA)
        const cpfDescript = bytes.toString(cryptoJS.enc.Utf8)
        return res.status(201).json({
            nome: cliente.nome,
            cpf: cpfDescript,
            codIdentificacao: codIdentificacao
        })
    }catch(err){
        console.error('erro',err)
        res.status(500).json({message: 'erro'})
    }
}
const consultarNome = async(req,res)=>{
    const nome = req.params.nome
    try{
        const cliente = await Cliente.findOne({where: {nome: nome}})
        if(!cliente){
            return res.status(400).json({message: 'cliente não encontrado'})
        }
        const bytes = cryptoJS.AES.decrypt(cliente.cpf,CHAVE_SECRETA)
        const cpfDescript = bytes.toString(cryptoJS.enc.Utf8)
        return res.status(201).json({
            nome: cliente.nome,
            cpf: cpfDescript,
            codIdentificacao: codIdentificacao
        })
    }catch(err){
        console.error('erro',err)
        res.status(500).json({message: 'erro'})
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id
    try{
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(400).json({message: 'cliente não encontrado'})
        }
        await Cliente.destroy({where: {cliente: id}})
    }catch(err){
        console.error('erro',err)
        res.status(500).json({message: 'erro'})
    }
}
module.exports = {cadastrar,consultarId, consultarNome, apagar}
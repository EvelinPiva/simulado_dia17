const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Funcionario = require('../models/Funcionario')

const cadastrar = async(req,res)=>{
    const valores = req.body
    if(!valores.nome || !valores.email || !valores.senha){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }
    try{
        const senhaCripto = cryptoJS.AES.encrypt(valores.senha,CHAVE_SECRETA).toString()
        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto
        })
    }catch(err){
        console.error('erro ao cadastrar',err)
        res.status(500).json({message: 'Erro ao cadastrar'})
    }
}
module.exports = {cadastrar}

const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Funcionario = require('../models/Funcionario')

const login = async(req,res)=>{
    const valores = req.body
    if(!valores.email || !valores.senha){
        return res.status(400).json({message: 'todos os campos são obrigatórios'})
    }

    const funcionario = await Funcionario.findOne({where: {email: valores.email}})
    try{
        const bytes = cryptoJS.AES.decrypt(funcionario.senha, CHAVE_SECRETA)
        const senha = bytes.toString(cryptoJS.enc.Utf8)

        if(valores.senha !== senha){
            return res.status(402).json({message: 'Senha inválida para realizar o login'})
        }// 200 minutos
        const tresHorasEmMs = 3* 60 * 60 * 1000
        const tempoExpiraEm = Date.now() + tresHorasEmMs

        const payload ={
            codFuncionario: funcionario.codFuncionario,
            nome: funcionario.nome,
            expiraEm : tempoExpiraEm
        }

        const token = cryptoJS.AES.encrypt(payload,CHAVE_SECRETA).toString()

        return res.status(200).json({
            message: 'login ok',
            nome: funcionario.nome,
            token: token
        })

    }catch(err){
        console.error('erro',err)
        return res.status(500).json({message: 'erro'})
    }
}
module.exports = {login}
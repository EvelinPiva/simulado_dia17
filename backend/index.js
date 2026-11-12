const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')


const PORT = 3000
const hostname = 'localhost'
const authMiddleware = require('./middleware/auth.middleware')
const clienteController = require('./controller/cliente.controller')
// const equipamentoController = require('./controller/equipamento.controller')
const funcionarioController = require('./controller/funcionario.controller')
// const insepcaoController = require('./controller/insepcao.controller')
// const authController = require('./controller/auth.controller')



app.use(express.urlencoded({extends:true}))
app.use(express.json())
app.use(cors())

app.post('/funcionario',funcionarioController.cadastrar)
app.post('/cliente',clienteController.cadastrar)


app.get(authMiddleware)
conn.sync()
.then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`banco rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('erro',err)
})

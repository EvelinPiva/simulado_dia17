const {Funcionario,Insepcao,Equipamento,Cliente} = require('./models/rel')
const conn = require('./db/conn')
async function syncDataBase(){
    try{
        await conn.sync({force:true})
        console.log('Tabelas sincronizadas')
    }catch(err){
        console.error('Erro na sincronização de tabelas',err)

    }finally{
    await conn.close()
    console.log('Fechando o banco')
    }
}
syncDataBase()
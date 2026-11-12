const resposta = document.getElementById('resposta')
const btn_login = document.getElementById('btn_login')

btn_login.addEventListener('click',(e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const cpf = Number(document.getElementById('cpf').value)
    const codIdentificacao = Number(document.getElementById('codIdentificacao').value)

    const valores ={
        nome: nome,
        cpf: cpf,
        codIdentificacao: codIdentificacao
    }
    console.log(valores)

    fetch('http://localhost:3000/cliente',{
        method: 'POST',
        headers: {'Content-Type': 'application-json'},
        body: JSON.stringify(valores)
    })
    .then(res=> res.json())
    .then((dados)=>{
        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p>`
    })
    .catch((err)=>{
        console.error('erro',err)
        resposta.innerHTML = `<p>Erro no cadastro</p>`
    })
})
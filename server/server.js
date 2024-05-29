// Importando o módulo 'express' para criar um aplicativo web
const express = require("express")

// Criando uma instância do aplicativo Express
const app = express()

// Importando as rotas definidas no arquivo './routes/routes'
const routes = require("./routes/routes")

// Importando o módulo 'cors' para lidar com política de mesma origem
const cors = require("cors")

// Usando o middleware 'cors' para permitir requisições de diferentes origens
app.use(cors())

// Importando o módulo 'body-parser' para processar corpos de requisição
const bodyParser = require("body-parser")

// Configurando o middleware 'body-parser' para analisar dados de formulário URL-encoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Usando as rotas definidas 
app.use(routes)

// Definindo a porta em que o servidor Express será executado
const port = 8000

// Iniciando o servidor na porta especificada
app.listen(port, function () {
    console.log(`RODANDO NA PORTA: http://localhost:` + port)
})


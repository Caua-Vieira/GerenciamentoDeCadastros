// Importando o módulo 'express'
const express = require("express");

// Criando um objeto de rotas 
const routes = express.Router();

// Importando funções de manipulação de dados 
const {
    cadastraDados,
    carregaUsuarios,
    filtraUsuarios,
    editUsuarios,
    excluirUsuario,
    carregarUsuariosbyid
} = require("../controllers/cad");

// Definindo uma rota POST para cadastrar pessoas
routes.post("/cadastrar/pessoas", cadastraDados);

// Definindo uma rota GET para  carregar usuarios na interface
routes.get("/carrega/usuarios", carregaUsuarios);

// Definindo uma rota GET para filtrar usuarios 
routes.get("/filtrar/usuarios", filtraUsuarios);

// Definindo uma rota PUT para editar usuários
routes.put("/editar/usuarios/:id_usuario", editUsuarios);

// Definindo uma rota DELETE para excluir usuários
routes.delete('/excluir/usuarios/:userId', excluirUsuario);

// Definindo uma rota GET para carregar usuários
routes.get("/carregar/usuario/byid/:id_usuario", carregarUsuariosbyid);

// Exportando o objeto de rotas 
module.exports = routes;

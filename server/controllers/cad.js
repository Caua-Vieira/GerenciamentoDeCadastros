// Importando a conexão com o banco de dados
const conection = require("../database/postgre");

// Função para cadastrar dados no banco de dados
function cadastraDados(req, res) {
    // Obtendo informações do corpo da requisição
    const infos = req.body.infos;
    const nome = req.body.nome;
    const razaoSocial = req.body.razaoSocial;
    const endereco = req.body.endereco;
    const cidade = req.body.cidade;
    const contato = req.body.contato;
    const telContato = req.body.telContato;
    const email = req.body.email;
    const bairro = req.body.bairro;
    const uf = req.body.uf;
    const cep = req.body.cep;

    // Verificando se os dados já existem no banco de dados
    conection.query(`select dados from pessoas where dados = '${infos}'`, (erro, result) => {
        if (erro) {
            // Enviando resposta em caso de erro interno no servidor
            res.send({
                codigo: 500,
                message: "Erro interno no servidor",
                erro: erro.message
            });
        } else if (result.rows.length > 0) {
            // Enviando resposta se os dados já existem
            res.send({
                codigo: 406,
                message: "CNPJ ou CPF já existente"
            });
        } else {
            // Executando a inserção dos dados no banco de dados
            conection.query(`insert into pessoas (dados, nome, razaoSocial, endereco, cidade, contato, telContato, email, bairro, uf, cep) values (
                '${infos}',
                '${nome}',
                '${razaoSocial}',
                '${endereco}',
                '${cidade}',
                '${contato}',
                '${telContato}',
                '${email}',
                '${bairro}',
                '${uf}',
                '${cep}'
            )`, (erro) => {
                if (erro) {
                    // Enviando resposta em caso de erro ao cadastrar dados
                    res.send({
                        codigo: 400,
                        message: "Não foi possível realizar o cadastro",
                        erro: erro.message
                    });
                } else {
                    // Enviando resposta de sucesso no cadastro
                    res.send({
                        codigo: 200,
                        message: "Cadastrado com sucesso"
                    });
                }
            });
        }
    });
}

// Função para carregar todos os usuários cadastrados
function carregaUsuarios(req, res) {
    conection.query(`select * from pessoas`, function (erro, result) {
        if (erro) {
            // Enviando resposta em caso de erro na consulta
            res.send({
                codigo: 500,
                message: "Erro ao buscar usuários",
                erro: erro.message
            });
        } else {
            if (result.rows.length > 0) {
                // Enviando resposta com os dados dos usuários em caso de sucesso na consulta
                const usuarios = result.rows;
                res.send({
                    codigo: 200,
                    message: "Busca bem sucedida",
                    data: usuarios
                });
            } else {
                // Enviando resposta se não houver usuários encontrados
                res.send({
                    codigo: 401,
                    message: "Nenhum usuário cadastrado"
                });
            }
        }
    });
}

// Função para carregar um usuário pelo ID
function carregarUsuariosbyid(req, res) {
    const id_usuario = req.params.id_usuario;
    conection.query(`select * from pessoas where id = ${id_usuario}`, function (erro, usuario) {
        if (erro) {
            // Enviando resposta em caso de erro interno no servidor
            res.send({
                codigo: 500,
                message: "Erro interno no servidor",
                erro: erro.message
            });
        } else if (usuario.rows.length > 0) {
            // Enviando resposta de sucesso na busca
            res.send({
                codigo: 200,
                message: "Busca bem sucedida",
                usuario: usuario.rows
            });
        } else {
            // Enviando resposta se o usuário não foi encontrado
            res.send({
                codigo: 400,
                message: "Usuário não encontrado",
            });
        }
    });
}

// Função para filtrar usuários com base em parâmetros
function filtraUsuarios(req, res) {
    const { codigo, nome, razao_social } = req.query;

    if (codigo != "" && codigo != " " && codigo != null) {
        conection.query(`select * from pessoas where id = ${codigo}`, function (erro, result) {
            // Enviando resposta em caso de erro interno no servidor na hora da busca
            if (erro) {
                res.send({
                    message: "Usuário não encontrado com base no código",
                    erro: erro.message,
                    codigo: 500
                });
            } else if (result.rows.length != 0) {
                // Enviando resposta se o usuário foi encontrado
                res.send({
                    codigo: 200,
                    result: result.rows
                });
            } else {
                // Enviando resposta se o usuário não foi encontrado
                res.send({
                    message: "Usuário não encontrado com base no código",
                    codigo: 400
                });
            }
        });
    } else if (nome != "" && nome != " " && nome != null) {
        conection.query(`
        select * from pessoas where UPPER(nome) like UPPER('%${nome}%')`, function (erro, result) {
            // Enviando resposta em caso de erro interno no servidor na hora da busca
            if (erro) {
                res.send({
                    message: "Erro interno no servidor",
                    erro: erro.message,
                    codigo: 500
                });
            } else if (result.rows.length > 0) {
                // Enviando resposta se o usuário foi encontrado
                res.send({
                    codigo: 200,
                    result: result.rows
                });
            } else {
                // Enviando resposta se o usuário não foi encontrado
                res.send({
                    message: "Usuário não encontrado com base no nome.",
                    codigo: 400
                });
            }
        });
    } else if (razao_social != "" && razao_social != " " && razao_social != null) {
        conection.query(`
            select * from pessoas where UPPER(razaoSocial) like UPPER('%${razao_social}%')`, function (erro, result) {
            // Enviando resposta em caso de erro interno no servidor na hora da busca
            if (erro) {
                res.send({
                    message: "Erro interno no servidor",
                    erro: erro.message,
                    codigo: 500
                });
            } else if (result.rows.length > 0) {
                // Enviando resposta se o usuário foi encontrado
                res.send({
                    codigo: 200,
                    result: result.rows
                });
            } else {
                // Enviando resposta se o usuário não foi encontrado
                res.send({
                    message: "Usuário não encontrada com base na Razão social.",
                    codigo: 400
                });
            }
        });
    }
}

// Função para editar informações de usuários
function editUsuarios(req, res) {
    const infos = req.body.infos;
    const nome = req.body.nome;
    const razaoSocial = req.body.razaoSocial;
    const endereco = req.body.endereco;
    const cidade = req.body.cidade;
    const contato = req.body.contato;
    const telContato = req.body.telContato;
    const email = req.body.email;
    const bairro = req.body.bairro;
    const uf = req.body.uf;
    const cep = req.body.cep;

    // Verificando se a empresa com o CNPJ fornecido existe
    conection.query(`select * from pessoas where dados = '${infos}'`, function (erro, result) {
        if (erro) {
            // Enviando resposta em caso de erro ao verificar usuário
            res.send({
                codigo: 500,
                message: "Erro ao verificar usuário",
                erro: erro.message
            });
        } else {
            if (result.rows.length > 0) {
                // Atualizando informações da empresa no banco de dados
                conection.query(`update pessoas set 
                nome = '${nome}', 
                razaoSocial = '${razaoSocial}', 
                endereco = '${endereco}',
                cidade = '${cidade}',
                contato = '${contato}',
                telContato = '${telContato}',
                email = '${email}',
                bairro = '${bairro}',
                uf = '${uf}',
                cep = '${cep}'
                where dados = '${infos}'`, function (erro) {
                    if (erro) {
                        // Enviando resposta em caso de erro na atualização
                        res.send({
                            codigo: 400,
                            message: "Erro ao tentar editar usuário",
                            erro: erro.message
                        });
                    } else {
                        // Enviando resposta de sucesso na atualização
                        res.send({
                            codigo: 200,
                            message: "Dados editados com sucesso"
                        });
                    }
                });
            } else {
                // Enviando resposta se a empresa não foi encontrada
                res.send({
                    codigo: 400,
                    message: 'Erro ao tentar editar usuário'
                });
            }
        }
    });
}

// Função para excluir usuário
function excluirUsuario(req, res) {
    const id = req.params.userId;

    // Verificando se o usuário com o ID fornecido existe
    conection.query(`select * from pessoas where id = '${id}'`, function (erro, result) {
        if (erro) {
            // Enviando resposta em caso de erro na verificação do usuário
            res.send({
                codigo: 500,
                message: "Erro ao tentar verificar usuário",
                erro: erro.message
            });
        } else {
            if (result.rows.length > 0) {
                // Excluindo o usuário do banco de dados
                conection.query(`delete from pessoas where id = ${id}`, function (erro) {
                    if (erro) {
                        // Enviando resposta em caso de erro na exclusão
                        res.send({
                            codigo: 401,
                            message: "Erro ao tentar excluir usuário",
                            erro: erro.message
                        });
                    } else {
                        // Enviando resposta de sucesso na exclusão
                        res.send({
                            codigo: 200,
                            message: "Usuário deletado com sucesso!",
                        });
                    }
                });
            } else {
                // Enviando resposta se o usuário não foi encontrado
                res.send({
                    codigo: 400,
                    message: 'Usuário não encontrado'
                });
            }
        }
    });
}

// Exportando modulos
module.exports = {
    cadastraDados,
    carregaUsuarios,
    filtraUsuarios,
    editUsuarios,
    excluirUsuario,
    carregarUsuariosbyid
};
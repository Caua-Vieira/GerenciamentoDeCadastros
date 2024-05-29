import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './cad.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function Cad() {
    const params = useParams();
    const navigate = useNavigate();

    const [infos, setInfos] = useState("");
    const [nome, setNome] = useState("");
    const [razaoSocial, setRazaoSocial] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cidade, setCidade] = useState("");
    const [contato, setContato] = useState("");
    const [telContato, setTelContato] = useState("");
    const [email, setEmail] = useState("");
    const [bairro, setBairro] = useState("");
    const [uf, setUF] = useState("");
    const [cep, setCep] = useState("");

    const [formCadastro, setFormCriarnovo] = useState(false);
    const [formEditar, setFormEditar] = useState(true);

    const [idUsuarioEditar, setIdUsuarioEditar] = useState("");

    useEffect(function () {
        if (params.id != "" && params.id != " " && params.id != null) {
            carregarInfoUsuario(params.id);

            setIdUsuarioEditar(params.id);
            setFormCriarnovo(true);
            setFormEditar(false);
        }
    }, []);

    async function handleClickInsereDados() {
        if (
            infos.trim() === '' ||
            nome.trim() === '' ||
            endereco.trim() === '' ||
            cidade.trim() === '' ||
            contato.trim() === '' ||
            email.trim() === '' ||
            bairro.trim() === '' ||
            uf.trim() === '' ||
            cep.trim() === ''
        ) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        const dados = {
            infos: infos,
            nome: nome,
            razaoSocial: razaoSocial,
            endereco: endereco,
            cidade: cidade,
            contato: contato,
            telContato: telContato,
            email: email,
            bairro: bairro,
            uf: uf,
            cep: cep,
        };

        const resposta = await axios.post("http://localhost:8000/cadastrar/pessoas", dados)

        if (resposta.data.codigo === 500) {
            alert(resposta.data.message);
        } else if (resposta.data.codigo === 406) {
            alert(resposta.data.message);
        } else if (resposta.data.codigo === 400) {
            alert(resposta.data.message);
            console.log(resposta.data.erro);
        } else if (resposta.data.codigo === 200) {
            alert(resposta.data.message);
        }
    }

    function handleClicklimparCampos() {
        setInfos("");
        setNome("");
        setRazaoSocial("");
        setEndereco("");
        setCidade("");
        setContato("");
        setTelContato("");
        setEmail("");
        setBairro("");
        setUF("");
        setCep("");
    }

    const [usuario, setUsuario] = useState([]);

    async function carregarInfoUsuario(id_usuario: any) {
        const resposta = await axios.get(`http://localhost:8000/carregar/usuario/byid/${id_usuario}`);

        if (resposta.data.codigo == 500) {
            alert(resposta.data.message);
        } else if (resposta.data.codigo == 400) {
            alert(resposta.data.message);
        } else {
            setUsuario(resposta.data.usuario);

            setInfos(resposta.data.usuario[0].dados);
            setNome(resposta.data.usuario[0].nome);
            setRazaoSocial(resposta.data.usuario[0].razaosocial);
            setEndereco(resposta.data.usuario[0].endereco);
            setCidade(resposta.data.usuario[0].cidade);
            setContato(resposta.data.usuario[0].contato);
            setTelContato(resposta.data.usuario[0].telcontato);
            setEmail(resposta.data.usuario[0].email);
            setBairro(resposta.data.usuario[0].bairro);
            setUF(resposta.data.usuario[0].uf);
            setCep(resposta.data.usuario[0].cep);
        }
    }

    async function atualizarUsuario() {
        if (
            nome.trim() === '' ||
            endereco.trim() === '' ||
            cidade.trim() === '' ||
            contato.trim() === '' ||
            telContato.trim() === '' ||
            email.trim() === '' ||
            bairro.trim() === '' ||
            uf.trim() === '' ||
            cep.trim() === ''
        ) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        const dados = {
            infos: infos,
            nome: nome,
            razaoSocial: razaoSocial,
            endereco: endereco,
            cidade: cidade,
            contato: contato,
            telContato: telContato,
            email: email,
            bairro: bairro,
            uf: uf,
            cep: cep,
        };

        const resposta = await axios.put(`http://localhost:8000/editar/usuarios/${idUsuarioEditar}`, dados);

        if (resposta.data.codigo == 200) {
            alert(resposta.data.message);
            navigate("/");
        } else if (resposta.data.codigo == 400) {
            alert(resposta.data.codigo.message);
        } else if (resposta.data.codigo == 500) {
            alert(resposta.data.message);
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-mx-10">
                                <h1 className='h4 titulo pb-4'>{formCadastro == false ? "Cadastrar Pessoas" : "Editar Pessoas"}</h1>

                                <div hidden={formCadastro}>
                                    <div className='row m-auto mt-3'>
                                        <div className='col-md-6'>
                                            <label htmlFor="dados">CPF ou CNPJ</label>
                                            <input type='text' value={infos} className='form-control mb-2' id='infos' onChange={function (e) {
                                                setInfos(e.target.value)
                                            }} />

                                            <label htmlFor="nome">Nome Fantasia ou Nome</label>
                                            <input type='text' value={nome} className='form-control mb-2' id='nome' onChange={function (e) {
                                                setNome(e.target.value)
                                            }} />

                                            <label htmlFor="razaoSocial">Razão Social</label>
                                            <input type='text' value={razaoSocial} className='form-control mb-2' id='razaoSocial' onChange={function (e) {
                                                setRazaoSocial(e.target.value)
                                            }} />

                                            <label htmlFor="endereco">Endereço</label>
                                            <input type='text' value={endereco} className='form-control mb-2' id='endereco' onChange={function (e) {
                                                setEndereco(e.target.value)
                                            }} />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="contato">Contato</label>
                                            <input type='text' value={contato} className='form-control mb-2' id='contato' onChange={function (e) {
                                                setContato(e.target.value)
                                            }} />

                                            <label htmlFor="telContato">Telefone de Contato</label>
                                            <input type='text' value={telContato} className='form-control mb-2' id='telContato' onChange={function (e) {
                                                setTelContato(e.target.value)
                                            }} />

                                            <label htmlFor="email">E-mail do Contato</label>
                                            <input type='email' value={email} className='form-control mb-2' id='email' onChange={function (e) {
                                                setEmail(e.target.value)
                                            }} />

                                            <label htmlFor="bairro">Bairro</label>
                                            <input type='text' value={bairro} className='form-control mb-2' id='bairro' onChange={function (e) {
                                                setBairro(e.target.value)
                                            }} />
                                        </div>
                                        <div className='col-md-12'>
                                            <div className='row'>
                                                <div className='col-md-8'>
                                                    <label htmlFor="cidade">Cidade</label>
                                                    <input type='text' value={cidade} className='form-control mb-2' id='cidade' onChange={function (e) {
                                                        setCidade(e.target.value)
                                                    }} />
                                                </div>
                                                <div className='col-md-2'>
                                                    <label htmlFor="uf">UF</label>
                                                    <input type='text' value={uf} className='form-control mb-2' id='uf' onChange={function (e) {
                                                        setUF(e.target.value)
                                                    }} />
                                                </div>
                                                <div className='col-md-2'>
                                                    <label htmlFor="cep">CEP</label>
                                                    <input type='text' value={cep} className='form-control mb-2' id='cep' onChange={function (e) {
                                                        setCep(e.target.value)
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end mt-5">
                                        <button type="button" className="rounded btn btn-danger me-4 tamanhoBtn" id="btnCancel" onClick={handleClicklimparCampos}>Limpar</button>
                                        <button type="button" className="rounded btn btn-primary tamanhoBtn" id="btnCad" onClick={handleClickInsereDados}>Salvar</button>
                                    </div>
                                </div>

                                {usuario.map(function (info: any, index: number) {
                                    return (
                                        <React.Fragment key={index}>
                                            <>
                                                <div className='overlay position-relative' hidden={formEditar}>
                                                    <div className='row m-auto mt-3'>
                                                        <div className='col-md-6'>
                                                            <label htmlFor="dados">CPF ou CNPJ</label>
                                                            <input type='text' value={infos} className='form-control mb-2' id='infos' onChange={function (e) {
                                                                alert("Não é possível editar esse campo")
                                                            }} />

                                                            <label htmlFor="nome">Nome Fantasia ou Nome</label>
                                                            <input type='text' value={nome} className='form-control mb-2' id='nome' onChange={function (e) {
                                                                setNome(e.target.value)
                                                            }} />

                                                            <label htmlFor="razaoSocial">Razão Social</label>
                                                            <input type='text' value={razaoSocial} className='form-control mb-2' id='razaoSocial' onChange={function (e) {
                                                                setRazaoSocial(e.target.value)
                                                            }} />

                                                            <label htmlFor="endereco">Endereço</label>
                                                            <input type='text' value={endereco} className='form-control mb-2' id='endereco' onChange={function (e) {
                                                                setEndereco(e.target.value)
                                                            }} />
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <label htmlFor="contato">Contato</label>
                                                            <input type='text' value={contato} className='form-control mb-2' id='contato' onChange={function (e) {
                                                                setContato(e.target.value)
                                                            }} />

                                                            <label htmlFor="telContato">Telefone de Contato</label>
                                                            <input type='text' value={telContato} className='form-control mb-2' id='telContato' onChange={function (e) {
                                                                setTelContato(e.target.value)
                                                            }} />

                                                            <label htmlFor="email">E-mail do Contato</label>
                                                            <input type='email' value={email} className='form-control mb-2' id='email' onChange={function (e) {
                                                                setEmail(e.target.value)
                                                            }} />

                                                            <label htmlFor="bairro">Bairro</label>
                                                            <input type='text' value={bairro} className='form-control mb-2' id='bairro' onChange={function (e) {
                                                                setBairro(e.target.value)
                                                            }} />
                                                        </div>
                                                        <div className='col-md-12'>
                                                            <div className='row'>
                                                                <div className='col-md-8'>
                                                                    <label htmlFor="cidade">Cidade</label>
                                                                    <input type='text' value={cidade} className='form-control mb-2' id='cidade' onChange={function (e) {
                                                                        setCidade(e.target.value)
                                                                    }} />
                                                                </div>
                                                                <div className='col-md-2'>
                                                                    <label htmlFor="uf">UF</label>
                                                                    <input type='text' value={uf} className='form-control mb-2' id='uf' onChange={function (e) {
                                                                        setUF(e.target.value)
                                                                    }} />
                                                                </div>
                                                                <div className='col-md-2'>
                                                                    <label htmlFor="cep">CEP</label>
                                                                    <input type='text' value={cep} className='form-control mb-2' id='cep' onChange={function (e) {
                                                                        setCep(e.target.value)
                                                                    }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-end mt-5">
                                                        <button type="button" className="rounded btn btn-danger me-4 tamanhoBtn" id="btnCancel" onClick={handleClicklimparCampos}>Limpar</button>
                                                        <button type="button" className="rounded btn btn-primary tamanhoBtn" id="btnCad" onClick={atualizarUsuario}>Salvar Edição</button>
                                                    </div>
                                                </div>
                                            </>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>

        </>
    );

}

export default Cad;

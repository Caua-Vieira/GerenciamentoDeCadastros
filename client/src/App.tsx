// Realizando imports necessários
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/app.css';
import { IoIosSearch } from "react-icons/io";
import { CgAdd } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { render } from 'react-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Card } from 'react-bootstrap';

function App() {
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");

  const [listaUsuarios, setListaUsuarios] = useState([]);

  async function carregaUsuarios() {
    const resposta = await axios.get("http://localhost:8000/carrega/usuarios");

    if (resposta.data.codigo == 500) {
      alert(resposta.data.message);
    } else if (resposta.data.codigo == 401) {
      alert(resposta.data.message);
    } else {
      const users = resposta.data.data;
      setListaUsuarios(users);
    }
  }

  useEffect(() => {
    carregaUsuarios();
  }, []);

  function handleIncluirClick() {
    navigate('/cadastrar/pessoas');
  }

  async function handleDeleteClick(userId: number) {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir usuário?');

    if (confirmDelete) {
      try {
        const resposta = await axios.delete(`http://localhost:8000/excluir/usuarios/${userId}`);

        if (resposta.data.codigo === 200) {
          alert(resposta.data.message);
          carregaUsuarios();
        } else if (resposta.data.codigo === 401) {
          alert(resposta.data.message);
        } else if (resposta.data.message === 500) {
          alert(resposta.data.message);
        } else {
          alert(resposta.data.message);
        }
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        alert('Erro ao excluir usuário. Verifique o console para mais detalhes.');
      }
    }
  }

  async function handleFilterClick() {
    if (codigo.trim() === '' && nome.trim() === '' && razaoSocial.trim() === '') {
      alert('Por favor, preencha algum campo para filtragem');
      return;
    }

    const resposta = await axios.get(`http://localhost:8000/filtrar/usuarios?codigo=${codigo}&nome=${nome}&razao_social=${razaoSocial}`);

    if (resposta.data.codigo == 500) {
      alert(resposta.data.message);
    } else if (resposta.data.codigo == 400) {
      alert(resposta.data.message);
    } else {
      setListaUsuarios(resposta.data.result);
    }
  }

  const handleInputChange = (campo: string, value: string) => {
    if ((campo === 'codigo' && (nome.trim() !== '' || razaoSocial.trim() !== '')) ||
      (campo === 'nome' && (codigo.trim() !== '' || razaoSocial.trim() !== '')) ||
      (campo === 'razaoSocial' && (codigo.trim() !== '' || nome.trim() !== ''))) {
      alert('Não é possível filtrar por 2 campos');
    } else {
      switch (campo) {
        case 'codigo':
          setCodigo(value);
          break;
        case 'nome':
          setNome(value);
          break;
        case 'razaoSocial':
          setRazaoSocial(value);
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <div className="col-mx-10">
            <h1 className='h4 titulo pb-4'>Listagem de Pessoas</h1>

            <div className=''>

              <div className='border p-3'>
                <div className='row m-auto mt-3 d-flex'>
                  <div className='col-md-3'>
                    <label htmlFor="codigo" className="form-label">Código</label>
                    <input type="text" value={codigo} className="form-control" id="codigo" onChange={function (e) {
                      handleInputChange('codigo', e.target.value)
                    }} />
                  </div>
                  <div className='col-md-9'>
                    <label htmlFor="nomeFantasia" className="form-label">Nome</label>
                    <input type="text" value={nome} className="form-control" id="nomeFantasia" onChange={function (e) {
                      handleInputChange('nome', e.target.value)
                    }} />
                  </div>
                  <div className="col-md-10 mb-3 mb-md-0">
                    <label htmlFor="razaoSocial" className="form-label">Razão Social</label>
                    <input type="text" value={razaoSocial} className="form-control" id="razaoSocial" onChange={function (e) {
                      handleInputChange('razaoSocial', e.target.value)
                    }} />
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button type="button" className="btn btn-info btnCustom btn-lg md" onClick={handleFilterClick} ><IoIosSearch /> Filtrar</button>
                  </div>
                </div>
              </div>

              <div className='mt-5'>
                <button type="button" className="btn btn-info rounded btnCustom btn-lg" onClick={handleIncluirClick}><i><CgAdd /> Incluir</i></button>
              </div>

              <div className='border-top p-3 mt-4 '>
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Cidade</th>
                      <th scope="col">UF</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaUsuarios.map(function (usuario: any) {
                      return (
                        <tr key={usuario.id}>
                          <th scope="col">{usuario.id}</th>
                          <th scope="col">{usuario.nome}</th>
                          <th scope="col">{usuario.cidade}</th>
                          <th scope="col">{usuario.uf}</th>
                          <th scope="col">
                            <FaEdit onClick={function () {
                              navigate(`/editar/cadastro/${usuario.id}`)
                            }} />
                            <MdDelete onClick={function () {
                              handleDeleteClick(usuario.id)
                            }} />
                          </th>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </Card.Body>

      </Card >

    </>
  )

}

export default App;

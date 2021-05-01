
import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { AutoComplete, message, Table, Image, Popconfirm, Tooltip, Button, Spin, Pagination, Modal, Input, Tabs } from 'antd';
import { customer_service } from '../../services/customers';
import { movies_service } from '../../services/movies';
import { PlusOutlined, StarOutlined, StarFilled, DeleteOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import { Redirect } from "react-router";
import $ from 'jquery'; 

const Home = () => {

  const [ options, setOptions ] = useState([]);
  const [ optionsTable, setOptionsTable ] = useState([]);
  const [ customer, setCustomer ] = useState('');
  const [ customerList, setCustomerList ] = useState([]);
  const [ editCustomer, setEditCustomer ] = useState([]);
  const [ cookie, setCookie] = useCookies(['Id']);
  const [ loading, setLoading ] = useState(false);
  const [ maxPage, setMaxPage ] = useState();
  const [ page, setPage ] = useState(1);
  const [ listMovie, setListMovie ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ name, setName ] = useState('');
  const [ cpf, setCpf ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ nameEdit, setNameEdit ] = useState('');
  const [ cpfEdit, setCpfEdit ] = useState('');
  const [ emailEdit, setEmailEdit ] = useState('');

  const { TabPane } = Tabs;

  useEffect(() => {
    fetchCustomers();
    fetchMovies(1);
    setPage(1);
    setListMovie(false);
    setName('');
    setCpf('');
    setEmail('');
  }, 0);
  
  const fetchCustomers = async () => {
    let customers = await customer_service.getCustomers();
    let customer_result = customers.data[0];
    let list = [];
    let listBackup = [];
    if(!customer_result.erro){
      customer_result.data.forEach(obj => {
        listBackup.push(obj);
        list.push({ value: obj.id + ' - ' + obj.name + ' - ' + obj.cpf });
      });
      setCustomerList(listBackup);
      setOptions(list);
    }
    else {
      message.info("Ocorre um erro ao carregar os clientes", 3);
    }
  }

  const fetchMovies = async (page) => {
    setLoading(true);
    let movies = await movies_service.getMoviesByPage(page);
    let movies_result = movies.data[0];
    if(!movies_result.erro[0]){
      setOptionsTable(movies_result.data.results);
      setMaxPage(movies_result.data.total_results);
    }
    else {
      message.info("Ocorre um erro ao carregar os filmes", 3);
    }
    setListMovie(false);
    setLoading(false);
  }

  const addMovie = async (record, fav) => {
    setLoading(true);
    if(await onValidade()){

      let body = {
        idCustomer: parseInt(customer),
        idMovie: parseInt(record.id),
        favorite: false,
      }

      let inserted_movie_status = await movies_service.insertMovie(body);
      let status = inserted_movie_status.data[0];
      if(status){
        if(!status.erro){
          if(!fav){
            message.success("Filme adicionado com sucesso!", 3);
          }
        }
        else {
          if(!fav){
            message.error("Erro: "+ status.erro, 3);
          }
        }
      }
      if(fav){
        body.favorite = true;
        let inserted_favorite_movie = await movies_service.insertFavoriteMovie(body);
        let favorite_status = inserted_favorite_movie.data[0];
        if(favorite_status){
          if(!favorite_status.erro){
            if(listMovie){
              await entryListMovies();
            }
            message.success("Filme favoritado com sucesso", 3);
          }
          else {
            message.error("Erro: "+ favorite_status.erro, 3);
          }
        }
        else {
          message.error("Ocorreu um erro ao favoritar!", 3);
        }
      }
    }
    setLoading(false);
  }

  const removeMovie = async (record) => {
    setLoading(true);
    let delete_movie_status = await movies_service.deleteMovie(record.id_bd);
      let status = delete_movie_status.data[0];
      if(status){
        if(!status.erro){
          await entryListMovies();
          message.success("Filme excluido com sucesso!", 3);
        }
        else {
          message.error("Erro: "+ status.erro, 3);
        }
      }
    setLoading(false);
  }

  const removeFavoriteMovie = async (record) => {
    setLoading(true);
    if(await onValidade()){

      let body = {
        idCustomer: parseInt(customer),
        idMovie: parseInt(record.id),
        favorite: false,
      }
      let inserted_favorite_movie = await movies_service.insertFavoriteMovie(body);
      let favorite_status = inserted_favorite_movie.data[0];
      if(favorite_status){
        if(!favorite_status.erro){
          await entryListMovies();
          message.success("Filme desfavoritado com sucesso", 3);
        }
        else {
          message.error("Erro: "+ favorite_status.erro, 3);
        }
      }
      else {
        message.error("Ocorreu um erro ao desfavoritar!", 3);
      }
    }
    setLoading(false);
  }
  
  const entryListMovies = async () => {
    setLoading(true);
    if(await onValidade()){
      setListMovie(true);
      let list_movies = [];
      let response_favorite = await movies_service.getFavoriteMovies(customer, 1);
      let favorite = response_favorite.data[0];
      if(favorite){
        if(!favorite.erro){
            for (const obj_favorite of favorite.data) {
              list_movies.push({...obj_favorite, favorite: true });
            }
        }
      }
      let response_unfavorite = await movies_service.getFavoriteMovies(customer, 0);
      let unfavorite = response_unfavorite.data[0];
      if(unfavorite){
        if(!unfavorite.erro){
            for (const obj_unfavorite of unfavorite.data) {
              list_movies.push(obj_unfavorite);
            }
        }
      }
      setOptionsTable(list_movies);
    }
    setLoading(false);
  }

  const onValidade = async () => {
    if(!customer){
      message.info("Selecione um cliente antes!", 3);
      return false
    }
    if(!cookie.Id){
      message.info("Você não está logado!", 3);
      return false
    }
    return true
  }

  const onValidadeNewCustomer = async () => {
    if(!name){
      message.info("Campo nome não preenchido.", 3);
      return false
    }
    if(!cpf){
      message.info("Campo cpf não preenchido.", 3);
      return false
    }
    let validade = await validadeCpf(cpf);
    if(!validade){
      message.info("Campo cpf não preenchido corretamente.", 3);
      return false
    }
    if(!email){
      message.info("Campo email não preenchido.", 3);
      return false
    }
    return true
  }

  const onValidadeEditCustomer = async () => {
    if(!nameEdit && !editCustomer.name){
      message.info("Campo nome não preenchido.", 3);
      return false
    }
    if(!cpfEdit && !editCustomer.cpf){
      message.info("Campo cpf não preenchido.", 3);
      return false
    }
    let cpf = cpfEdit ? cpfEdit : editCustomer.cpf;
    let validade = await validadeCpf(cpf.toString());
    if(!validade){
      message.info("Campo cpf não preenchido corretamente.", 3);
      return false
    }
    if(!emailEdit && !editCustomer.email){
      message.info("Campo email não preenchido.", 3);
      return false
    }
    return true
  }

  const selectedCustomer = (value) => {
    setCustomer(value.substr(0, 1));
  }

  const showModal = () => {
    setName('');
    setCpf('');
    setEmail('');
    setNameEdit('');
    setCpfEdit('');
    setEmailEdit('');
    setModal(!modal);
    let info_customer = customerList.find(obj => obj.id == customer);
    setEditCustomer(info_customer);
  }

  const createNewCustomer = async () => {
    showModal();
    setLoading(true);
    if(await onValidadeNewCustomer()){
      let body = {
        name: name,
        cpf: cpf,
        email: email,
      }
      let response_status = await customer_service.insertCustomer(body);
      let status = response_status.data[0];
      if(status){
        if(!status.erro){
          await fetchCustomers();
          message.success("Cliente criando com sucesso.", 3);
        }
        else {
          message.error("Erro: "+ status.erro, 3);
        }
      }
      else {
        message.error("Ocorreu um erro ao criar o cliente.", 3);
      }
    }
    setLoading(false);
  }

  const EditCustomer = async () => {
    showModal();
    setLoading(true);
    if(await onValidadeEditCustomer()){
      let body = {
        name: nameEdit ? nameEdit : editCustomer.name,
        cpf: cpfEdit ? cpfEdit : editCustomer.cpf,
        email: emailEdit ? emailEdit : editCustomer.email,
      }
      let response_status = await customer_service.updateCustomer(customer, body);
      let status = response_status.data[0];
        if(status){
          if(!status.erro){
            await fetchCustomers();
            message.success("Cliente editado com sucesso.", 3);
          }
          else {
            message.error("Erro: "+ status.erro, 3);
          }
        }
        else {
          message.error("Ocorreu um erro ao editar o cliente.", 3);
        }
    }
    setLoading(false);
  }

  const deleteCustomer = async () => {
    showModal();
    setLoading(true);
    let response_status = await customer_service.deleteCustomer(customer);

    let status = response_status.data[0];
      if(status){
        if(!status.erro){
          await fetchCustomers();
          message.success("Cliente excluido com sucesso.", 3);
        }
        else {
          message.error("Erro: "+ status.erro, 3);
        }
      }
      else {
        message.error("Ocorreu um erro ao criar o cliente.", 3);
      }
    setLoading(false);
  }

  const validadeCpf = async (strCpf) => {
    if (!/[0-9]{11}/.test(strCpf)) return false;
    if (strCpf === "00000000000") return false;
    let soma = 0;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    let resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    soma = 0;

    for (let j = 1; j <= 10; j++) {
        soma += parseInt(strCpf.substring(j - 1, j)) * (12 - j);
    }
    resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto !== parseInt(strCpf.substring(10, 11))) {
        return false;
    }

    return true;
  }

  const selectedPage = (value) => {
    setPage(value);
    fetchMovies(value);
    $('html').animate({
      scrollTop: $("#result-pagination").offset().top
    })
  }

  const setNewName = e => {
    setName(e.target.value);
  }

  const setNewCpf = e => {
    setCpf(e.target.value);
  }

  const setNewEmail = e => {
    setEmail(e.target.value);
  }

  const setEditName = e => {
    setNameEdit(e.target.value);
  }

  const setEditCpf = e => {
    setCpfEdit(e.target.value);
  }

  const setEditEmail = e => {
    setEmailEdit(e.target.value);
  }

  const columns = [
    {
        title: (<span><h3>Filmes</h3></span>),
        dataIndex: 'poster_path',
        key: 'poster_path',
        align: 'left',
        width: '30%',
        render: (text, record) => <span> 
                                    <div class="d-flex flex-column bd-highlight">
                                      <div class="bd-highlight">
                                        <h3>Título: {record.title}</h3>
                                      </div>
                                      <div class="bd-highlight">
                                      <Image width={200} src={"https://image.tmdb.org/t/p/w185/" + record.poster_path} />
                                      </div>
                                    </div>
                                  </span>
    },
    {
        title: (<span><h3>Informações adicionais</h3></span>),
        dataIndex: 'overview',
        key: 'overview',
        align: 'left',
        width: '50%',
        render: (text, record) => <span> 
                                    <div class="d-flex flex-column bd-highlight">
                                      <div class="bd-highlight">
                                        <p>Título original: {record.original_title}</p>
                                      </div>
                                      <div class="bd-highlight">
                                        <p>Sinopse: {record.overview}</p>
                                      </div>
                                      <div class="bd-highlight">
                                        <p>Popularidade: {record.popularity}</p>
                                      </div>
                                      <div class="bd-highlight">
                                        <p>Lançamento: {record.release_date}</p>
                                      </div>
                                    </div>
                                  </span>
    },
    {
        title: (<span><h3>Ação</h3></span>),
        key: 'Action',
        width: '20%',
        align: 'center',
        render: (text, record) => (
            <Button.Group>
                <div style={{ padding: "7px" }}>
                  {record.favorite ? 
                  <Popconfirm placement="left" title={"Tem certeza que deseja Desfavoritar?"} onConfirm={() => removeFavoriteMovie(record, "fav")} okText="Sim" cancelText="Não">
                      <Tooltip placement="top" title={"Desfavoritar"}>
                          <a><StarFilled /></a>
                      </Tooltip>
                  </Popconfirm>
                  : 
                  <Popconfirm placement="left" title={"Tem certeza que deseja Favoritar?"} onConfirm={() => addMovie(record, "fav")} okText="Sim" cancelText="Não">
                    <Tooltip placement="top" title={"Favoritar"}>
                        <a><StarOutlined /></a>
                    </Tooltip>
                  </Popconfirm>
                  }
                </div>
                <div style={{ padding: "7px" }}>
                    {listMovie ? 
                    <Popconfirm placement="left" title={"Tem certeza que deseja remover?"} onConfirm={() => removeMovie(record)} okText="Sim" cancelText="Não">
                      <Tooltip placement="top" title={"Remover da lista"}>
                          <a><DeleteOutlined /></a>
                      </Tooltip>
                    </Popconfirm>
                    :
                    <Popconfirm placement="left" title={"Tem certeza que deseja adicionar?"} onConfirm={() => addMovie(record)} okText="Sim" cancelText="Não">
                      <Tooltip placement="top" title={"Adicionar à lista"}>
                          <a><PlusOutlined /></a>
                      </Tooltip>
                    </Popconfirm>
                    }
                </div>
            </Button.Group>
        ),
    },
  ];

  return (
    cookie.Id ? 
    <Spin spinning={loading}>
      <div className="home">
        <div class="d-flex flex-column bd-highlight">
          <div class="bd-highlight">
            <h1>GRVPPE - Frontend</h1>
          </div>
          <div class="bd-highlight">

            <Modal title="Clientes" visible={modal} onCancel={() => showModal()} footer={null}>

            <Tabs defaultActiveKey="1">
              <TabPane tab="Cadastrar" key="1">
                <div class="d-flex flex-column bd-highlight">
                  <div class="p-2 bd-highlight">
                    <Input placeholder="Digite um nome" onChange={setNewName} value={name}/>
                  </div>
                  <div class="p-2 bd-highlight">
                    <Input placeholder="Digite um cpf" onChange={setNewCpf} value={cpf}/>
                  </div>
                  <div class="p-2 bd-highlight">
                    <Input placeholder="Digite um email" onChange={setNewEmail} value={email}/>
                  </div>
                  <div class="p-2 bd-highlight">
                    <Button onClick={() => createNewCustomer()}>Cadastrar</Button>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Editar" key="2">
                {editCustomer ?
                  <div class="d-flex flex-column bd-highlight">
                    <div class="p-2 bd-highlight">
                      <Input placeholder={editCustomer.name} onChange={setEditName} value={nameEdit}/>
                    </div>
                    <div class="p-2 bd-highlight">
                      <Input placeholder={editCustomer.cpf} onChange={setEditCpf} value={cpfEdit}/>
                    </div>
                    <div class="p-2 bd-highlight">
                      <Input placeholder={editCustomer.email} onChange={setEditEmail} value={emailEdit}/>
                    </div>
                    <div class="p-2 bd-highlight">
                      <Button onClick={() => EditCustomer()}>Editar</Button>
                    </div>
                  </div>
                :
                <p>Selecione um cliente primeiro.</p>
                }
              </TabPane>
              <TabPane tab="Excluir" key="3">
              {editCustomer ?
                <div class="d-flex flex-column bd-highlight">
                    <div class="p-2 bd-highlight">
                      <Input placeholder="Digite um nome" defaultValue={editCustomer.name} disabled={true}/>
                    </div>
                    <div class="p-2 bd-highlight">
                      <Input placeholder="Digite um cpf" defaultValue={editCustomer.cpf} disabled={true}/>
                    </div>
                    <div class="p-2 bd-highlight">
                      <Input placeholder="Digite um email" defaultValue={editCustomer.email} disabled={true}/>
                    </div>
                    <div class="p-2 bd-highlight">
                      <Button onClick={() => deleteCustomer()}>Excluir</Button>
                    </div>
                  </div>
                :
                <p>Selecione um cliente primeiro.</p>
                }
              </TabPane>
            </Tabs>
            </Modal>

            <AutoComplete options={options} style={{ width: '20%', padding: '20px 0', paddingRight: '20px' }} onSelect={(value) => selectedCustomer(value)} placeholder="Selecione um cliente" filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1} />
            {listMovie ? <Button onClick={() => fetchMovies(1)}>Todos os filmes</Button> : <Button onClick={entryListMovies}>Lista de filmes</Button>}
            <Button onClick={() => showModal()} style={{ marginLeft: '20px' }}>Clientes</Button>
            <Table columns={columns} dataSource={optionsTable} style={{ height: "100%" }} pagination={false} />
            {listMovie ? null : <Pagination simple defaultCurrent={1} current={page} defaultPageSize={20} total={maxPage} onChange={(e) => selectedPage(e)} style={{ padding: '20px 0'}} />}
          </div>
        </div>
      </div>
    </Spin>
    :
    <Redirect to="/login" />
  )
}

export default Home;
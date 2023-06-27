'use client'

// import { useData } from '../../../../contexts/DataContext';
import { useEffect, useState } from 'react';
import MenuSite from '@/components/menuSite';
import { MD5 } from 'crypto-js';


// export const metadata = {
//   title: 'Clarice - Registro',
//   description: 'Site clarice',
// }

interface Dados {
  Titulo: string;
  Subtitulo: string;
  home: [
    {
      tipo: string,
      dados: [],
      Titulo: string,
      conteudo: string,
      class: string,
      imagem: string
    }
  ]
}

function logar(props: any) {

  if (props.login == props.data.usuario && MD5(props.senha).toString() == props.data.senha) {
    props.setLogado(true)
  }else{
    props.setErroLogin('Usuario ou senha inválido');
  }
}


let RenderLogin = (props: any) => {

  return (
    <div className='flex justify-center'>
      <div className='w-500 '>
        <form onSubmit={(e) => {e.preventDefault(); logar(props)}}>
          <p>Usuario:</p>
          <input type="text" value={props.login} onChange={e => props.setLogin(e.target.value)} className="rounded-md border-0 py-1.5 pl-2 pr-9 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>


          <p className='mt-4'>senha:</p>
          <input type="password" value={props.senha} onChange={e => props.setSenha(e.target.value)} className="rounded-md border-0 py-1.5 pl-2 pr-9 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>

          <button
            onClick={() => logar(props)}
            className="block mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Entrar
          </button>
          <p className='text-red-500 my-2'>{props.erroLogin}</p>
        </form>

      </div>
    </div>
  )
}

let RenderConfiguracoes = (props: any) => {

  let htmlPaginas = [];

  // let pagina = props.dadosJson.paginas[props.menuAtivo]
  let i = props.menuAtivo;

  //obtendo os dados da pagina do link
	var objetoPagina = props.dadosJson.paginas.filter(function(item:any, key:any) {
    if(item.link === props.menuAtivo || (item.link == '' && props.menuAtivo == 'home')){
      item.keyPagina = key;
      return true;
    }
	});

  if(objetoPagina.length <= 0){
    return <></>
  }


  // nome da pagina
  htmlPaginas.push(
    <div key={'pag_' + i} className='mt-2 flex flex-col mx-3'>
      <div>
        <div>
          <span className='  text-red-300 mb-4 inline-block float-right' onClick={() => { delete(props.dadosJson.paginas[objetoPagina[0].keyPagina]); props.handleAlterar(props.dadosJson); props.setMenuAtivo('') }}>
            <div className='flex'>
              Remover menu
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>
          </span>
        </div>
        
        <label>Nome: </label>
        <input  type="text" value={objetoPagina[0].nome} onChange={e => { objetoPagina[0].nome = e.target.value; props.handleAlterar(props.dadosJson); }} className=" w-150 rounded-md border-0 py-1.5 pl-2 pr-9 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
      </div>
      <div className='mt-2'>
        <label>Link: </label>
        <input key={'pag_Link' + i} type="text" value={objetoPagina[0].newlink} onChange={e => { objetoPagina[0].newlink = e.target.value; props.handleAlterar(props.dadosJson); }} className=" w-150 rounded-md border-0 py-1.5 pl-2 pr-9 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
      </div>
      <p><small><i>Obs: Não deixar o link com o valor vazio e não repetir links</i></small></p>
    </div>
  )

  let htmlSessao = [];


  for (let x in objetoPagina[0].sessoes) {
    let sessao = objetoPagina[0].sessoes[x];

    if (!sessao) {
      delete (objetoPagina[0].sessoes[x])
      continue;
    }

    let htmlInputs = [];

    htmlInputs.push(
      <div key={'titulo_' + i + '_' + x} className='mb-6 flex flex-col '>
        <div>
          <span className='  text-red-300 mb-4 inline-block float-right' onClick={() => { delete(objetoPagina[0].sessoes[x]); props.handleAlterar(props.dadosJson); }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </span>
        </div>

        <label>Titulo:</label>
        <input type="text" value={sessao.Titulo} onChange={e => { sessao.Titulo = e.target.value; props.handleAlterar(props.dadosJson); }} className=" w-200 rounded-md border-0 py-1.5 pl-2 pr-9 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
      </div>
    );

    htmlInputs.push(
      <div key={'tipo_' + i + '_' + x}>
        <select value={sessao?.tipo || 'conteudo'} onChange={(e) => {sessao.tipo = e.target.value; props.handleAlterar(props.dadosJson) }} className='p-1 mb-1 rounded-sm'>
          <option value="lista">Lista</option>
          <option value="conteudo">Conteúdo</option>
        </select>
      </div>
    );

    if (sessao?.tipo == 'lista') {
      for (let z in sessao.dados) {
        
        if (sessao.dados[z] == null) {
          sessao.dados[z] = '';
          // props.handleAlterar(props.dadosJson);
        }

        htmlInputs.push(
          <div key={'ses_' + i + '_' + x + '_' + z} className='flex'>
            <input type="text" value={sessao?.dados[z] || ''} onChange={e => { sessao.dados[z] = e.target.value; props.handleAlterar(props.dadosJson); }} className=" w-full my-1 mr-2 rounded-md border-0 py-1.5 pl-2 pr-9 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
            <button onClick={() => { delete (sessao.dados[z]); props.handleAlterar(props.dadosJson); }} className='hover:text-red-400'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>);
      }
      htmlInputs.push(
        <div key={'button_' + i + '_' + x + '_'}>
          <button className='ml-1 mx-4 hover:text-green-600' onClick={() => { sessao.dados.push(''); props.handleAlterar(props.dadosJson); }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      );
    }
    else {
      htmlInputs.push(
        <div key={'conteudo_' + i + '_' + x} className='mb-5'>
          <textarea rows={4} value={sessao?.conteudo || ''} onChange={e => { sessao.conteudo = e.target.value;; props.handleAlterar(props.dadosJson); }} className="w-full my-1 mr-2 rounded-md border-0 py-1.5 pl-2 pr-9 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>);
    }

    htmlInputs.push(
      <div key={'imagens_' + i + '_' + x} className='mb-5'>
        <label>Url Imagem:</label>
        <input type="text" value={sessao.imagem} onChange={e => { sessao.imagem = e.target.value;; props.handleAlterar(props.dadosJson); }} className=" w-full my-1 mr-2 rounded-md border-0 py-1.5 pl-2 pr-9 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
      </div>
    );

    htmlSessao.push(<div key={'container_' + i + '_' + x} className="mt-10" style={{ "background": "white", "padding": "10px", "boxShadow": "3px 2px 3px silver" }}>{htmlInputs}</div>)

  }

  htmlPaginas.push(
    <div key={'div2_' + i} className='ml-3 mt-4 mb-20'>

      {htmlSessao}

      <div className='flex align-middle justify-center my-7' >
        <button onClick={() => { objetoPagina[0].sessoes.push({ Titulo: '', conteudo: '', tipo: 'conteudo', imagem: '', dados: [] }); props.handleAlterar(props.dadosJson); }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block text-green-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Adicionar sessão
        </button>
      </div>



    </div>);


  return htmlPaginas;

}

export default function Home() {

  // const data = useData();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [logado, setLogado] = useState(false);
  const [dados, setDados] = useState<any[]>([]);
  const [menuAtivo, setMenuAtivo] = useState('home');
  const [mensagemPost, setMensagemPost] = useState('');
  const [postErro, setPostErro] = useState(false);
  const [erroLogin, setErroLogin] = useState('');
  const [menusCriados, setMenusCriados] = useState(1);

  const [itens, setItens] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);


  useEffect(() => {

    document.title = 'Clarice - Configuração';

    async function fetchData() {
      const protocol = window.location.protocol;
      const host = window.location.host;
      const url = protocol + '//' + host + '/api';
      let response = await fetch(url);
      let res = await response.json();
      res = JSON.parse(res);
      for(let i in res.paginas){
        res.paginas[i].newlink = res.paginas[i].link
      }
      setDados(res);
    }

    fetchData();
  }, []);



  const handleAlterar = (dat: any) => {

    setDados((prevDados: any) => ({
      ...dat,
    }));
  };

  const handleNovoLink = () => {
    let copyDados:any = dados;
    copyDados.paginas.push({
      nome: 'Alterar '+menusCriados,
      link: 'alterar-'+menusCriados,
      newlink: 'alterar-'+menusCriados,
      posicao : 0,
      sessoes:[
        { Titulo: '', conteudo: 'Em construção', tipo: 'conteudo', imagem: '', dados: [] },
      ]
    })

    setMenusCriados(menusCriados+1);

    handleAlterar(copyDados)
   
  };

  const salvar = async () => {

    const url = window.location.protocol + '//' + window.location.host + '/api';
    setMensagemPost('');
    setPostErro(false)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição.');
      }

      // Sucesso - fazer algo com a resposta
      console.log('Requisição POST bem-sucedida!');
      window.location.reload;
      setMensagemPost('Tá salvo muleke')
    } catch (error) {
      // Tratar erros
      console.error('Erro na requisição POST:', error);
      setMensagemPost('Ops algo deu errado, chama o Gile')
      setPostErro(true)
    }
  };



  return (
    <>
    {dados &&
        <section>

          {!logado ?
            <RenderLogin senha={senha} setSenha={setSenha} login={login} setLogin={setLogin} data={dados} setLogado={setLogado} erroLogin={erroLogin} setErroLogin={setErroLogin} />
            :
            <>
              {/* <div className='flex align-middle justify-center my-7' >
                <button onClick={() => handleNovoLink()}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block text-green-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Novo menu
                </button>
              </div> */}
              
              <MenuSite dadosJson={dados} menuAtivo={menuAtivo} setMenuAtivo={setMenuAtivo} setMensagemPost={setMensagemPost} handleAlterar={handleAlterar} handleNovoLink={handleNovoLink} />
              <RenderConfiguracoes dadosJson={dados} setDados={setDados} handleAlterar={handleAlterar} menuAtivo={menuAtivo} setMenuAtivo={setMenuAtivo}/>
              <button
                onClick={() => salvar()}
                className="block mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                Salvar
              </button>
              {mensagemPost && <p className={' mt-4 font-medium ' + (!postErro ? ' text-green-600' : 'text-red-400')}>{mensagemPost}</p>}
            </>

          }

        </section>
  }
    </>
  )
}

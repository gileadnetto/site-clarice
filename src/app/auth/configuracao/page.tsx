'use client'

import { useData } from '../../../../contexts/DataContext';
import { useEffect, useState } from 'react';
import MenuSite from '@/components/menuSite';

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

function logar(dados: any) {
  if (dados.login == dados.data.usuario && dados.senha == dados.data.senha) {
    dados.setLogado(true)
  }
}


let RenderLogin = (props: any) => {

  return (
    <div>
      <p>Usuario:</p>
      <input type="text" value={props.login} onChange={e => props.setLogin(e.target.value)} className="rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>


      <p className='mt-4'>senha:</p>
      <input type="password" value={props.senha} onChange={e => props.setSenha(e.target.value)} className="rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>

      <button
        onClick={() => logar(props)}
        className="block mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
        Entrar
      </button>

    </div>
  )
}

let RenderConfiguracoes = (props: any) => {

  let htmlPaginas = [];


  for (let i in props.dadosJson.paginas) {

    if (props.menuAtivo != i) {
      continue;
    }

    let pagina = props.dadosJson.paginas[i];
    htmlPaginas.push(<h2 key={'pag_' + i} className='font-medium text-2xl mt-6'>{i.toUpperCase()}</h2>)

    let htmlSessao = [];

    for (let x in pagina) {
      let sessao = pagina[x];

      if (!sessao) {
        delete (pagina[x])
        continue;
      }

      let htmlInputs = [];

      htmlInputs.push(
        <div key={'titulo_' + i + '_' + x} className='mb-6 flex flex-col '>
          <span className='  text-red-300' onClick={() => { delete (pagina[x]); props.handleAlterar(props.dadosJson); }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block float-right">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </span>

          <label>Titulo:</label>
          <input type="text" value={props.dadosJson.paginas[i][x]?.Titulo || ''} onChange={e => { props.dadosJson.paginas[i][x].Titulo = e.target.value; props.handleAlterar(props.dadosJson); }} className=" w-200 rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
        </div>
      );

      htmlInputs.push(
        <div key={'tipo_' + i + '_' + x}>
          <select value={props.dadosJson.paginas[i][x]?.tipo || 'conteudo'} onChange={(e) => { props.dadosJson.paginas[i][x].tipo = e.target.value; props.handleAlterar(props.dadosJson) }} className='p-1 mb-1 rounded-sm'>
            <option value="lista">Lista</option>
            <option value="conteudo">Conteúdo</option>
          </select>
        </div>
      );

      if (sessao?.tipo == 'lista') {
        for (let z in sessao.dados) {
          
          if (sessao.dados[z] == null) {
            sessao.dados[z] = '';
            props.handleAlterar(props.dadosJson);
          }

          htmlInputs.push(
            <div key={'ses_' + i + '_' + x + '_' + z} className='flex'>
              <input type="text" value={sessao?.dados[z] || ''} onChange={e => { sessao.dados[z] = e.target.value; props.handleAlterar(props.dadosJson); }} className=" w-full my-1 mr-2 rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
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
            <textarea rows={4} value={sessao?.conteudo || ''} onChange={e => { sessao.conteudo = e.target.value;; props.handleAlterar(props.dadosJson); }} className="w-full my-1 mr-2 rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>);
      }

      htmlInputs.push(
        <div key={'imagens_' + i + '_' + x} className='mb-5'>
          <label>Url Imagem:</label>
          <input type="text" value={sessao.imagem} onChange={e => { sessao.imagem = e.target.value;; props.handleAlterar(props.dadosJson); }} className=" w-full my-1 mr-2 rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
        </div>
      );

      htmlSessao.push(<div key={'container_' + i + '_' + x} className="mt-10" style={{ "background": "white", "padding": "10px", "boxShadow": "3px 2px 3px silver" }}>{htmlInputs}</div>)

    }

    htmlPaginas.push(
      <div key={'div2_' + i} className='ml-3 mt-4 mb-20'>

        {htmlSessao}

        <div className='flex align-middle justify-center my-7' >
          <button onClick={() => { props.dadosJson.paginas[i].push({ Titulo: '', conteudo: '', tipo: 'conteudo', imagem: '', dados: [] }); props.handleAlterar(props.dadosJson); }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block text-green-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Adicionar
          </button>
        </div>



      </div>);

  }

  return htmlPaginas;

}

export default function Home() {

  const data = useData();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [logado, setLogado] = useState(false);
  const [dados, setDados] = useState(JSON.parse(JSON.stringify(data)));
  const [menuAtivo, setMenuAtivo] = useState('home');
  const [mensagemPost, setMensagemPost] = useState('');
  const [postErro, setPostErro] = useState(false);





  useEffect(() => {

    document.title = 'Clarice - Configuração';

    async function fetchData() {
      const protocol = window.location.protocol;
      const host = window.location.host;
      const url = protocol + '//' + host + '/api';
      let response = await fetch(url);
      let res = await response.json();
      setDados(JSON.parse(res));
    }

    fetchData();
  }, []);



  const handleAlterar = (dat: any) => {

    setDados((prevDados: any) => ({
      ...dat,
    }));
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
      <section>

        {!logado ?
          <RenderLogin senha={senha} setSenha={setSenha} login={login} setLogin={setLogin} data={dados} setLogado={setLogado} />
          :
          <>
            <MenuSite dadosJson={dados} menuAtivo={menuAtivo} setMenuAtivo={setMenuAtivo} setMensagemPost={setMensagemPost} />
            <RenderConfiguracoes dadosJson={dados} setDados={setDados} handleAlterar={handleAlterar} menuAtivo={menuAtivo} />
            <button
              onClick={() => salvar()}
              className="block mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Salvar
            </button>
            {mensagemPost && <p className={' mt-4 font-medium ' + (!postErro ? ' text-green-600' : 'text-red-400')}>{mensagemPost}</p>}
          </>

        }

      </section>
    </>
  )
}

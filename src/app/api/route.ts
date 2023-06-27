import { NextResponse } from 'next/server';
import { MD5 } from 'crypto-js';
const os = require('os');



import {connectToDatabase} from '../../../config/mongodb';

export async function GET(req: Request){

  const { db, client } = await connectToDatabase();

  let jsonDados:any = [];
  try{
    await db.collection('gilead').find({}).toArray().then((dados:any) => {
      dados = dados[0];
      dados.dados.senha =  MD5(dados.dados.senha).toString();
      jsonDados = dados;
    }).catch(function(e:any) {
      return NextResponse.json(JSON.stringify({erro: e.message}))
   });
  }catch(e:any){
    return NextResponse.json(JSON.stringify({erro: e.message}))
  }

  return NextResponse.json(JSON.stringify(jsonDados.dados))
}

export async function POST(request: Request){

  let dadosConfig = await request.json();

  // dadosConfig = '{"nome":"Clarice Netto","usuario":"clarice","senha":"netto","paginas":[{"nome":"Home","link":"home","posicao":0,"sessoes":[{"Titulo":"P","tipo":"conteudo","imagem":"https://images.educamaisbrasil.com.br/content/internal/marketplace/educamaisbrasil/images/avaliacao/teoria.jpg","dados":[],"conteudo":"The workshop <b>Geometry in Algebra and Algebra in Geometry</b> VIIwill be held at Instituto de Ciências Exatas da Universidade Federal de Minas Gerais (ICEx) from Monday 23th to Friday 27th of October, 2023.It is the seventh edition of the workshop which has as aim to join young researchers whose research interests belong to interconnections between Algebra and Geometry.<br><br>The conference will take place at the Instituto de Ciências Exatas da Universidade Federal de Minas Gerais (ICEx-UFMG)."},{"Titulo":"","conteudo":"We plan to have 2 mini-courses and several scientific talks.","tipo":"conteudo","imagem":"","dados":[]},{"Titulo":"MINI-COURSES","tipo":"lista","imagem":"","conteudo":"","dados":["Daniele Faenzi(UB-France). <b>TBA</b>.","Miquel Cueca Ten(Gottingen University). <b>TBA.</b>","",""]},{"conteudo":"Questions should be addressed to: gaag@ime.usp.br (regarding scientific program, venue, lodging etc.) or to the organizers:","Titulo":"Minha lista do que fazer ","tipo":"lista","imagem":"https://img.freepik.com/fotos-gratis/respingo-colorido-abstrato-3d-background-generativo-ai-background_60438-2509.jpg","dados":["Ir a praia","Jogar no PC","Ir pra piscina","Andar de carro","Estudar um pouco só","Ainda consigo criar um link para o"]}]},{"nome":"Programas","link":"programas","posicao":0,"sessoes":[{"Titulo":"Programas","tipo":"conteudo","imagem":"","conteudo":"Em criação","dados":[]},{"Titulo":"Programa 2","conteudo":"tetteet <b>negrito</b> ","tipo":"conteudo","imagem":"","dados":[]}]},{"nome":"Participantes","link":"participantes","posicao":0,"sessoes":[{"Titulo":"Participants","tipo":"lista","imagem":"","conteudo":"Eu Gilead teste <b>netto</b>","dados":["André Netto","Clarice Netto","Gilead Netto (eu)","Fernanda Py","Jose Carlos","Rosani Souza","Emilly"]}]},{"nome":"Preview","link":"preview","posicao":0,"sessoes":[{"Titulo":"Previous Editions","tipo":"conteudo","imagem":"","conteudo":"The Workshop on Poisson Geometry and Related topics is an anual event to the Poisson Geometry Brazilian Community.","dados":[]}]},{"nome":"Registration","link":"registration","posicao":0,"sessoes":[{"Titulo":"Registration","tipo":"conteudo","imagem":"","conteudo":"","dados":[]}]},{"nome":"Informações","link":"informacoes","posicao":0,"sessoes":[{"Titulo":"Informações","tipo":"conteudo","imagem":"","conteudo":"Em criação","dados":[]},{"Titulo":"Novas informações","conteudo":"N tem mais nada aqui ","tipo":"conteudo","imagem":"","dados":[]},{"Titulo":"Tenho novas boas","conteudo":"So tem velhas","tipo":"conteudo","imagem":"","dados":[]}]},{"nome":"Poster","link":"poster","posicao":0,"sessoes":[{"Titulo":"Novo Poster","tipo":"conteudo","imagem":"","conteudo":"Meu primeiro poster cadastro teste Não me venha com essas desculpas","dados":[]},{"Titulo":"Lista personalizada","conteudo":"","tipo":"lista","imagem":"","dados":["Lista 1","Lista 2","Lista 3","Lista 4","Lista 5"]}]}]}'

  dadosConfig = JSON.parse(dadosConfig);
    const { db, client } = await connectToDatabase();

    let jsonDados:any = [];
    await db.collection('gilead').find({}).toArray().then((dados:any) => {
      jsonDados = dados[0];
      dadosConfig.senha = jsonDados.dados.senha
    })

    dadosConfig.paginas = dadosConfig.paginas.filter( (element:any) => element !== null);

    //removendo os nulls dos dados
    for(let pag in dadosConfig.paginas){

      dadosConfig.paginas[pag].sessoes = dadosConfig.paginas[pag].sessoes.filter( (element:any) => element !== null);

      for(let sesId in dadosConfig.paginas[pag].sessoes){

        console.log(pag, dadosConfig.paginas[pag].sessoes);

        if(dadosConfig.paginas[pag].sessoes[sesId].dados){
          dadosConfig.paginas[pag].sessoes[sesId].dados = dadosConfig.paginas[pag].sessoes[sesId].dados.filter( (element:any) => element !== null);
        }
      }
    }

    //alterando o link e removendo a variavel com o link novo
    for(let i in dadosConfig.paginas){
      dadosConfig.paginas[i].link = dadosConfig.paginas[i].newlink
      delete(dadosConfig.paginas[i].newlink);
    }

     await db.collection('gilead').updateOne(
       { _id: jsonDados._id}, // Critério de filtro para encontrar o documento
       { $set: { dados: dadosConfig } } // Atualização a ser aplicada
     );

    // await db.collection('clarice').updateOne({ slug }, { $set: { dadosConfig }})
    //  await db.collection('gilead').insertOne({ dados: dadosConfig })
  // return NextResponse.json({ revalidated: true, now: Date.now() })

  return NextResponse.json({ sucesso: true })
}

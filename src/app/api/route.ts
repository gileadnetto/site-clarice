import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import {dbConnect} from '../../../lib/db-connect';
import { MD5 } from 'crypto-js';


import {connectToDatabase} from '../../../config/mongodb';

export async function GET(req: Request){

  const { db, client } = await connectToDatabase();

  let jsonDados:any = [];
  await db.collection('clarice').find({}).toArray().then((dados:any) => {
    dados = dados[0];
    dados.dados.senha =  MD5(dados.dados.senha).toString();
    jsonDados = dados;
  })




  // const jsonDirectory = path.join(process.cwd(), 'data');
  // const fileContents =  await fs.readFile(jsonDirectory + '/dados.json', 'utf8');
  // let jsonDados = await JSON.parse(fileContents)


  // // await db.collection('clarice').insertOne({ dados: jsonDados })

  
  //  // Obtenha o protocolo e o host usando o objeto 'req'
  //  const protocol = req.headers.get('x-forwarded-proto');
  //  const host = req.headers.get('x-forwarded-host');
 
  //  // Faça o que quiser com o protocolo e o host
  //  jsonDados['Protocol'] = protocol;
  //  jsonDados['Host'] = host;
  // //  jsonDados.senha = md5(jsonDados.senha);
  //  jsonDados = JSON.stringify(jsonDados)

  
  return NextResponse.json(JSON.stringify(jsonDados.dados))
}

export async function POST(request: Request){

  let dadosConfig = await request.json();

  //  dadosConfig = await JSON.parse(dadosConfig);
  //  console.log('dadosConfig2', dadosConfig);


    const { db, client } = await connectToDatabase();

    let jsonDados:any = [];
    await db.collection('clarice').find({}).toArray().then((dados:any) => {
      jsonDados = dados[0];
      dadosConfig.senha = jsonDados.dados.senha
    })

    await db.collection('clarice').updateOne(
      { _id: jsonDados._id}, // Critério de filtro para encontrar o documento
      { $set: { dados: dadosConfig } } // Atualização a ser aplicada
    );

    // await db.collection('clarice').updateOne({ slug }, { $set: { dadosConfig }})

    // await db.collection('clarice').insertOne({ dados: dadosConfig })

     

  // try{
  //   const jsonDirectory = path.join(process.cwd(), 'data');
  //   await fs.writeFile(jsonDirectory + '/dados.json', JSON.stringify(dadosConfig));
  // }catch (erro: any) {
  //   return NextResponse.json({ erro: erro.message })
  // }
  

  // return NextResponse.json({ revalidated: true, now: Date.now() })

  return NextResponse.json({ sucesso: true })
}

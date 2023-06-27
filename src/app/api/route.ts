import { NextResponse } from 'next/server';
import { MD5 } from 'crypto-js';
const os = require('os');



import { connectToDatabase } from '../../../config/mongodb';

export async function GET(req: Request) {

	const { db, client } = await connectToDatabase();

	let jsonDados: any = [];
	try {
		await db.collection('clarice').find({}).toArray().then((dados: any) => {
			dados = dados[0];
			dados.dados.senha = MD5(dados.dados.senha).toString();
			jsonDados = dados;
		}).catch(function (e: any) {
			return NextResponse.json(JSON.stringify({ erro: e.message }))
		});
	} catch (e: any) {
		return NextResponse.json(JSON.stringify({ erro: e.message }))
	}

	return NextResponse.json(JSON.stringify(jsonDados.dados))
}

export async function POST(request: Request) {

	let dadosConfig = await request.json();

	const { db, client } = await connectToDatabase();

	let jsonDados: any = [];
	await db.collection('clarice').find({}).toArray().then((dados: any) => {
		jsonDados = dados[0];
		dadosConfig.senha = jsonDados.dados.senha
	})

	dadosConfig.paginas = dadosConfig.paginas.filter((element: any) => element !== null);

	//removendo os nulls dos dados
	for (let pag in dadosConfig.paginas) {

		dadosConfig.paginas[pag].sessoes = dadosConfig.paginas[pag].sessoes.filter((element: any) => element !== null);

		for (let sesId in dadosConfig.paginas[pag].sessoes) {
			if (dadosConfig.paginas[pag].sessoes[sesId].dados) {
				dadosConfig.paginas[pag].sessoes[sesId].dados = dadosConfig.paginas[pag].sessoes[sesId].dados.filter((element: any) => element !== null);
			}
		}
	}

	//alterando o link e removendo a variavel com o link novo
	for (let i in dadosConfig.paginas) {
		dadosConfig.paginas[i].link = dadosConfig.paginas[i].newlink
		delete (dadosConfig.paginas[i].newlink);
	}

	await db.collection('clarice').updateOne(
		{ _id: jsonDados._id }, // Critério de filtro para encontrar o documento
		{ $set: { dados: dadosConfig } } // Atualização a ser aplicada
	);

	// await db.collection('clarice').updateOne({ slug }, { $set: { dadosConfig }})
	//  await db.collection('gilead').insertOne({ dados: dadosConfig })
	// return NextResponse.json({ revalidated: true, now: Date.now() })

	return NextResponse.json({ sucesso: true })
}

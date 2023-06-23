import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req: Request){

  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents =  await fs.readFile(jsonDirectory + '/dados.json', 'utf8');
  let jsonDados = await JSON.parse(fileContents)

   // Obtenha o protocolo e o host usando o objeto 'req'
   const protocol = req.headers.get('x-forwarded-proto');
   const host = req.headers.get('x-forwarded-host');
 
   // Faça o que quiser com o protocolo e o host
   jsonDados['Protocol'] = protocol;
   jsonDados['Host'] = host;
  //  jsonDados.senha = md5(jsonDados.senha);
   jsonDados = JSON.stringify(jsonDados)

  
  return NextResponse.json(jsonDados)
}

export async function POST(request: Request){

  const dadosConfig = await request.json();
      

  // let test = JSON.parse(da)
  const jsonDirectory = path.join(process.cwd(), 'data');

  const fileContents = await fs.writeFile(jsonDirectory + '/dados.json', JSON.stringify(dadosConfig));

  // return NextResponse.json({ revalidated: true, now: Date.now() })

  return NextResponse.json({ sucesso: true })
}

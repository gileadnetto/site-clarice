import { validateConfig } from 'next/dist/server/config-shared';
import RenderDados from '../../components/renderDados';

interface ProdProps{
  params:{
    index:string
  }
} 

export const revalidate = 60

export default async function Page({params} : ProdProps) {

  var data: any = [];

  try {
      let response = await fetch(process.env.API_VERCEL_URL || 'http://localhost:3000/api');
      let respon = await response.json();
      data = await JSON.parse(respon);

  } catch (erro) {
      data = [];
  }

  let render = params?.index ?  params?.index : 'home';
 
  if( Object.keys(data).length > 0) return <RenderDados dadosJson={data} pagina={render} ></RenderDados>

   return <></>
}
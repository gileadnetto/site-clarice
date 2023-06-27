'use client'
import { useData } from '../../../contexts/DataContext';
import { useEffect, useState } from 'react';
import RenderDados from '../../components/renderDados';


export default async function Page(props:any) {
  const data = useData();
  const [dados, setDados] = useState(data);

  let render = 'home';
  if(props?.searchParams  && Object.keys((props.searchParams)).length > 0){
    render = await Object.keys((props.searchParams))[0].toString();
  }
 
   if( Object.keys(dados).length > 0) return <RenderDados dadosJson={dados} pagina={render} ></RenderDados>

   return <></>

  } 
'use client'

import Image from 'next/image';
import { useData } from '../../contexts/DataContext';
import { useEffect, useState } from 'react';
import RenderDados from '../components/renderDados'

// export const metadata = {
//   title: 'Clarice - Registro',
//   description: 'Site clarice',
// }

interface Dados {
  Titulo: string;
  Subtitulo: string;
  paginas:{
    home:[
      {
        tipo: string,
        dados: [],
        Titulo:string,
        conteudo: string,
        class:string,
        imagem:string
      }
    ]
  }
}

export const revalidate = 60 

export default async function Home() {
  // const data = useData();
  const [dados, setDados] = useState(null);

	useEffect(() => {

		document.title = 'Clarice - Home';

		async function fetchData() {
			const protocol = window.location.protocol;
			const host = window.location.host;

			const url = protocol + '//' + host + '/api';
			let response = await fetch(url, { next: { revalidate: 60 }, cache: 'force-cache'});
			let respon = await response.json();
			setDados(JSON.parse(respon));

		}
		fetchData();
	}, []);

  return (
    <>
      <RenderDados dadosJson={dados} pagina="home" ></RenderDados>
    </>
)
}

'use client'
import { useData } from '../../../contexts/DataContext';
import { useEffect, useState } from 'react';
import RenderDados from '../../components/renderDados'

// export const metadata = {
//   title: 'Clarice - Registro',
//   description: 'Site clarice',
// }


interface Dados {
	Titulo: string;
	Subtitulo: string;
	paginas: {
		quemSomos: [
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
}

export default async function Page() {
	const data = useData();
	let res: any = null;
	const [dados, setDados] = useState(JSON.parse(JSON.stringify(data)));

	useEffect(() => {

		document.title = 'Clarice - Registro';

		async function fetchData() {
			const protocol = window.location.protocol;
			const host = window.location.host;

			const url = protocol + '//' + host + '/api';
			let response = await fetch(url);
			let respon = await response.json();
			setDados(JSON.parse(respon));

		}
		fetchData();
	}, []);


	return (
		<>
			<RenderDados dadosJson={dados} pagina="registro" ></RenderDados>
		</>
	)
}

'use client'
import { useData } from '../../../contexts/DataContext';
import { useEffect, useState } from 'react';
import RenderDados from '@/components/renderDados'

export default function Page() {
  //   const data = useData();
  const [dados, setDados] = useState(null);

  useEffect(() => {

	  document.title = 'Clarice - Programas';

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
        <RenderDados dadosJson={dados} pagina="programas" ></RenderDados>
    </>
)
  }
  
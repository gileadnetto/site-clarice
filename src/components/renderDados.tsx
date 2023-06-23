'use client'

import Image from 'next/image';
import Link from "next/link";
import 'tailwindcss/tailwind.css';
import { useState } from "react";
// import { useState } from 'react';


const RenderDadosPadrao = (props: any) => {

	let html = [];

    let pag = props.pagina;
    let dadosJson = props.dadosJson

	for (let i in dadosJson.paginas[pag]) {
		let dado = dadosJson.paginas[pag][i];
		if(!dado){
			continue;
		}

		if (dado?.tipo == 'lista') {

			let htmlComp = [<p key={i + 'sad'} className="font-medium">{dado?.Titulo}</p>];
			// Adicionando elementos à lista

			let htmlCompAux = [];
			for (let x in dado.dados) {
				let classe = parseInt(x) == 0 ? 'pl-2 mb-1 mt-4' : 'pl-2 mb-1';
				let d = dado.dados[x];
				if(!d){
					continue;
				}
				htmlCompAux.push(<li key={'dd_' + x} className={classe} dangerouslySetInnerHTML={{ __html: d }}></li>);
			}
			// Adicionando mais elementos ao array htmlComp
			htmlComp.push(
				<ul key={'li_' + i} className='list-disc ml-7'>
					{htmlCompAux}
				</ul>
			);

			html.push(<section key={'section_' + i} className='mb-20'>{htmlComp}</section>);
		}
		else if (dado?.imagem) {
			html.push(
				<div key={pag + '_' + i} className={dado?.class || ''}>
					<p className='font-medium '>{dado.Titulo}</p>
					<section key={pag + '_' + i} className={'flex gap-5 mt-7 mb-20 ' + dado?.class || ''} >
						<div className='flex-1'>
							<p dangerouslySetInnerHTML={{ __html: dado.conteudo }}></p>
						</div>
						<div className='flex-1'>
							<Image src={dado.imagem} alt="imagem" width={500} height={300} crossOrigin="anonymous" />
						</div>
					</section>
				</div>
			);

		}
		else {
			html.push(
				<div key={pag +'2_' + i} className={dado?.class || ''}>
					<p className='font-medium '>{dado.Titulo}</p>
					<section className='mb-20 mt-6'>
						<p dangerouslySetInnerHTML={{ __html: dado.conteudo }}></p>
					</section>
				</div>
			)
		}

	}
	return html

}

export default function RenderDados(props:any) {
   
    return (
        <>
			{props.dadosJson && RenderDadosPadrao(props)}
		</>
    )
  }
  
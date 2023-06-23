'use client'

import Link from "next/link";
import 'tailwindcss/tailwind.css';
import { useState } from "react";

export default function MenuSite(props:any) {

    
  
    const renderMenus = () =>{
        let html = [];

        for(let i in props.dadosJson.paginas){
            let pagina = i;
            let nomePagina = i.toUpperCase();

            html.push(<li key={'ul_pag_'+i} className={ "hover:text-white transition-colors  cursor-pointer " + (props.menuAtivo == pagina ? 'ativo' : '' )} onClick={() => {props.setMenuAtivo(pagina); props.setMensagemPost('')}}>{nomePagina}</li>)
        }

        return html
    }

    return (
        <nav className='bg-zinc-300'>
            <ul style={{height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                {renderMenus()}
            </ul>
        </nav>
    )
  }
  
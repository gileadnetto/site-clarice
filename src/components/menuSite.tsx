'use client'

import Link from "next/link";
import 'tailwindcss/tailwind.css';
import { useState } from "react";

export default function MenuSite(props:any) {

    
  
    const renderMenus = () =>{
        let html = [];

        for(let i in props.dadosJson.paginas){
            let pagin = props.dadosJson.paginas[i];

            html.push(<li key={'ul_pag_'+i} className={ "transition-colors  cursor-pointer inline-block " + (props.menuAtivo == (pagin?.link || 'home') ? 'ativo' : '' )} onClick={() => {props.setMenuAtivo(pagin?.link || 'home'); props.setMensagemPost('')}}>{pagin.nome}</li>)
        }

        return html
    }

    return (
        <nav className=' menu-configuracao text-center mb-5'>
            <ul>
                {renderMenus()}
            </ul>
        </nav>
    )
  }
  
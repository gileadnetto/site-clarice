'use client'

import Link from "next/link";
import 'tailwindcss/tailwind.css';
import { useState, useEffect } from "react";
import { useData } from '../../contexts/DataContext';

// import { useState } from 'react';

export default function Menu(props:any) {
    const data = useData();

    const [ativo, setAtivo] = useState<any>(null);
    const [aberto, setAberto] = useState(false);
    const [title, setTitle] = useState('Home');


    useEffect(() => {

	 	document.title = 'xwpgrt';

	 	async function fetchData() {

            const url = new URL(window.location.href);
            const searchParams = new URLSearchParams(url.search);
            const firstParam = searchParams.keys().next().value;
            if(firstParam){
                setAtivo(firstParam);
            }
            else{
                setAtivo('home');
            }

	 	}
	 	fetchData();
    }, []);

    useEffect(() => {
        document.title = 'xwpgrt - '+ title;
   }, [title]);

    const Links = ( props:any ) =>{

        let html = [];
        for(let pag in data.paginas){
            let pagin = data.paginas[pag];
            html.push(<li key={'menu_'+pag} className={ (props?.mobile ? 'hover:text-cor-principal transition-colors py-3 ' : ' ') + (ativo === (pagin?.link || 'Home') ? 'ativo' : '' )} ><Link className={(props?.mobile ? 'p-2 w-full block' : '')} onClick={() => {setAtivo(pagin?.link || 'home'); setTitle(pagin?.nome || 'home'); setAberto(false)}} href={'/?'+pagin.link}>{pagin.nome}</Link></li>);
        }


        return html;
    }

    return (

        <>
            <nav className='bg-cor-principal/90 tablet:hidden  block menu-principal-mobile'>
                <div className="relative">


                    <div className="w-full h-10 flex justify-end m-2 items-center	" >
                        
                        <p className="leading-none mr-2 text-white font-medium">Menu</p>

                        <div onClick={() => setAberto(!aberto) } className={"w-10 h-10 flex flex-col mr-5 justify-around menu-hamburger "+ (aberto ? 'ativo' : '')}>
                            <span className="bg-white w-full h-1 block"></span>
                            <span className="bg-white w-full h-1 block"></span>
                            <span className="bg-white w-full h-1 block"></span>
                        </div>
                    </div>
                
                    <ul className={"flex flex-col w-80 absolute z-50 bg-white boxShadow.xl drop-shadow-md menu-container-links "+ (aberto ? 'mostrar' : '')} >
                        <Links mobile />
                    </ul>
                </div>
            </nav>

            <nav className=' tablet:block hidden menu-principal'>
                <ul>
                    <Links />
                </ul>
            </nav>
            
        </>
    )
  }
  
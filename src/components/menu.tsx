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

    useEffect(() => {

	 	document.title = 'Clarice - Home';

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

    const Links = () =>{

        let html = [];
        for(let pag in data.paginas){
            let pagin = data.paginas[pag];
            html.push(<li key={'menu_'+pag} className={ "hover:text-white transition-colors py-3  " + (ativo === (pagin?.link || 'home') ? 'ativo' : '' )} ><Link className="p-2 w-full block" onClick={() => {setAtivo(pagin?.link || 'home'); setAberto(false)}} href={'/?'+pagin.link}>{pagin.nome}</Link></li>);
        }

        return html;
    }

    return (

        <>
            <nav className='bg-cor-principal tablet:hidden  block'>
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
                        <Links />
                    </ul>
                </div>
            </nav>

            <nav className='bg-cor-principal tablet:block hidden'>
                <ul className="tablet:flex-row tablet:flex  inline-block  tablet:my-0 my-3 " style={{height: '72px', alignItems: 'center', justifyContent: 'space-around'}}>
                    <Links />
                </ul>
            </nav>
        </>
    )
  }
  
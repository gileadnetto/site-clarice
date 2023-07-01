'use client'

import Link from "next/link";
import 'tailwindcss/tailwind.css';
import { useState, useEffect } from "react";

interface ProdProps{
    params?:{
      index?:string
    }
  } 

let slug = (url:string) => new URL(url).pathname.match(/[^\/]+/g)

export default function Menu(props:ProdProps) {

    const [ativo, setAtivo] = useState<any>(null);
    const [aberto, setAberto] = useState(false);
    const [title, setTitle] = useState('home');
    const [dados, setDados] = useState<any>([]);

    useEffect(() => {

        document.title = 'XWPGRT';

        //irei pegar o o parametro url para definir qual menu esta ativo
       let pagina = slug(window.location.href);
       if(pagina?.length){
        setAtivo(pagina[0])
       }
        async function fetchData() {
            const protocol = window.location.protocol;
            const host = window.location.host;
            const url = protocol + '//' + host + '/api';
            let response = await fetch(url);
            let res = await response.json();
            res = JSON.parse(res);
            setDados(res);
        }
    
        fetchData();
      }, []);

    useEffect(() => {
        document.title = 'XWPGRT - '+ title;
   }, [title]);

    const Links = ( propriedades:any ) =>{

        let html = [];
        for(let pag in dados.paginas){
            let pagin = dados.paginas[pag];
            html.push(<li key={'menu_'+pag} className={ (propriedades?.mobile ? 'hover:text-cor-principal transition-colors py-3 ' : ' ') + (ativo == (pagin?.link || 'home') ? 'ativo' : '' )} ><Link className={(propriedades?.mobile ? 'p-2 w-full block' : '')} onClick={() => {setAtivo(pagin?.link || 'home'); setTitle(pagin?.nome || 'home'); setAberto(false)}} href={'/'+pagin.link}>{pagin.nome}</Link></li>);
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
  
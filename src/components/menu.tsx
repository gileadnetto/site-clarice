'use client'

import Link from "next/link";
import 'tailwindcss/tailwind.css';
import { useState, useEffect } from "react";
import { Loader2 } from 'lucide-react';


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
            let response = await fetch(url,{
                cache: 'force-cache', 
                next: { revalidate:864000 }
              });
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
            <nav className='bg-cor-principal/90 desktop:hidden  block menu-principal-mobile z-50'>
                <div className="relative">


                    <div className="w-full h-10 flex justify-end m-2 items-center	" >
                        
                        <p className="leading-none mr-2 text-white font-medium">Menu</p>

                        <div onClick={() => setAberto(!aberto) } className={"w-10 h-10 flex flex-col mr-5 justify-around menu-hamburger "+ (aberto ? 'ativo' : '')}>
                            <span className="bg-white w-full h-1 block"></span>
                            <span className="bg-white w-full h-1 block"></span>
                            <span className="bg-white w-full h-1 block"></span>
                        </div>
                    </div>
                
                    <ul className={"flex flex-col w-80 absolute bg-white boxShadow.xl drop-shadow-md menu-container-links "+ (aberto ? 'mostrar' : '')} >
                        {Object.keys(dados).length ?
                            <Links mobile />
                            :
                            <>
                            <div role="status" className="max-w-sm animate-pulse relative">
                                <div className="h-8 bg-gray-200  dark:bg-gray-700 max-w-[360px] mb-1 "></div>
                                <div className="h-8 bg-gray-200  dark:bg-gray-700 max-w-[360px] mb-1"></div>
                                <div className="h-8 bg-gray-200  dark:bg-gray-700 max-w-[360px] mb-1"></div>
                                <div className="h-8 bg-gray-200  dark:bg-gray-700 max-w-[360px] mb-1"></div>
                                <div className="h-8 bg-gray-200  dark:bg-gray-700 max-w-[360px] mb-1"></div>
                                <span className="sr-only">Loading...</span>
                                <Loader2 color="#0b1d78" style={{top:'43%', left:'43%'}} className="animate-spin  inline absolute" />
                            </div>
                            </>
                        }
                    </ul>
                </div>
            </nav>

            <nav className=' desktop:block hidden menu-principal'>
                <ul>
                    {Object.keys(dados).length > 0 ?
                        <Links />
                        :     
                        <li role="status" className=" animate-pulse relative gap-4" style={{ display: "flex !important", width:"100%", justifyContent:"center"}}>
                            <div className="h-14 bg-gray-200  dark:bg-gray-700 max-w-[90px] mb-1" style={{ width: "100%",margin:"0px 4px", borderBottomLeftRadius:"6px",  borderBottomRightRadius:"6px"}}></div>
                            <div className="h-14 bg-gray-200  dark:bg-gray-700 max-w-[110px] mb-1" style={{ width: "100%",margin:"0px 4px", borderBottomLeftRadius:"6px",  borderBottomRightRadius:"6px"}}></div>
                            <div className="h-14 bg-gray-200  dark:bg-gray-700 max-w-[130px] mb-1" style={{ width: "100%",margin:"0px 4px", borderBottomLeftRadius:"6px",  borderBottomRightRadius:"6px"}}></div>
                            <div className="h-14 bg-gray-200  dark:bg-gray-700 max-w-[90px] mb-1" style={{ width: "100%",margin:"0px 4px", borderBottomLeftRadius:"6px",  borderBottomRightRadius:"6px"}}></div>
                            <div className="h-14 bg-gray-200  dark:bg-gray-700 max-w-[160px] mb-1"style={{ width: "100%",margin:"0px 4px", borderBottomLeftRadius:"6px",  borderBottomRightRadius:"6px"}}></div>
                            <div className="h-14 bg-gray-200  dark:bg-gray-700 max-w-[120px] mb-1" style={{ width: "100%",margin:"0px 4px", borderBottomLeftRadius:"6px",  borderBottomRightRadius:"6px"}}></div>
                            <div className="h-14 bg-gray-200  dark:bg-gray-700 max-w-[150px] mb-1" style={{ width: "100%",margin:"0px 4px", borderBottomLeftRadius:"6px",  borderBottomRightRadius:"6px"}}></div>
                            <Loader2 color="#0b1d78" style={{top:'29%', left:'50%'}} className="animate-spin  inline absolute" />
                        </li>
                    }

                </ul>
            </nav>
            
        </>
    )
  }
  
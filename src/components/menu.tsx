'use client'

import Link from "next/link";
import 'tailwindcss/tailwind.css';
import { useState } from "react";
// import { useState } from 'react';

export default function Menu() {

    const [ativo, setAtivo] = useState('HOME');

    const [aberto, setAberto] = useState(false);
   

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
                        <li className={ "hover:text-white transition-colors py-3  " + (ativo == 'HOME' ? 'ativo' : '' )} ><Link className="p-2 w-full block" onClick={() => {setAtivo('HOME'); setAberto(false)}} href='/'>HOME</Link></li>
                        <li className={ "hover:text-white transition-colors py-3  " + (ativo == 'participantes' ? 'ativo' : '' )}><Link className="p-2 w-full block" onClick={() => {setAtivo('participantes'); setAberto(false)}} href='/participantes'>PARTICIPANTS</Link></li>
                        <li className={ "hover:text-white transition-colors py-3  " + (ativo == 'programas' ? 'ativo' : '' )} ><Link className="p-2 w-full block" onClick={() => {setAtivo('programas'); setAberto(false)}} href='/programas'>PROGRAM</Link></li>
                        <li className={ "hover:text-white transition-colors py-3  " + (ativo == 'registro' ? 'ativo' : '' )}><Link className="p-2 w-full block" onClick={() => {setAtivo('registro'); setAberto(false)}} href='/registro'>REGISTRATION</Link></li>
                        <li className={ "hover:text-white transition-colors py-3  " + (ativo == 'informacao' ? 'ativo' : '' )}><Link className="p-2 w-full block" onClick={() => {setAtivo('informacao'); setAberto(false)}} href='/informacao'>PRACTICAL INFO</Link></li>
                        <li className={ "hover:text-white transition-colors py-3  " + (ativo == 'preview' ? 'ativo' : '' )}><Link className="p-2 w-full block" onClick={() => {setAtivo('preview'); setAberto(false)}} href='/preview'>PREVIOUS</Link></li>
                        <li className={ "hover:text-white transition-colors py-3  " + (ativo == 'poster' ? 'ativo' : '' )}><Link className="p-2 w-full block" onClick={() => {setAtivo('poster'); setAberto(false)}} href='/poster'>POSTER</Link></li>
                    </ul>
                </div>
            </nav>

            <nav className='bg-cor-principal tablet:block hidden'>
                
                <ul className="tablet:flex-row tablet:flex  inline-block  tablet:my-0 my-3 " style={{height: '72px', alignItems: 'center', justifyContent: 'space-around'}}>
                    <li className={ "hover:text-white transition-colors  " + (ativo == 'HOME' ? 'ativo' : '' )} ><Link className="p-2" onClick={() => setAtivo('HOME')} href='/'>HOME</Link></li>
                    <li className={ "hover:text-white transition-colors  " + (ativo == 'participantes' ? 'ativo' : '' )}><Link className="p-2" onClick={() => setAtivo('participantes')} href='/participantes'>PARTICIPANTS</Link></li>
                    <li className={ "hover:text-white transition-colors  " + (ativo == 'programas' ? 'ativo' : '' )} ><Link className="p-2" onClick={() => setAtivo('programas')} href='/programas'>PROGRAM</Link></li>
                    <li className={ "hover:text-white transition-colors  " + (ativo == 'registro' ? 'ativo' : '' )}><Link className="p-2" onClick={() => setAtivo('registro')} href='/registro'>REGISTRATION</Link></li>
                    <li className={ "hover:text-white transition-colors  " + (ativo == 'informacao' ? 'ativo' : '' )}><Link className="p-2" onClick={() => setAtivo('informacao')} href='/informacao'>PRACTICAL INFO</Link></li>
                    <li className={ "hover:text-white transition-colors  " + (ativo == 'preview' ? 'ativo' : '' )}><Link className="p-2" onClick={() => setAtivo('preview')} href='/preview'>PREVIOUS</Link></li>
                    <li className={ "hover:text-white transition-colors  " + (ativo == 'poster' ? 'ativo' : '' )}><Link className="p-2" onClick={() => setAtivo('poster')} href='/poster'>POSTER</Link></li>
                </ul>
            </nav>
        </>
    )
  }
  
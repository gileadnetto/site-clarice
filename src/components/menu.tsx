'use client'

import Link from "next/link";
import 'tailwindcss/tailwind.css';
import { useState } from "react";
// import { useState } from 'react';

export default function Menu() {

    const [ativo, setAtivo] = useState('HOME');
   

    return (
        <nav className='bg-cor-principal'>
            
            <ul style={{height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                <li className={ "hover:text-white transition-colors  " + (ativo == 'HOME' ? 'ativo' : '' )} ><Link className="p-2" onClick={() => setAtivo('HOME')} href='/'>HOME</Link></li>
                <li className={ "hover:text-white transition-colors  " + (ativo == 'participantes' ? 'ativo' : '' )}><Link className="p-2" onClick={() => setAtivo('participantes')} href='/participantes'>PARTICIPANTS</Link></li>
                <li className={ "hover:text-white transition-colors  " + (ativo == 'programas' ? 'ativo' : '' )} ><Link className="p-2" onClick={() => setAtivo('programas')} href='/programas'>PROGRAM</Link></li>
                <li className={ "hover:text-white transition-colors  " + (ativo == 'registro' ? 'ativo' : '' )}><Link className="p-2" onClick={() => setAtivo('registro')} href='/registro'>REGISTRATION</Link></li>
                <li className={ "hover:text-white transition-colors  " + (ativo == 'informacao' ? 'ativo' : '' )}><Link className="p-2" onClick={() => setAtivo('informacao')} href='/informacao'>PRACTICAL INFO</Link></li>
                <li className={ "hover:text-white transition-colors  " + (ativo == 'preview' ? 'ativo' : '' )}><Link className="p-2" onClick={() => setAtivo('preview')} href='/preview'>PREVIOUS</Link></li>
                <li className={ "hover:text-white transition-colors  " + (ativo == 'poster' ? 'ativo' : '' )}><Link className="p-2" onClick={() => setAtivo('poster')} href='/poster'>POSTER</Link></li>
            </ul>
        </nav>
    )
  }
  
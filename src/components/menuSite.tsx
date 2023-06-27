'use client'

import Link from "next/link";
import 'tailwindcss/tailwind.css';
import { useState } from "react";

export default function MenuSite(props:any) {

    // Função para atualizar a ordem dos itens
  const atualizarOrdem = (index:any, newIndex:any) => {
    const newItens = [...props.dadosJson.paginas]; // Cria uma cópia da lista de itens atual
    const [removedItem] = newItens.splice(index, 1); // Remove o item na posição atual
    newItens.splice(newIndex, 0, removedItem);
    props.dadosJson.paginas = newItens; // Insere o item na nova posição
    props.handleAlterar(props.dadosJson);
    // setItens(newItens); // Atualiza a lista de itens com a nova ordem
  };

  // Função para criar um elemento de item com botões de subir e descer
  const criarElementoItem = (item:any, index:any) => {

    // Função para subir o item na ordem
    const subirItem = () => {
      if (index > 0) {
        atualizarOrdem(index, index - 1); // Chama a função de atualização da ordem
      }
    };

    // Função para descer o item na ordem
    const descerItem = () => {
      if (index < props.dadosJson.paginas.length - 1) {
        atualizarOrdem(index, index + 1); // Chama a função de atualização da ordem
      }
    };

   let estaAtivo = (props.menuAtivo == (item?.link || 'home') ? true : false);

// Retorna o elemento de item com os botões de subir e descer
    return (
        <li key={'ul_pag_'+index} className={ "transition-colors  cursor-pointer inline-block " + (estaAtivo ? 'ativo' : '' )} onClick={() => {props.setMenuAtivo(item?.link || 'home'); props.setMensagemPost('')}}>
            { estaAtivo && <button onClick={subirItem} className="px-1 cursor-pointer text-xl leading-none">&#171;</button>}
                {item.nome}
            { estaAtivo && <button onClick={descerItem} className="px-1 cursor-pointer text-xl leading-none">&#187;</button>}
        </li>
    );
  };

    
  
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
                {props.dadosJson.paginas.map((item:any, index:any) => criarElementoItem(item, index))}
                <li title="Adicionar novo menu" className={ "transition-colors  cursor-pointer inline-block "} onClick={props.handleNovoLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block text-green-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </li>
                {/* {renderMenus()} */}
            </ul>
        </nav>
    )
  }
  
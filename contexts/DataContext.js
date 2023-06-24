// DataContext.js
'use client'
import { createContext, useContext } from 'react';

const DataContext = createContext();

async function load() {

  if(window){
    const protocol = window.location.protocol;
    const host = window.location.host;

    const url = protocol + '//' + host + '/api';

    console.log(url);
    const url2 = 'https://site-clarice.vercel.app/api';
    let response = await fetch(url2);
    let respon = await response.json();
    // setDados(JSON.parse(respon));

    return await JSON.parse(respon)
  }

  return [];
   
  
}

export async function DataProvider({ data, children }) {
  // let dadosjson =  await load();
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
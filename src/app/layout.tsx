import './globals.css'
import { Inter } from 'next/font/google'
import Menu from '../components/menu'
import { promises as fs } from 'fs';
import path from 'path';
import { DataProvider } from '../../contexts/DataContext';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Clarice - Home',
  description: 'Site clarice',
}

export default async function RootLayout({children,}: {children: React.ReactNode}) {

  var data:any = [];
  
  // const jsonDirectory = path.join(process.cwd(), 'data');
  // const fileContents = await fs.readFile(jsonDirectory + '/dados.json', 'utf8');
  // // try{
  // //   let response = await fetch('https://1drv.ms/u/s!Am4OWUJ0EWD7g4UPonUvCeLf3sBchA?e=bOC8h9');
  // //   data = await response.json();
    
  // // }catch(e){
  //   data = await JSON.parse(fileContents);
  //   data = await JSON.parse(JSON.stringify(data));

  // }
 
  

  return (
    <html lang="pt-br">
    <body className="bg-zinc-0 text-cor-texto" style={{minHeight:'100vh'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className='flex flex-col bg-cor-fundo' style={{
              width:'100vw',
              maxWidth:'1000px',
              minHeight: '100vh'
            }}>

              <div className="px-16 py-7 bg-white flex gap-5">
                <div className='flex-1'>
                  <h1 className='text-6xl tracking-widest'><b>GAAG </b><span className='text-cor-principal ml-5 font-thin'>2023</span></h1>
                  <p className='text-3xl mt-5'>Geometry in Algebra</p>
                  <p className='text-3xl text-cor-principal font-medium'>Algebra in Geometry VII</p>
                </div>

                <div className='flex flex-col max-w-xs justify-center text-cor-texto'>
                    
                    <div>23—27 October 2023</div>
                    
                    <div className='mt-3 font-medium'>
                      <p>
                        Universidade Federal de Minas Gerais
                        Belo Horizonte, Brazil
                      </p>
                    </div>
                </div>
                
              </div>

             <Menu />

            <main className='px-10 py-10 font-light flex-1'>
              <DataProvider data={data}>
                {children}
              </DataProvider>
            </main>

            <footer className='h-20 bg-zinc-300 flex items-center justify-center align-bottom'>
              <p>Rodapé by Gilead</p>
              <Link href="/auth/configuracao" className='float-right'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}

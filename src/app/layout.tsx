import './globals.css'
import { Inter } from 'next/font/google'
import Menu from '../components/menu'
import { DataProvider } from '../../contexts/DataContext';
import Link from 'next/link';
import Container from '@/components/container';
import Image from 'next/image';


const inter = Inter({ subsets: ['latin'] })

export const revalidate = 10;

export const metadata = {
    title: 'XWPGRT',
    description: 'The Workshop on Poisson Geometry and related topics is an annual event of the Brazilian Poisson Geometry community. The first edition took place in Rio de Janeiro in 2013, and this year we are celebrating the 10th edition. The main goal of the event is to gather researchers working in Poisson Geometry and related subjects, including: Lie groupoids, Lie algebroids, foliations, quantization, mathematical physics, homotopy structures, geometric mechanics, among others.',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  

    return (
        <html lang="pt-br">
            <body className="bg-zinc-0 text-cor-texto" style={{ minHeight: '100vh' }}>
                <div>
                    <header className="px-16 bg-white pt-32 desktop:pb-24 pb-11 uppercase header-img">
                        <Container>
                            <center className='bg-white/90 px-5 py-4'>
                                <h1 className=' text-cor-principal tracking-widest desktop:text-4xl text-2xl font-medium'>X Workshop on <span className='destacar'>Poisson</span> Geometry <br></br> and Related Topics</h1>
                                <p className='text-gray-600 mt-3'>October 04-06, 2023</p>
                                <p className='text-gray-500 text-xs'>IME-USP, São Paulo </p>
                            </center>
                        </Container>
                    </header>

                    <Container main>
                        <Menu />
                        <main className='px-10 py-10 font-light flex-1'>
                            {children}
                        </main>
                    </Container>

                    <footer className=' pb-4 bg-zinc-300 flex items-center justify-center align-bottom flex-col'>
                        <div className='mt-3 mb-0 text-center flex  items-center gap-6'>
                            {/* <Image src='/imagens/ime-usp.png' alt="ime-usp imp" width={400} height={300} crossOrigin="anonymous" /> */}

                            <a target="_blank" href='https://www.ime.usp.br/'><Image className="hover:-translate-y-2 transition duration-200 " src='/imagens/ime-logo.png' alt="inctmat logo" width={130} height={40} crossOrigin="anonymous" /></a>
                            <a target="_blank" href='https://www5.usp.br/'><Image className="hover:-translate-y-2 transition duration-200 " src='/imagens/usp-lg.png' alt="inctmat logo" width={120} height={15} crossOrigin="anonymous" /></a>
                            <a target="_blank" href='https://inctmat.impa.br/'><Image className="hover:-translate-y-2 transition duration-200 " src='/imagens/inctmat.png' alt="inctmat logo" width={130} height={40} crossOrigin="anonymous" /></a>
                        </div>
                        <div className='mt-0 mb-3'>
                            <p className='text-xs'>Contact : <b className='text-cor-principal'><a href="mailto:workshoppoissongeometry@gmail.com" target='_blank'>workshoppoissongeometry@gmail.com</a></b></p>
                        </div>

                        <div className='flex justify-center items-center text-xs'>
                            <p className='inline-block mx-2 text-cor-principal'><small>Created by Gilead Netto</small></p>
                            <Link href="/auth/configuracao" className='float-right'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </Link>
                        </div>
                    </footer>
                </div>
                
            </body>
        </html>
    )
}

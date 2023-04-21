import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Zoro Store</title>
        <meta name="description" content="Your stop for Anime wear" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='min-h-screen mt-5'>
      <h1 className="mb-4 text-center text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">ZORO STORE</span> BUY YOUR FAV MERCH.</h1>

       <div className='w-full overflow-hidden '> <Link href="/shirts"><img src='/zoromainpage.png' className='m-auto md:w-3/4 w-full cursor-pointer hover:scale-105 hover:bg-slate-50 transform transition duration-500' /></Link></div>
       {/* <Link href="/shirts"><button  className="block m-auto w-1/4 rounded-lg bg-rose-500 p-2 text-sm font-medium text-white" >Start Shopping Now!</button></Link> */}
       <Link href="/shirts">
       <div href="/shirts" className="relative m-auto px-6 py-3 w-56 font-bold text-center text-black group">
    <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-rose-400 group-hover:translate-x-0 group-hover:translate-y-0"></span>
    <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
    <span className="relative text-center">Shop Now!</span>
    </div>
    </Link>
       <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap">
    <div className="lg:w-2/3 mx-auto">
    <Link href="/shirts">
      <div className="flex cursor-pointer flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4 overflow-hidden">
        <img alt="gallery" className="w-full object-cover h-full object-center block opacity-50 absolute inset-0 hover:scale-110 hover:opacity-75  transform transition duration-500" src="https://cdn.shopify.com/s/files/1/0578/0229/3419/products/18_e6317dd2-10ee-4876-9ddf-b2df336ea7f8_1800x1800.jpg?v=1664427817"/>
        <div className="text-center relative z-10 w-full min-h-full">
        <div className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
    <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
    <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">BUY SHIRTS</span>
</div>
          <p className="leading-relaxed text-black font-extrabold">Naruto, Zoro, Levi and more...</p>
          
        </div>
      </div>
      </Link>
      
      <div className="flex flex-wrap -mx-2">
        
      <Link href="/hoodies" className='w-1/2'>

        <div className="px-2 cursor-pointer ">
          <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative overflow-hidden">
            <img alt="gallery" className="w-full object-cover h-full object-center block opacity-50 absolute inset-0 hover:scale-110 hover:opacity-75  transform transition duration-500" src="https://comicsense.b-cdn.net/wp-content/uploads/2021/10/giyu_bomber_jacket_comicsense.jpg"/>
            <div className="text-center relative z-10 w-full">
            <div className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
    <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
    <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">BUY HOODIES</span>
</div>
              {/* <h2 className="text-xl text-gray-900 font-medium title-font mb-2">Buy Hoodies</h2> */}
              <p className="leading-relaxed text-black font-extrabold">Naruto, Demon Slayer and more...</p>
             
            </div>
          </div>
        </div>
        </Link>

      <Link href="/notApparels" className='w-1/2'>
       
        <div className="px-2 cursor-pointer">
          <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative overflow-hidden">
            <img alt="gallery" className="w-full object-cover h-full object-center block opacity-50 absolute inset-0 hover:scale-110 hover:opacity-75  transform transition duration-500" src="https://comicsense.b-cdn.net/wp-content/uploads/2022/11/itachi-closeup_comicsense.jpg"/>
            <div className="text-center relative z-10 w-full">
            <div className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
    <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
    <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">BUY NON APPARELS</span>
</div>
              {/* <h2 className="text-xl text-gray-900 font-medium title-font mb-2">Buy NON APPARELS</h2> */}
              <p className="leading-relaxed text-black font-extrabold">Figurines, stickers, accessories and more...</p>
              
            </div>
          </div>
        </div>
        </Link>
      </div>
    </div>
  </div>
</section>
      </div>
     
    </>
  )
}

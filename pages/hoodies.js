import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import mongoose, { connect } from "mongoose";
import {BsCircleFill} from 'react-icons/bs'
import { useRouter } from 'next/router';

const Hoodies = (props) => {
  const products = props.products;
  const router = useRouter();
  const[filterMode,setFilterMode] = useState(false);
 
  let filter = {
    size:[],
    brand:[],
    // price: {$gte: 0 , $lte: 999999}
  }

  // {category:{"$in":["Hoodies","T-shirt"]}}
  const[allBrands,setAllBrands] = useState([]);

  const checkBoxMethod = (arr,elem,e)=>{
    const index = arr.indexOf(elem);
    if (index > -1) { // only splice array when item is found
      arr.splice(index, 1); // 2nd parameter means remove one item only
    }else{
      arr.push(elem)
    }
  }

  // const applyFilter = async()=>{
  //   let param = "";
  //   filterState.size.forEach((s)=>{
  //       param+="size="+s+"&";
  //   })
  //   filterS.brand.forEach((b)=>{
  //   param+="brand="+b+"&";
  //   })
  //   router.push(`?${param}`);
  // }
  // const fetchBrands = async ()=>{
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getAvailableBrands`,{
  //     method: "POST",
  //     body: JSON.stringify({
  //         category:"Hoodies"
  //     }),
  //     headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //     }
  // })
  // const rjson = await response.json();
  // setAllBrands(rjson.brands);
  // }
  useEffect(() => {
//    fetchBrands();
//    if(router.query.size){
//     if(Array.isArray(router.query.size)){
//       router.query.size.forEach((e)=>{
//         if(process.browser && document.getElementById('size-'+e)){
//           console.log(document.getElementById('size-'+e));
//           document.getElementById('size-'+e).checked=true;
//         }
//         filter.size.push(e);
//       })
//     }else{
//       filter.size.push(router.query.size)
//     }
//  }
//  if(router.query.brand){
//   if(Array.isArray(router.query.brand)){
//     router.query.brand.forEach((e)=>{
//       filter.brand.push(e);
//     })
//   }else{
//     filter.brand.push(router.query.brand)
//   }
// }
// console.log(filter);

  }, [router.query])
  

  return (
    <>
    <div className="flex flex-col min-h-screen m-auto w-4/5">
      <div className="relative flex flex-wrap mx-auto justify-center">
        {
          products && products.length!=0 && products.map((product)=>{
            return (
              <Link href={"/product/"+product.slug} key={product.slug}>
              <div className="relative max-w-[264px] min-w-[180px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
                  <div className="overflow-x-hidden rounded-2xl">
          
                    <div className="object-contain flex justify-center bottom-0 h-96 md:h-80">
                    <img
                        className="rounded-2xl h-96 md:h-80 max-w-none "
                        src={product.img}
                        />
                    </div>
                    
                    
                    <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 group-hover:opacity-50 opacity-70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </p>
                  </div>
                  <div className="mt-4 pl-2 mb-2 flex justify-between ">
                    <div>
                      <p className="text-lg font-semibold text-gray-900 mb-0">
                        {product.title}
                      </p>
                      <p className="text-md text-gray-800 mt-0">₹{product.price}</p>
                      {/* <p className="text-sm text-gray-800 mt-0">S, M, L, XL, XXL</p> */}
                      <div className="flex flex-row space-x-1">
                        {
                          product.color.map((c)=>{
                            return <BsCircleFill color={c} key={c}/>
                          })
                        }
                      </div>
                    </div>
                    <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 group-hover:opacity-70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="gray"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        }

      </div>
    </div>

    <div className='absolute top-24 left-7 hidden'>
      <div onClick={()=>{setFilterMode(!filterMode)}} className='border border-rose-500 w-52 text-center bg-slate-50 font-semibold shadow hover:shadow-black'>
        FILTER 
      </div>
      {
        filterMode && <div className='border-2 rounded-lg border-rose-500 p-3 mt-3 bg-slate-50 max-h-[580px] overflow-y-auto'>
          <div className='SIZE'>
          <div className='font-semibold text-lg'>Size:</div>
          <div className='ml-3 mt-1'>
          <div className="flex items-center mb-2 ">
              <input id="size-S" onChange={()=>{checkBoxMethod(filter.size,"S")}} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label htmlFor="size-S" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">S</label>
          </div>
          <div className="flex items-center mb-2">
              <input id="size-M" type="checkbox" onChange={()=>{checkBoxMethod(filter.size,"M")}} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label htmlFor="size-M" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">M</label>
          </div>
          <div className="flex items-center mb-2">
              <input id="size-L" type="checkbox" onChange={()=>{checkBoxMethod(filter.size,"L")}} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label htmlFor="size-L" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">L</label>
          </div>
          <div className="flex items-center mb-2">
              <input id="size-XL" type="checkbox" onChange={()=>{checkBoxMethod(filter.size,"XL")}} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label htmlFor="size-XL" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">XL</label>
          </div>
          <div className="flex items-center mb-2">
              <input id="size-XXL" type="checkbox" onChange={()=>{checkBoxMethod(filter.size,"XXL")}} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label htmlFor="size-XXL" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">XXL</label>
          </div>
          <div className="flex items-center mb-2">
              <input id="size-XXXL" type="checkbox" onChange={()=>{checkBoxMethod(filter.size,"XXXL")}} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label htmlFor="size-XXXL" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">XXXL</label>
          </div>

          </div>

          </div>

          <div className='BRAND'>
          <div className='font-semibold text-lg'>Brand:</div>
          <div className='ml-3 mt-1'>
            {
              allBrands.map((brand)=>{
                return <div className="flex items-center mb-2" key={brand}>
                <input id={brand} type="checkbox" onChange={()=>{checkBoxMethod(filter.brand,brand)}} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor={brand} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{brand}</label>
            </div>
              })
              
            }
          </div>

          </div>

          <div className='PRICE'>
          <div className='font-semibold text-lg'>PRICE:</div>
          <div className='ml-3 mt-1 space-x-2'>
          <input id="min" type="text" placeholder='MIN' className="w-14 border p-1 border-black  bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <input id="max" type="text"  placeholder='MAX' className="w-14 border p-1 border-black bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          </div>
          </div>

          <button
                type="button"
                onClick={applyFilter}
                className=" text-white mt-4 bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply
              </button>
        </div>

      }
    </div>

    </>
  )
}
export async function getServerSideProps(context){
    context.query["category"]="Hoodies";
    const param = new URLSearchParams(context.query).toString();
    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getProducts?`+param);
    if(response.status!=200)return{props:{}};
    let products = await response.json();
    return {
      props: { products }, // will be passed to the page component as props
    };
}

export default Hoodies;
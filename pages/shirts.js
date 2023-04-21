import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {BsCircleFill} from 'react-icons/bs'
const Shirts = (props) => {
  const [filter,setFilter] = useState({}); //add filter component later, it will only change the parameters of the page
  const products = props.products;

  //for non getStatic props
  // const [products,setProducts] = useState([]);
  // const fetchProducts = async ()=>{
  //   const param = new URLSearchParams(filter).toString();
  //   let response = await fetch("http://localhost:3000/api/getProducts?"+param);
  //   let rjson = await response.json();
  //   setProducts(rjson)
  // }
  
  return (
    <>
    <div className="flex min-h-screen flex-col m-auto w-4/5">
      <div className="relative flex flex-wrap mx-auto justify-center">

{products && 
  products.map((product)=>{
    return       <Link href={"/product/"+product.slug} key={product.slug} >
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
                  return <BsCircleFill key={c} color={c}/>
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
  })
}
      </div>
    </div>

    </>

  );
};
export async function getServerSideProps(context){
    context.query["category"]="T-shirt";
    const param = new URLSearchParams(context.query).toString();
    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getProducts?`+param);
    if(response.status!=200)return{props:{}};
    let products = await response.json();
    return {
      props: { products }, // will be passed to the page component as props
    };
}
export default Shirts;

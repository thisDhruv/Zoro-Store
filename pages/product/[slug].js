import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsFillCartPlusFill,BsCircleFill } from 'react-icons/bs'
import mongoose, { connect } from "mongoose";
import Product from "@/models/Product"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Error from 'next/error';

const Post = (props) => {
  const router = useRouter()
  const { slug } = router.query
  const [product,setProducts] = useState(props.product);
  const [variants,setVariants] = useState(props.variants);
  const [service,setService] = useState(null);
  const [pin,setPin] = useState(null);

 

  const checkServiceability= async ()=>{
    let pincodes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pincodes.json();
    if(pinJson.includes(parseInt(pin))){
      setService(true);
    }else{
      setService(false);
    }
  }
  const colorMapping = {black:"black"};
  const pinchange = (e)=>{
    setPin(e.target.value);
  }

  const showToast= (msg)=>{
    toast.success(msg, {
      position: "top-center",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }


  useEffect(() => {
    setProducts(props.product);
    setVariants(props.variants);
    console.log(props.product);
  }, [router.query])
  


  const refreshVariant=(color,size)=>{
    // const url = window.location.origin+"/product/"+variants[color][size]["slug"];
    router.push(variants[color][size]["slug"]);
  }

  if(!props.found){
    return <Error statusCode={404} />
  }

  return(
    <section className="text-gray-600 min-h-screen  body-font overflow-hidden">
       <ToastContainer
        position="top-center"
        autoClose={1300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
  <div className="container px-5 py-24 mx-auto">
    <div className="md:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="md:w-1/2 w-full md:h-auto h-64 object-contain object-top md:p-4 p-10 rounded" src={product.img}/>
      <div className="md:w-1/2 w-full md:pl-10 lg:py-6 mt-6 md:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
        {product.category!=="NotApparels" && <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({(product.color).charAt(0).toUpperCase() + (product.color).slice(1)} / {product.size})</h1>}
        {product.category==="NotApparels" && <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>}
        
        {/* <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-rose-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-rose-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-rose-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-rose-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-rose-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div> */}
        <p className="leading-relaxed mb-4">{product.desc}</p>
        {product.category!=="NotApparels" && 
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex space-x-1">
            <span className="mr-3 my-auto">Color</span>
            {product.category!=="NotApparels" &&
              Object.keys(variants).map((k)=>{
                // if(variants[k][product.size]==undefined)return <></>
                // let borderAndSize = k==product.color?"":"border-2"
                // let bgColor = "bg-"+(k=='black'?k:(k+'-500'));
                // return <div className="flex flex-col relative">{k==product.color && <span className='absolute -top-5 right-1/4'>↓</span>}<button onClick={()=>{refreshVariant(k,Object.keys(variants[k])[0])}} className={`${borderAndSize} ${bgColor} rounded-full m-auto  w-6 h-6 focus:outline-none`}></button></div>
                return <div className="flex flex-col relative">{k==product.color && <span className='absolute -top-5 right-[1.6px] mx-auto'>↓</span>}<BsCircleFill onClick={()=>{refreshVariant(k,Object.keys(variants[k])[0])}} className={"cursor-pointer"} color={k}/></div>
              
              })
            }

          </div>

           <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <select value={product.size} onChange={(e)=>{refreshVariant(product.color,e.target.value)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10">
                {
                  Object.keys(variants[product.color]).map((k)=>{
                    return <option onClick={()=>{refreshVariant(product.color,k)}}>{k}</option>
                  })
                }
              </select>
            </div>
          </div>
        </div>}
        
        <div className="flex mt-7">
          <span className="title-font font-medium text-2xl text-gray-900 my-auto">{product.qty>0?"₹"+product.price:"Out of Stock!"}</span>
          { product.qty>0 && <><button onClick={()=>{props.buyNow(slug,product.title,1,product.price,product.color,product.size,product.img)}} className="flex ml-4 text-left text-white bg-rose-500 border-0 py-2 px-4 focus:outline-none hover:bg-rose-600 rounded">Buy Now</button>
          <BsFillCartPlusFill size={40} onClick={()=>{props.addToCart(slug,product.title,1,product.price,product.color,product.size,product.img); showToast("Added to Cart");}} className="ml-4 cursor-pointer rounded-lg p-1 border border-rose-400 text-red-600 hover:text-red-700" />
                </>
          }
          </div>
        <div className='flex flex-row w-min mt-7 border border-rose-500 '>
          <input type="text" placeholder='PINCODE' className='w-[130px] focus:outline-none p-2' value={pin} onChange={pinchange}/>
          <button onClick={checkServiceability} className="flex ml-4 text-left rounded-full text-blue border-0 py-2 px-6 hover:text-black">Check</button>
        </div>
        {service!=null && service && <h2 className='text-green-500'>Yay! Serviciable</h2>
        }
        {
          service!=null && !service && <h2 className='text-red-500'>No! not Serviciable</h2>
        }

       
      </div>
    </div>
  </div>
</section>
  )
}

export async function getServerSideProps(context){
  //connect DB if not already
  if(!mongoose.connections[0].readyState)mongoose.connect(process.env.MONGO_URI);

  let product = await Product.findOne({slug:context.query.slug});
  if(product==null){
    return {
      props:{found:false,product:null}
    }
  }
  let variants = await Product.find({title:product.title});
  // variants : {color: {size: slug } }

  let colorSizeSlug = {};
  variants.forEach((p)=>{
    if(colorSizeSlug[p.color]==undefined){
      colorSizeSlug[p.color]={};
    }
      colorSizeSlug[p.color][p.size]={slug:p.slug};
  })
  return {
    props: { found:true,product:JSON.parse(JSON.stringify(product)), variants:JSON.parse(JSON.stringify(colorSizeSlug))},
  };
}

export default Post
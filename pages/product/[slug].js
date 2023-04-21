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
                return <div className="flex flex-col relative" key={k}>{k==product.color && <span className='absolute -top-5 right-[1.6px] mx-auto'>↓</span>}<BsCircleFill onClick={()=>{refreshVariant(k,Object.keys(variants[k])[0])}} className={"cursor-pointer"} color={k}/></div>
              
              })
            }

          </div>

           <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <select value={product.size} onChange={(e)=>{refreshVariant(product.color,e.target.value)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10">
                {
                  Object.keys(variants[product.color]).map((k)=>{
                    return <option key={k} onClick={()=>{refreshVariant(product.color,k)}}>{k}</option>
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
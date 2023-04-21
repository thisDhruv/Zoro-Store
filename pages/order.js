import Order from '@/models/Order';
import mongoose from 'mongoose';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React from 'react'

const OrderPage = (props) => {
  if(props.order==null){
    return <Error statusCode={404} />
  }
    const cart = props.order.products;
    const subtotal = props.order.amount;
  return (
    <div className='container md:w-2/3 w-full p-2 m-auto md:p-14'>
        <h1 className='mb-4 text-3xl font-extrabold leading-none tracking-tight text-green-500 md:text-5xl lg:text-6xl dark:text-white'>Your Order Has Been Placed!</h1>
        <div className='text-2xl font-bold'>Order Id: <span className='font-normal'>{props.order.orderId}</span></div>
        <div className='text-xl font-semibold'>Payment Status: {props.order.status}</div>

        <div className='md:w-2/3  m-auto mt-6'>
            <div className='w-full flex fle-col'>
                <div className='w-2/5 font-bold'>Item</div>
                <div className='w-1/5 text-right font-bold'>Quantity</div>
                <div className='w-2/5 text-right font-bold'>Price</div>
            </div>
            <hr className='border-2 mb-1 bg-black'/>
            {
                Object.keys(cart).map((key)=>{
                    return <div key={key}><div className='w-full flex fle-col'>
                      <div className='w-9 h-full mx-1'><img src={cart[key].img} alt="productImage" /></div>
                    <div className='w-2/5 overflow-ellipsis overflow-hidden'>{cart[key].name}</div>
                    <div className='w-1/5 text-right'>{cart[key].qty}</div>
                    <div className='w-2/5 text-right'><span className='font-semibold'>₹{cart[key].unitTotal}</span> <span className='text-xs'>({cart[key].price} x {cart[key].qty})</span></div>
                </div>
                <hr className='border-1 mb-1 bg-black'/>
                </div>
                })
            }
              <h1 className="text-right mt-4 text-xl font-semibold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white">
                Sub Total: ₹{subtotal}
              </h1>
              <button
                type="button"
                className="right-0 mt-1 text-white  bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                
                Track Order
              </button>

           
        </div>


    </div>
  )
}

export async function getServerSideProps(context){
  //connect DB if not already
  if(!mongoose.connections[0].readyState)mongoose.connect(process.env.MONGO_URI);
  console.log(context.query.oid);
  let order = await Order.findOne({orderId:context.query.oid});


  return {
    props: { order:JSON.parse(JSON.stringify(order))},
  };
}

export default OrderPage
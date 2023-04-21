//LISTS ALL THE ORDERS OF A USER
import React, { useEffect, useState } from 'react'
var options = { year: 'numeric', month: 'long', day: 'numeric' };

const Orders = () => {
    const[orders,setOrders] = useState(null);

    const getOrders = async ()=>{
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getAllOrders`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": localStorage.getItem('token')
            }
        })
        const o = await response.json();
        o.reverse();
        setOrders(o);
    }

    useEffect(() => {

      if(localStorage.getItem('token')){
        getOrders();
      }
    }, [])
    
  return (
    <div className='container md:w-3/4 w-full p-2 m-auto md:p-14'>

    <h2 className="text-4xl font-extrabold dark:text-white text-center">Your Orders</h2>

        {

            orders && orders.map((order)=>{
                let cart = order.products;
                return <div key={order.orderId}><div className='hover:bg-slate-100 p-4 mb-7 rounded-2xl'>
                <div className='text-xl m-auto font-bold'>Order Id: <span className='font-normal'>{order.orderId}</span></div>
        <div className='text-lg m-auto '>Payment Status: {order.status}</div>
        <div className='text-lg m-auto '>Ordered On: {new Date(order.createdAt).toLocaleDateString("en-IN", options)}</div>

        <div className='md:w-2/3  m-auto mt-6'>
            <div className='w-full flex fle-col'>
                <div className='w-2/5 font-bold'>Item</div>
                <div className='w-1/5 text-right font-bold md:block hidden'>Quantity</div>
                <div className='w-2/5 text-right font-bold'>Price</div>
            </div>
            <hr className='border-2 mb-1 bg-black'/>
            {
                Object.keys(cart).map((key)=>{
                    return <div key={key}><div className='w-full flex fle-col'>
                      <div className='w-9 h-full mx-1'><img src={cart[key].img} alt="productImage" /></div>
                    <div className='w-2/5 overflow-ellipsis overflow-hidden'>{cart[key].name}</div>
                    <div className='w-1/5 text-right md:block hidden'>{cart[key].qty}</div>
                    <div className='w-2/5 text-right'><span className='font-semibold'>₹{cart[key].unitTotal}</span> <span className='text-xs'>({cart[key].price} x {cart[key].qty})</span></div>
                </div>
                <hr className='border-1 mb-1 bg-black'/>
                </div>
                })
            }
            <div className='flex flex-row justify-between'>
            <button
                type="button"
                className="right-0 mt-1 text-white  bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                
                Track Order
              </button>
            <h1 className="text-right mt-4 text-xl font-semibold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white">
                Sub Total: ₹{order.amount}
              </h1>
              
            </div>
              

           
        </div>
        </div>
        <hr/>
        </div>
            })
        }
        {
            (orders==null || orders.length==0) && <div className='m-auto mt-5'> 
                <h2 className="text-2xl font-extrabold dark:text-white">No Orders to Display</h2>
            </div>
        }

    </div>
  )
}


export default Orders
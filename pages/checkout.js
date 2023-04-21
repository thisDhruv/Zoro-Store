import React, { useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const Checkout = (props) => {
  const cart = props.cart;
  const subtotal = props.subtotal;
  const addToCart = props.addToCart;
  const removeFromCart = props.removeFromCart;

  const[email,setEmail]=useState('');
  const[phone,setPhone]=useState('');
  const[name,setName]=useState('');
  const[address,setAddress]=useState('');
  const[city,setCity]=useState('');
  const[pincode,setPincode]=useState('');
  const[state,setState]=useState('');
  const[addresses,setAddresses] = useState([]);

  const handleChange = (e)=>{
    if(e.target.name=='email')setEmail(e.target.value);
    if(e.target.name=='phone')setPhone(e.target.value);
    if(e.target.name=='name')setName(e.target.value);
    if(e.target.name=='address')setAddress(e.target.value);
    if(e.target.name=='city')setCity(e.target.value);
    if(e.target.name=='pincode')setPincode(e.target.value);
    if(e.target.name=='state')setState(e.target.value);
  }

  const setAllDetails = (id)=>{
    if(id==-1){
      setPhone("");
    setName("");
    setAddress("");
    setCity("");
    setPincode("");
    setState("");
      return;
    }
    let currAd = addresses[id];
      setPhone(currAd.phone);
      setName(currAd.name);
      setAddress(currAd.address);
      setCity(currAd.city);
      setPincode(currAd.pincode);
      setState(currAd.state);
  }


  const getUserData= async ()=>{
    if(!localStorage.getItem('token'))return;
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUserDetails`,{
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": localStorage.getItem('token')
        }
    })
    const userData = await response.json();
    setEmail(userData.email);
    if(userData.addresses)setAddresses(userData.addresses);
}
useEffect(() => {
  
     getUserData();
  
}, [])



  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const checkoutHandler = async (e) => {
    e.preventDefault();
    if(Object.keys(cart).length==0){
      toast.error("The Cart Is Empty", {
        position: "top-center",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    if(res){
    const key = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      body: JSON.stringify({
        subtotal,
        cart:cart,
        email,
        phone,
        name:name,
        address,
        city,
        state,
        pincode
      }),

      headers: {
        "Content-type": "application/json",
         "Authorization":"Basic "+btoa(key+":"+process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET),
          "Cache-Control": "no-cache",
          Host: "api.razorpay.com"
      }
      })
      const rjson = await response.json();

      if(!rjson.success){
        props.clearCart();
        toast.error(rjson.message, {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }
      const order = rjson.order;
    const options = {
        key,
        amount: Number(order.amount),
        currency: "INR",
        name: "Zoro store products",
        description: "Checkout",
        image: "/logopng.png",
        order_id: order.id,
        callback_url: "http://localhost:3000/api/posttransaction",
        prefill: {
            name: "User Name",
            email: "email@example.com",
            contact: "9999999999"
        },
        notes: {
            "address": "ZoroStore PVT LTD"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
    }
}



  return (
    <>
      <h1 className="text-3xl text-center my-5 font-semibold">CHECKOUT</h1>

      <form>
        <div className="container w-4/5  m-auto mt-5 flex md:flex-row flex-col mb-10">
          <div id="DeliveryDetails" className="md:w-3/5 w-full">
            <div className="mb-3 text-xl font-bold">1. Delivery Details</div>
            { addresses.length>0 && <div className=" md:text-base text-xs mb-4">
              <div className="p-1"> Deliver to :-</div>
             <div className="flex flex-row space-x-2 overflow-auto">
             {
              addresses.map((address)=>{
                return  <div key={address.id} onClick={()=>{setAllDetails(address.id)}} className="font-semibold rounded-lg  text-center border p-1 md:px-2 hover:bg-slate-200 cursor-pointer border-neutral-900 ">
                 {address.name}
              </div>
              })
             }
            <div onClick={()=>{setAllDetails(-1)}} className="underline rounded-full text-center border p-1 px-2 hover:bg-slate-200 cursor-pointer border-neutral-900 ">
              Add New
            </div>
             </div>
             

            </div>
            }
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                name="email"
                disabled={props.user}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>


            <div className="flex flex-row ">
              <div className="mb-6 mr-6 flex-1">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  name="name"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                value={phone}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <textarea
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={handleChange}
                rows="4"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              ></textarea>
            </div>

            <div className="flex flex-row ">
              <div className="mb-6 mr-6 flex-1">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6 mr-6 flex-1">
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  name="state"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6 flex-1">
                <label
                  htmlFor="pincode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  PIN Code
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  id="pincode"
                  name="pincode"
                  value={pincode}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="ml-2 relative h-auto border-rose-300 border-2 border-dashed md:w-2/5 w-full">
          <div className="m-2 text-xl font-bold">2. Review Cart Items & Pay </div>
            <div className=" text-center m-auto mt-10 space-y-1 overflow-auto">
              {Object.keys(cart).map((key) => {
                return (
                  <div key={key}>
                  <div className="tableRow flex md:mx-3 flex-row rounded-xl p-1"  >
                            <div className='w-9 h-full mx-1'><img src={cart[key].img} alt="productImage" /></div>
                        <div className="pname w-1/2 font-bold overflow-ellipsis overflow-x-clip text-xs m-auto">{cart[key].name} ({cart[key].color} / {cart[key].size})</div>
                        <div className="quantity flex flex-row font-bold my-auto">
                            <AiFillMinusCircle onClick={()=>{removeFromCart(key,cart[key].name,1,cart[key].price,cart[key].color,cart[key].size)}} className='md:text-2xl text-xl my-auto cursor-pointer md:mx-1'/>
                                 <span className='w-6 text-center overflow-auto '>{cart[key].qty}</span>  
                            <AiFillPlusCircle onClick={()=>{addToCart(key,cart[key].name,1,cart[key].price,cart[key].color,cart[key].size)}} className='md:text-2xl text-xl my-auto cursor-pointer md:mx-1'/>
                        </div>
                        <div className="price font-bold text-center overflow-x-auto text-xs m-auto">₹{cart[key].price}</div>
                        
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    </div>

                );
              })}
            </div>

            <div className="md:absolute w-full text-center md:bottom-0 pb-3 space-y-2">
              <hr />

              <button
                type="submit"
                onClick={checkoutHandler}
                className="right-0 text-white  bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
                Pay Now
              </button>
              <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
                Sub Total: ₹{subtotal}
              </h1>
            </div>
          </div>
        </div>
      </form>
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
    </>
  );
};

export default Checkout;

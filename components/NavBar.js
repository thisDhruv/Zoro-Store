import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { GiHamburgerMenu} from 'react-icons/gi';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle} from 'react-icons/ai';
import {HiUserCircle} from 'react-icons/hi';
import Link from 'next/link';

const NavBar = (props) => {
    const refNav = useRef();
    const refSideCart = useRef();
    const refProfileDropDown = useRef();
    const[profileDropDown,setProfileDropDown] = useState(false);
    const cart = props.cart;
    const clearCart = props.clearCart;
    const addToCart = props.addToCart;
    const subtotal = props.subtotal;
    const removeFromCart = props.removeFromCart;
    const [userName,setUserName] = useState(null);
    const getUserName= async ()=>{
        if(!localStorage.getItem('token'))return;
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUserDetails`,{
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": localStorage.getItem('token')
            }
        })
        const un = await response.json();
        setUserName(un.name);
    }
    useEffect(() => {
      
         getUserName();
      
    }, [])
    
    function hideToggle(r){
        if(!r.current.classList.contains('hidden')){
            r.current.classList.add('hidden');
        }else{
            r.current.classList.remove('hidden');
        }
    }
    function handleHamburger(){
        hideToggle(refNav)
    }
    function sideCartToggle(){
        let r = refSideCart;
        if(r.current.classList.contains('translate-x-full')){
            r.current.classList.remove('translate-x-full');
            r.current.classList.add('translate-x-0');
            r.current.classList.add('shadow-2xl');

        }else{
            r.current.classList.remove('shadow-2xl');
            r.current.classList.remove('translate-x-0');
            r.current.classList.add('translate-x-full');
        }
    }
  return (
    <div className='flex flex-col md:flex-row p-1 shadow-md'>
        <Link href={"/"}><div className="md:m-1 m-auto"><Image src={"/logotitle.png"} alt='logo' width={90} height={40} ></Image></div></Link>
        <ul ref={refNav} className={"flex flex-col md:flex-row md:space-x-2 text-2xl md:flex hidden"}>
            <Link href={"/shirts"} onClick={handleHamburger}><li className='p-1  hover:bg-rose-400  rounded-md font-bold leading-none tracking-tight text-gray-900 md:text-xl dark:text-white'>Shirts</li></Link>
            <Link href={"/hoodies"} onClick={handleHamburger}><li className='p-1  hover:bg-rose-400 rounded-md font-bold leading-none tracking-tight text-gray-900 md:text-xl dark:text-white'>Hoodies</li></Link>
            <Link href={"/notApparels"} onClick={handleHamburger}><li className='p-1  hover:bg-rose-400 rounded-md font-bold leading-none tracking-tight text-gray-900 md:text-xl dark:text-white'>Not Apparels</li></Link>
            <Link href={"/joggers"} onClick={handleHamburger}><li className='p-1  hover:bg-rose-400 rounded-md font-bold leading-none tracking-tight text-gray-900 md:text-xl dark:text-white'>Joggers</li></Link>
        </ul>
        <div className=' absolute flex flex-row top-0 right-0 space-x-4'>
        <div className='relative rounded-3xl border-red-600 text-rose-500  flex flex-row font-bold cursor-pointer text-sm p-1' onMouseOver={()=>{setProfileDropDown(true)}} onMouseLeave={()=>{setProfileDropDown(false)}}>
            <div className='hover:text-rose-400 flex flex-row'  >
                <HiUserCircle size={34}/> 
                {props.user && <div className='m-auto'>Hi, {userName}</div>}
                {!(props.user) && <Link href={"/login"} className='m-auto'>Login</Link>}
            </div>
            
            {profileDropDown && props.user && <div ref={refProfileDropDown} className='absolute z-50 top-11 flex flex-col bg-zinc-200 rounded-lg  shadow shadow-black'>
            <Link href={"/account"}><div className='p-2 hover:text-black'>My Account</div></Link>
                <Link href={"/orders"}><div className='p-2 hover:text-black'>Orders</div></Link>
                <div className='p-2 hover:text-black' onClick={props.logout}>Logout</div>
            </div>
            }   
        </div>
        
        <AiOutlineShoppingCart onClick={sideCartToggle}  className='cursor-pointer hover:text-slate-500 ' size={40}/>
        <GiHamburgerMenu className="md:hidden block " size={40} onClick={handleHamburger}/>
        </div>


        <div ref={refSideCart} className="transform transition-transform translate-x-full shadow-black  sideCart fixed top-0 right-0 z-40 h-full w-[320px] bg-slate-200">
            <div className='m-1 flex flex-row-reverse'><AiFillCloseCircle className="cursor-pointer" onClick={sideCartToggle}  size={30}/></div>
            <h1 className='ttext-3xl text-center font-extrabold dark:text-white'>Cart</h1>
            <div className="cartTable h-full">
               
               <div className='h-3/4 space-y-3 m-3 overflow-y-auto'>
               {
                    Object.keys(cart).map((key)=>{
                        return <div className="tableRow flex flex-row bg-stone-300 rounded-xl p-1 " key={key}>
                            <div className='w-9 h-full mx-1'><img src={cart[key].img} alt="productImage" /></div>
                        <div className="pname w-1/2 font-bold overflow-ellipsis overflow-x-clip text-xs m-auto">{cart[key].name} ({cart[key].color} / {cart[key].size})</div>
                        <div className="quantity flex flex-row w-1/4 font-bold my-auto">
                            <AiFillMinusCircle onClick={()=>{removeFromCart(key,cart[key].name,1,cart[key].price,cart[key].color,cart[key].size)}} className='text-2xl cursor-pointer mx-1'/>
                                 <span className='w-[41px] text-center overflow-auto '>{cart[key].qty}</span>  
                            <AiFillPlusCircle onClick={()=>{addToCart(key,cart[key].name,1,cart[key].price,cart[key].color,cart[key].size)}} className='text-2xl cursor-pointer mx-1'/>
                        </div>
                        <div className="price w-1/4 font-bold text-center overflow-x-auto text-xs m-auto">₹{cart[key].price}</div>
                    </div>
                    })
                }
               </div>
                

                {Object.keys(cart).length === 0 && <h1 className='text-center text-teal-900' >The Cart is Empty!</h1>
                }

            <div className='h-1/4 w-full shadow shadow-black pb-2 space-y-2'>
                    {Object.keys(cart).length!=0 && <div className='text-center bg-black text-white' >
                        Totol: ₹{subtotal}
                    </div>
                    }

                        

                    <div className='text-center pt-3'>
                    <Link href={"/checkout"}>
                    <button type="button" onClick={sideCartToggle} className="right-0 text-white  bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg aria-hidden="true" className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                        Check Out
                    </button>
                    </Link>
                    <button type="button" onClick={clearCart} className="text-emerald-900 underline">
                        Clear
                    </button>
                    </div>


                </div>
               
            </div>

                

        </div>

        


    </div>
  )
}

export default NavBar
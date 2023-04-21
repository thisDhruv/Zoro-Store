import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import '@/styles/globals.css'
import { Router, useRouter } from 'next/router';
import { stringify } from 'postcss';
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const[cart,setCart] = useState({}); // data structure = jsonOject (But Used as Map[key,{cartItem}])
  const[subtotal,setSubtotal] = useState(0);
  const router = useRouter();
  const [user,setUser] = useState(null);
  const [key,setKey]=useState(null);//just to rerender the navbar after logout
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(40);
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100);
    })
    try {
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
      if(localStorage.getItem("cartTotal")){
        setSubtotal(parseFloat(localStorage.getItem("cartTotal")));
      }
      if(localStorage.getItem('token')){
        setUser({value:localStorage.getItem('token')});
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  }, [key])
  
  const logout=()=>{
    setUser(null);
    localStorage.removeItem('token');
    setKey(Math.random());
    router.push('/');
  }

  const saveCartToStorage=(mycart,mytotal)=>{
    localStorage.setItem("cart",JSON.stringify(mycart));
    console.log(mytotal);
    localStorage.setItem("cartTotal",(mytotal).toString());
  }
  const clearCart = ()=>{
    setCart({});
    setSubtotal(0);
    saveCartToStorage({},0);
  }
  const buyNow = (key,name,qty,price,color,size,img)=>{
    setSubtotal(0);
    let newCart = {};
    newCart[key] = {name:name,qty:1,price:price,unitTotal:price,color:color,size:size,img:img};
    let newTotal = truncate2(price*qty);
    setCart(newCart);
    setSubtotal(newTotal);
    saveCartToStorage(newCart,newTotal);
    router.push("/checkout")
  }

  function truncate2(a){
    return (Math.round((a * 1000)/10)/100);
  }
  const removeFromCart = (key,name,qty,price,color,size,img)=>{

    let newCart = cart;
    if(cart[key]==null){
      return;
    }

    newCart[key].qty = newCart[key].qty - qty;
    newCart[key].unitTotal = truncate2(newCart[key].unitTotal - qty*price);
    let newTotal = truncate2(subtotal-price*qty);
    if(newCart[key].qty<=0){
      delete newCart[key];
    }
    setSubtotal(newTotal);
    setCart(newCart);
    saveCartToStorage(newCart,newTotal);
  }
  const addToCart = (key,name,qty,price,color,size,img)=>{

    let newCart = cart;
    if(cart[key]==null){
      newCart[key] = {name:name,qty:0,price:price,unitTotal:0,color:color,size:size,img:img};
    }

    newCart[key].qty = newCart[key].qty + qty;
    newCart[key].unitTotal = truncate2(newCart[key].unitTotal + qty*price);
    let newTotal = truncate2(subtotal+price*qty);
    setCart(newCart);
    setSubtotal(newTotal);
    // console.log(newTotal);
    saveCartToStorage(newCart,newTotal);
  }

  

  return <>
  <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
  />
  <NavBar user={user} logout={logout} key={key} cart={cart} subtotal={subtotal} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} />
  <Component user={user} setKey={setKey} cart={cart} buyNow={buyNow} subtotal={subtotal} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} {...pageProps} />
  <Footer/>
  </>
}

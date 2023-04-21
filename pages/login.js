import Link from 'next/link'
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const login = (props) => {
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/');
    }
  }, [])
  

  const handleChange = (e)=>{
    if(e.target.name==='password')setPassword(e.target.value);
    if(e.target.name==='email')setEmail(e.target.value);
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
    method: "POST",
    body: JSON.stringify({
        email: email,
        password: password
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const rjson = await response.json();
    console.log(rjson);
    
    if(response.status==200 && rjson.success!=="fail"){
      localStorage.setItem('token',rjson.token);
      toast.success("Logged In", {
        position: "top-center",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        props.setKey(Math.random());
        setTimeout(()=>{
          router.push("/");
        },1000)
    }else{
      toast.error("Invalid Credentials", {
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
  }
  return (
<div class="mx-auto max-w-screen-xl min-h-screen px-4 py-16 sm:px-6 lg:px-8">
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
  <div class="mx-auto max-w-lg">
    <h1 class="text-center text-2xl font-bold text-rose-500 sm:text-3xl">
      SIGN IN
    </h1>

    <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
      Sign in and get one step closer to grab your favourite merch
    </p>

    <form
      action=""
      class="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
      <p class="text-center text-lg font-medium">Sign in to your account</p>

      <div>
        <label for="email" class="sr-only">Email</label>

        <div class="relative">
          <input
            type="email"
            name='email'
            value={email}
            onChange={handleChange}
            class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Enter email"
          />

          <span
            class="absolute inset-y-0 right-0 grid place-content-center px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label for="password" class="sr-only">Password</label>

        <div class="relative">
          <input
            type="password"
            name='password'
            value={password}
            onChange={handleChange}
            class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Enter password"
          />

        </div>

      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        class="block w-full rounded-lg bg-rose-500 px-5 py-3 text-sm font-medium text-white"
      >
        Sign in
      </button>
      <div className='flex flex-row relative'>
      <p class="text-left text-sm text-gray-500">
        <Link href={"/forgot"} class="underline">Forgot Password?</Link>
      </p>
      <p class="absolute right-0 text-sm text-gray-500">
        No account?
        <Link href={"/signup"} class="underline">Sign up</Link>
      </p>
      </div>

      
    </form>
  </div>
</div>

  )
}

export default login
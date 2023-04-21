import Link from 'next/link'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
  const [name,setName] = useState(null);
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);

  const handleChange = (e)=>{
    if(e.target.name==='name')setName(e.target.value);
    if(e.target.name==='email')setEmail(e.target.value);
    if(e.target.name==='password')setPassword(e.target.value);
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
    method: "POST",
    body: JSON.stringify({
        name: name,
        email: email,
        password: password
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const rjson = await response.json();
    if(response.status==200 && rjson.success==='true'){
      toast.success("User Signed up", {
        position: "top-center",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }else{
      toast.success("Something went wrong", {
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
    <div className="mx-auto max-w-screen-xl min-h-screen px-4 py-16 sm:px-6 lg:px-8">
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
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-rose-500 sm:text-3xl">
      SIGN UP
    </h1>

    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
      Sign up and get one step closer to grab your favourite merch
    </p>

    <form
      action=""
      className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
      <p className="text-center text-lg font-medium">Create an Account</p>

      <div>
        <label htmlFor="name" className="sr-only">Name</label>

        <div className="relative">
          <input
            value={name}
            type="text"
            onChange={handleChange}
            name='name'
            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Enter Name"
          />

        </div>
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
          <input
            value={email}
            type="email"
            onChange={handleChange}
            name='email'
            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Enter email"
          />

          <span
            className="absolute inset-y-0 right-0 grid place-content-center px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
          <input
            value={password}
            onChange={handleChange}
            type="password"
            name='password'
            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Enter password"
          />

        </div>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="block w-full rounded-lg bg-rose-500 px-5 py-3 text-sm font-medium text-white"
      >
        Sign up
      </button>

      <p className="text-center text-sm text-gray-500">
        Already a user?
        <Link href={"/login"} className="underline">login</Link>
      </p>
    </form>
  </div>
</div>

  )
}

export default Signup
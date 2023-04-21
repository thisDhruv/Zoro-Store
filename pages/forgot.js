import Link from 'next/link'
import React from 'react'

const Forgot = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-lg">
      <h1 className="text-center text-2xl font-bold text-rose-500 sm:text-3xl">
        Forgot Password
      </h1>
  
      <form
        action=""
        className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
      >
        <p className="text-center text-lg font-medium">Enter Your Email and continue</p>

        <div>
          <label htmlFor="email" className="sr-only">Email</label>
  
          <div className="relative">
            <input
              type="email"
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

  
        <button
          type="submit"
          className="block w-full rounded-lg bg-rose-500 px-5 py-3 text-sm font-medium text-white"
        >
          Continue →
        </button>
  
        <p className="text-center text-sm text-gray-500">
          remember your password?
          <Link href={"/login"} className="underline">login</Link>
        </p>
      </form>
    </div>
  </div>
  )
}

export default Forgot

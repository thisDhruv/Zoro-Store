import React, { useEffect, useState } from 'react'
import {MdModeEditOutline} from 'react-icons/md';
import {RxCross2} from 'react-icons/rx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Account = () => {
  const[email,setEmail]=useState('');
  const[phone,setPhone]=useState('');
  const[phoneAd,setPhoneAd] = useState('');
  const[name,setName]=useState('');
  const[nameAd,setNameAd]=useState('');
  const[address,setAddress]=useState('');
  const[city,setCity]=useState('');
  const[pincode,setPincode]=useState('');
  const[state,setState]=useState('');
  const[addressModal,setAddressModal] = useState(false);
  const[detailsEditMode,setDetailsEditMode] = useState(false);
  const[addresses,setAddresses] = useState([]);
  const[currentSelectedAddressModal,setCurrentSelectedAddressModal] = useState(-1);
  const[passwordChangeMode,setPasswordChangeMode] = useState(false);
  const[currPass,setCurrPass] = useState('');
  const[newPass,setNewPass] = useState('');
  const[newPass2,setNewPass2] = useState('');

  const handleChange = (e)=>{
    if(e.target.name=='email')setEmail(e.target.value);
    if(e.target.name=='phone')setPhone(e.target.value);
    if(e.target.name=='phoneAd')setPhoneAd(e.target.value);
    if(e.target.name=='name')setName(e.target.value);
    if(e.target.name=='nameAd')setNameAd(e.target.value);
    if(e.target.name=='address')setAddress(e.target.value);
    if(e.target.name=='city')setCity(e.target.value);
    if(e.target.name=='pincode')setPincode(e.target.value);
    if(e.target.name=='state')setState(e.target.value);
    if(e.target.name=='currPass')setCurrPass(e.target.value);
    if(e.target.name=='newPass')setNewPass(e.target.value);
    if(e.target.name=='newPass2')setNewPass2(e.target.value);
  }
  const getAccountData = async ()=>{
    if(!localStorage.getItem('token'))return;
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUserDetails`,{
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": localStorage.getItem('token')
        }
    })
    const userData = await response.json();
    if(userData.addresses){
        setAddresses(userData.addresses);
    }
    setName(userData.name);
    setEmail(userData.email);
    if(userData.phone)setPhone(userData.phone);
  }


  const savePersonalDetails = async ()=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/saveUserDetails`,{
        method: "POST",
        body: JSON.stringify({
            name: name,
            phone: phone
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": localStorage.getItem('token')
        }
    })
    if(response.status===200){
        toast.success("Details Saved!", {
            position: "top-center",
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        setDetailsEditMode(false);
    }
  }
  const updatePassword = async(e)=>{
    if(currPass.length==0 || newPass.length==0 || newPass2.length==0){
        toast.error("Please Fill Valid Details", {
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
    if(newPass2!==newPass){
        toast.error("Passwords do not match", {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatePassword`,{
        method: "POST",
        body: JSON.stringify({
            currPass,
            newPass
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": localStorage.getItem('token')
        }
    })
    if(response.status==200){
        toast.success("Password Changed Successfully!", {
            position: "top-center",
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setNewPass('');
            setNewPass2('');
            setCurrPass('');
    }else{
        let rjson = await response.json();
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
    }
  }

  const saveAddressDetails = async (e)=>{
    e.preventDefault();
    if(nameAd.length==0 || phoneAd.length<10 || address.length==0 || state.length==0 || city.length==0 || pincode==0 ){
        toast.error("Please Fill Valid Details", {
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
    let id = currentSelectedAddressModal;
    if(id!==-1){
        addresses[id]={
            id:id,
            name:nameAd,
            phone:phoneAd,
            address:address,
            city:city,
            state:state,
            pincode:pincode
        }
    }else{
        addresses.push({
            id:addresses.length,
            name:nameAd,
            phone:phoneAd,
            address:address,
            city:city,
            state:state,
            pincode:pincode
        })
    }
   
   
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/saveUserDetails`,{
        method: "POST",
        body: JSON.stringify({
            addresses:addresses
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": localStorage.getItem('token')
        }
    })
    if(response.status===200){
        toast.success("Address Saved!", {
            position: "top-center",
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        setAddressModal(false);
    }
  }
  const addressModalSet = (id)=>{
    if(id==-1){
        setPhoneAd("");
    setNameAd("");
    setAddress("");
    setCity("");
    setPincode("");
    setState("");
    setCurrentSelectedAddressModal(-1);
    return;
    }
    let currAd = addresses[id];
    setPhoneAd(currAd.phone);
    setNameAd(currAd.name);
    setAddress(currAd.address);
    setCity(currAd.city);
    setPincode(currAd.pincode);
    setState(currAd.state);
    setCurrentSelectedAddressModal(id);
  }
  useEffect(() => {
     getAccountData();
  }, [])
  

  return (
    <>
    <h1 className="text-3xl text-center my-5 font-semibold">Your Account</h1>
    <div id="Container" className="md:w-3/5 p-2 m-auto w-full mb-5">

    
    <div className='flex flex-row space-x-3'>
    <div className='w-1/2'>
    <div className="text-xl font-bold flex flex-row content-center">
        1. Your Details <div onClick={()=>{setDetailsEditMode(!detailsEditMode)}} className="ml-4 hover:bg-slate-300 : rounded-full p-1"><MdModeEditOutline size={20} /></div>
    </div>
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
                disabled={true}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
              <div className="mb-6 flex-1">
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
                disabled={!detailsEditMode}

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
                disabled={!detailsEditMode}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
           {
            detailsEditMode && <button
            type="button"
            onClick={savePersonalDetails}
            className="text-white  bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            
            Submit
          </button>
           }
            
    </div>
    <div className='w-1/2 '>
        
    
        <div className='text-xl font-semibold flex flex-row content-center'>Change Password: 
        <div onClick={()=>{setPasswordChangeMode(!passwordChangeMode)}} className="ml-4 hover:bg-slate-300 : rounded-full p-1"><MdModeEditOutline size={20} /></div>
        </div>
        <div className="mb-6 flex-1">
                <label
                  htmlFor="currPass"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currPass"
                  value={currPass}
                  name="currPass"
                  disabled={!passwordChangeMode}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6 flex-1">
                <label
                  htmlFor="newPass"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPass"
                  value={newPass}
                  name="newPass"
                  disabled={!passwordChangeMode}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6 flex-1">
                <label
                  htmlFor="newPass2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password (Enter Again)
                </label>
                <input
                  type="password"
                  id="newPass2"
                  value={newPass2}
                  name="newPass2"
                  disabled={!passwordChangeMode}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {
            passwordChangeMode && <button
            type="button"
            onClick={updatePassword}
            className="text-white  bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            
            Submit
          </button>
           }
        
    </div>

    </div>



            



    <div className="mb-3 text-xl font-bold">2. Saved Addresses</div>
    <div className=' grid grid-cols-3 gap-1 '>

    <div onClick={()=>{addressModalSet(-1); setAddressModal(true)}} className='bg-slate-100 hover:bg-slate-300 cursor-pointer text-8xl text-center  border border-stone-600 rounded-md p-1'>
        +
    </div>
    {
        addresses.map((address)=>{
            return <div key={address.id} onClick={()=>{addressModalSet(address.id); setAddressModal(true) }} className='bg-slate-100 relative md:text-base text-xs hover:bg-slate-300 cursor-pointer border border-stone-600 rounded-md p-1'>
            <span className='font-bold'>{address.name}</span>
            <div>Phone: {address.phone}</div>
            <p>{address.address}</p>
            <p>{address.city}, {address.state},  {address.pincode}</p>
            <MdModeEditOutline size={20} className={"absolute right-1 top-1"} />
        </div>
        })
    }
    </div>



{
    addressModal && <div  tabindex="-1" className='fixed  bg-black/50 h-full w-full z-50 top-0 right-0 md:inset-0 p-4' >
    <div className='MODAL-CONTENT md:w-1/2 w-full relative h-auto m-auto bg-slate-300 border md:p-8 p-2 pt-5 border-neutral-900 rounded-lg'>
        <RxCross2 className={'text-3xl absolute right-1 top-1 cursor-pointer hover:text-zinc-600' } onClick={()=>{setAddressModal(false)}}/>
    <form>
    <div className="flex flex-row ">
          <div className="mb-6 md:mr-6 flex-1">
            <label
              htmlFor="nameAd"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="nameAd"
              value={nameAd}
              name="nameAd"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
          <label
            htmlFor="phoneAd"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <input
            type="phone"
            id="phoneAd"
            name="phoneAd"
            value={phoneAd}
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
          <div className="mb-6 md:mr-6 flex-1">
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
          <div className="mb-6 md:mr-6 flex-1">
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
        <button
            type="submit"
            onClick={saveAddressDetails}
            className="mt-1 text-white  bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            
            Save
          </button>
        </form>
        
    </div>

      </div>
}
    
   

</div> 
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
  )
}

export default Account
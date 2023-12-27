import React from 'react'
import {auth, provider} from "./../../firebase.js"
import { signInWithPopup } from "firebase/auth";
import { Dashboard } from "../../component/Dashboard/Dashboard.jsx";
import { useEffect, useState } from "react";


function LoginWithGoogle() {
  const [value, setValue] = useState('');

  const handleClick = () => {
    signInWithPopup(auth,provider).then((data) => {
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
    })
  }

  useEffect(() => {
    setValue(localStorage.getItem('email'))
  })

  return (
    <div>
      {value ? <Dashboard/> : 
        <button
          className="bg-blue-500 text-white py-2 rounded-xl hover:bg-red-600 transition w-full max-w-[350px] duration-300 mt-4"
          onClick={handleClick}
        >
          Sign In With Google
        </button>
      }
    </div>
  )
}

export default LoginWithGoogle
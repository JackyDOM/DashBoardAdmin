// Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "./action";

const Login = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  

  const onChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputData;
    const signInStatus = await signIn(email, password);
    if (signInStatus) {
      navigate("/dashboard/management"); // Update the path accordingly
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-xl w-[400px] h-[500px]">
        <h1 className="text-3xl font-semibold mb-5">Sign In</h1>
        <p className="text-sm text-gray-600 mb-8">
          Please provide your credentials
        </p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Form Inputs */}
          <input
            onChange={onChange}
            type="text"
            placeholder="example@gmail.com"
            id="email"
            className="p-2 border rounded-xl focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
          <input
            onChange={onChange}
            type="password"
            placeholder="Password"
            id="password"
            className="p-2 border rounded-xl focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

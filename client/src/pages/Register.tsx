import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from 'react-router-dom';

import { REGISTER_USER } from "../graphql/mutations";

function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const [registerUser] = useMutation(REGISTER_USER)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerUser({ variables: { input: {name, email, password } } });
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-[#5cbdb9] w-60 sm:w-96 sm:mt-[60px] border-2 rounded-lg">
        <div className="my-4">
          <h2 className="font-bold text-xl font-epilogue m-6 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-[80%] mx-4">
              <label htmlFor="name" className="font-epilogue font-semibold p-2">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                className=""
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[80%] mx-4">
              <label htmlFor="email" className="font-epilogue font-semibold p-2">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[80%] mx-4">
              <label htmlFor="password" className="font-epilogue font-semibold p-2">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="font-epilogue font-semibold px-4 rounded-[10px] border text-[#5cbdb9] border-solid bg-[#fbe3e8] m-3 h-10">
              Register
            </button>
          </form>
          <p className="font-epilogue font-normal p-3 text-sm">Already Have an Account?</p>
          <Link to="/login" className="font-epilogue font-semibold px-4 rounded-[10px] border border-solid text-[#5cbdb9] bg-[#fbe3e8] m-3 h-6">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;

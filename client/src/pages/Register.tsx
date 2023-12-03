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
      <div className="bg-[#fbe3e8] w-60 sm:w-96 border-2 rounded-lg">
        <div className="">
          <h2 className="font-bold text-xl font-epilogue m-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="name" className="font-epilogue font-semibold m-3">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                className=""
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="">
              <label htmlFor="email" className="font-epilogue font-semibold m-3">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="">
              <label htmlFor="password" className="font-epilogue font-semibold m-3">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="font-epilogue font-semibold px-4 rounded-[10px] border border-solid border-[#5cbdb9] m-3">
              Register
            </button>
          </form>
          <p className="font-epilogue font-semibold m-4">Already Have an Account</p>
          <Link to="/login" className="font-epilogue font-semibold px-4 rounded-[10px] border border-solid border-[#5cbdb9] m-3">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;

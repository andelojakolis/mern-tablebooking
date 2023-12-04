import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { LOGIN_USER } from "../graphql/mutations"

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const[loginUser] = useMutation(LOGIN_USER)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser({ variables: { input: { email, password } } });
      navigate('/table-booking')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className="bg-[#5cbdb9] w-60 sm:w-96 sm:mt-[60px] border-2 rounded-lg">
        <div className="my-8">
          <h2 className="font-bold text-xl font-epilogue m-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-[80%] mx-4">
              <label htmlFor="email" className="font-epilogue font-semibold p-2">
                Email
              </label>
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
              <label htmlFor="password" className="font-epilogue font-semibold p-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="font-epilogue font-semibold px-4 rounded-[10px] border text-[#5cbdb9] border-solid bg-[#fbe3e8] m-3 h-10">
              Login
            </button>
          </form>
          <p className="font-epilogue font-normal p-3 text-sm">Don't have an account?</p>
          <Link
            to="/register"
            className="font-epilogue font-semibold px-4 rounded-[10px] border border-solid text-[#5cbdb9] bg-[#fbe3e8] m-3 h-6"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

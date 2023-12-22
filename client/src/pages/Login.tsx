import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'

import { LOGIN_USER } from "../graphql/mutations"

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();

  const[loginUser] = useMutation(LOGIN_USER)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { input: { email, password } },
      });
      const token = data.login;
      localStorage.setItem('accessToken', token);
      navigate('/')
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
  }

  return (
    <div className='flex justify-center'>
      <div className="bg-[white] w-60 sm:w-96 sm:mt-[60px] border-2 rounded-lg">
        <div className="my-8">
          <h2 className="font-bold text-xl font-epilogue m-6 text-center text-[#5cbdb9]">Login</h2>
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
                type={type}
                placeholder="Enter Password"
                name="password"
                className="caret-white"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="flex justify-around items-center" onClick={handleToggle}>
                  <Icon className="absolute sm:ml-64 ml-40 mb-6" icon={icon} size={24}/>
              </span>
            </div>
            <button type="submit" className="font-epilogue font-semibold px-4 rounded-[10px] border text-[white] border-solid bg-[#5cbdb9] m-3 h-10">
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

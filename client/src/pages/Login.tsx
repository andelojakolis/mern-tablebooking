import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(res => {
        console.log("login: " + res.data);
        if (res.data.Status === "Success") {
          if (res.data.role === "admin") {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="">
      <div className="">
        <h2 className="">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="email" className="">
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
          <div className="">
            <label htmlFor="password" className="">
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
          <button type="submit" className="">
            Login
          </button>
        </form>
        <p className="">Don't have an account?</p>
        <Link
          to="/register"
          className=""
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;

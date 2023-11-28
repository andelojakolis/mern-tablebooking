import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="">
      <div className="">
        <h2 className="">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="name" className="">Name</label>
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
            <label htmlFor="email" className="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className=""
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="">
            Register
          </button>
        </form>
        <p className="">Already Have an Account</p>
        <Link to="/login" className="">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;

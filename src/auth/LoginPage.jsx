import React, { useState } from 'react'
import { Button } from '@mui/material'
import { RxAvatar } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase';

export const LoginPage = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch(err) {
      setErr(true);
    }
  };

  return (
    <div className='registerContainer'>
      <div className='registerForm animate__animated animate__fadeIn'>

        <span className='registerLogo'>SApp</span>
        <span className='registerTitle'>Login</span>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='Mail' />
          <input type="password" placeholder='Password' />

          <Button
            className='registerBtn'
            type='submit'
          >
            Sign in
          </Button>

          {err && <span className='text-error animate__animated animate__flash'> Something went wrong </span>}
        
          <p
            onClick={() => navigate("/register")}
          > 
            You do have an account?  Register 
          </p>

        </form>

      
      </div>
    </div>
  )
}

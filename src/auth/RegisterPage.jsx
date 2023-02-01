import React, { useState } from 'react'
import { Button } from '@mui/material'
import { RxAvatar } from "react-icons/rx";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

export const RegisterPage = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try{
      const res = await createUserWithEmailAndPassword( auth, email, password);

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            // set Name and Photo
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            // set database
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            })

            await setDoc(doc(db, "userChats", res.user.uid), {});

            navigate("/");
          });
        }
      );
    } catch(err) {
      setErr(true);
    }
  };
      
  return (
    <div className='registerContainer'>
      <div className='registerForm animate__animated animate__fadeIn'>

        <span className='registerLogo'>SApp</span>
        <span className='registerTitle'>Register</span>

        <Formik>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Name' name='name'/>
            <input type="email" placeholder='Mail' name='mail'/>
            <input type="password" placeholder='Password' name='password'/>
            <input style={{ display:"none" }}  type="file" id="file" />
            <label className='registerLabel' htmlFor="file">
              <RxAvatar className='registerIcon' /> Add an avatar
            </label>

            <Button
              className='registerBtn'
              type='submit'
            >
              Sign Up
            </Button>

            {err && <span className='text-error animate__animated animate__flash'> Something went wrong </span>}

            <p
              onClick={() => navigate("/login")}
            > 
              You do have an account? Login 
            </p>

          </form>
        </Formik>
      
      </div>
    </div>
  )
}

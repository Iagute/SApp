import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { select } from '../../store/slices/sidebar/sidebarSlice';
import { BsPersonCircle } from "react-icons/bs";
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp, } from "firebase/firestore";
import { db } from '../../firebase/firebase';


export const Search = () => {

  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const [err1, setErr1] = useState(false)

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err1) {

      setUser(null);
      setErr1(true);
      setUsername("");
    };
  }

  return (
    <div className='search'>

      <div className="searchForm">
        <input 
          type="text" 
          placeholder='Find a user' 
          onKeyDown={handleKey} 
          onChange={e => setUsername(e.target.value)}
          value={username}
        />

        {err && <span className='text-error'> User not found </span> }

        {
          user
          ? 
          <div className='userChat animate__animated animate__fadeInLeft' onClick={handleSelect}>
            <img src={user.photoURL} alt=""/>
            <div>
              <span>{user.displayName}</span>
            </div>
          </div>
          :
          <div className='userChat'>
            <BsPersonCircle className='userChatIcon' />
            <div>
              <span>Search some friends!</span>
            </div>
          </div>
        }

        {err1 && <span className='text-error'> Something went wrong </span>}

        </div>

      </div>




  )
}

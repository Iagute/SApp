import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { useDispatch, useSelector } from 'react-redux';
import { select } from '../../store/slices/sidebar/sidebarSlice';

export const Chats = () => {

  const [chats, setChats] = useState([]);

  const { selected } = useSelector((state) => state.sidebar)
  const dispatchi = useDispatch();
  
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });
  
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid])  

  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload: u })
    dispatchi(select() )
  }

  return (
    <div className='chats animate__animated animate__fadeIn'>
      {
        (chats)
        ?
        Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          <div 
            className="userChat" 
            key={chat[0]} 
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className='userChatInfo'>
              <span> {chat[1].userInfo.displayName} </span>
              <p> 
              {
                (chat[1].lastMessage)
                ?
                chat[1].lastMessage?.text
                :
                'Start a conversation'
              }
              </p>
            </div>
          </div>
        ))
        :
        <span className='userNotFriends'> Search for new Friends! </span>
      }
    </div>
  )
}

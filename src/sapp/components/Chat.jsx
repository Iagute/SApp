import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { trigger } from '../../store/slices/sidebar/sidebarSlice';
import { ChatContext } from '../../context/ChatContext';
import { Messages } from './Messages';
import { Input } from './Input';
import { IconButton } from '@mui/material';
import { BsArrowRight, BsX } from "react-icons/bs";
import { BsCameraVideoFill, BsPersonPlusFill, BsThreeDots } from "react-icons/bs";

export const Chat = () => {

  const { clicked } = useSelector((state) => state.sidebar)
  const dispatch = useDispatch();

  const { data } = useContext(ChatContext);

  return (
    <div className='chat animate__animated animate__fadeIn'>
      
      <div className="chatInfo">

        <div className='chatUser'>
          <IconButton
            onClick={ () => dispatch(trigger() ) }
          >
            {
              (clicked)
              ?  <BsX className='navbarMobileIcon'/>
              :  <BsArrowRight className='navbarMobileIcon'/>
            }
          </IconButton>
          <span> {data.user?.displayName} </span>
        </div>


      </div>

      <Messages />
      <Input />
    </div>
  )
}

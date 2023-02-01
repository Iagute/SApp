
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Chats } from './Chats'
import { Navbar } from './Navbar'
import { Search } from './Search'

export const Sidebar = () => {

  const { clicked } = useSelector((state) => state.sidebar)

  return (
    <div  
      className=
      {
        clicked
        ? 'sidebar animate__animated animate__fadeIn' 
        : 'mobSidebar' 
      }
      
    >

      <Navbar/>
      <Search />
      <Chats />


    </div>
  )
}

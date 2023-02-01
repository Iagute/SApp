import React from 'react'
import { useSelector } from 'react-redux'
import { Chat } from './components/Chat'
import { NothingSelected } from './components/NothingSelected'
import { Sidebar } from './components/Sidebar'

export const HomePage = () => {

  const { selected } = useSelector((state) => state.sidebar)

  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>

        {
          selected
          ? <Chat /> 
          : <NothingSelected />
        }

      </div>
    </div>
  )
}

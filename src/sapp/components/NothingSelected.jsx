import React from 'react'
import { BsPersonPlusFill } from "react-icons/bs";

export const NothingSelected = () => {
  return (
    <div className='nothingSelected'>
        <div className='nothingNavbar'>
          <h1 className='nothingText'> SApp </h1>
        </div>

        <div className='nothingHeader'>
          <h2> Select a chat or search for new friends </h2>
          <p><BsPersonPlusFill /></p>
        </div>
    </div>
  )
}

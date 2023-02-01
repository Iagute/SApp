import { IconButton } from '@mui/material'
import { FiLogOut } from "react-icons/fi";
import { BsArrowRight, BsX } from "react-icons/bs";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>

      <div className='navbarUser'>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
      </div>

      <IconButton
        className='navbarLogout'
        onClick={() => signOut(auth)}
      >
        <FiLogOut />
      </IconButton>

      
    </div>
  )
}

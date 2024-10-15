import {Link} from 'react-router-dom';
import {FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import { useState } from 'react';
import { User } from '../types/types';
import toast from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface PropsType {
  user: User | null,
}

const Header = ({user}: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hanldeLogout = () => {
    try {
      signOut(auth);
      toast.success("Sign out successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign out failed");
    }
  }

  return (
    <nav className='header'>
      <Link onClick={()=> setIsOpen(false)} to={"/"}>HOME</Link>
      <Link onClick={()=> setIsOpen(false)} to={"/search"}> <FaSearch /> </Link>
      <Link onClick={()=> setIsOpen(false)} to={"/cart"}> <FaShoppingBag /> </Link>
      {user?._id ? (
        <> 
          <button onClick={()=> setIsOpen((prev) => !prev)}> <FaUser /> </button> 
          <dialog open={isOpen}>
            <div>
              {user.role == "admin" && (
                <Link to={"/admin/dashboard"}>Admin</Link>
              )}
              <Link onClick={()=> setIsOpen(false)} to={"/orders"}>Orders</Link>
              <button onClick={hanldeLogout}> <FaSignOutAlt /> </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}> <FaSignInAlt /> </Link>
      )}
    </nav>
  )
}

export default Header
import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import './navbar.css';
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

const Navbar = () => {

  const {user} = useContext(AuthContext);

  const history = useHistory();

  const handleSignOut = async() => {
    
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false,
    });

    await signOut(auth);
    history.replace("/login");
  };

  return (
    <nav className='nav'>
        <h3>
            <Link to='/'>Rhymes</Link>
        </h3>
        { user ?
          <> 
            
             <div className='nav__head'>
          
              <div className='nav__btn'>
                
                <Link to='/profile'>Profile</Link>
              </div>

              <button className='btn btn__secondary' onClick={handleSignOut}>Logout</button>

            </div>
          </> : 
          <div className='nav__head'>
          
            <div className='nav__btn'>
              <Link to='/register'>Register</Link>
            </div>
            <div className='nav__btn'>
              <Link to='/login'>Login</Link>
            </div>
          </div>
        }
    </nav>
  )
}

export default Navbar
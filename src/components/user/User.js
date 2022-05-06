import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import './user.css';

const User = ({ chat,user,user1, selectUser, msgs }) => {

  const user2 = user?.uid
  const [data, setData] = useState('');

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    let unsub = onSnapshot(doc(db, 'lastMessage', id), doc => {
      setData(doc.data());
    });
    return () => unsub()
  }, [user1, user2]);

  return (
    <div className={`user__wrapper ${chat.name === user.name && 'selected__user'}`} onClick={() => selectUser(user)}>
        <div className='user__info'>
            <div className='user__avatar'>
                <img src={user.avatar} alt="avatar" className='avatar'/> 
                
            </div>
            
            <div className='user__detail'>
            <div className='right'>
                <h4>{user.name}</h4>
                <div className={`user__status ${user.isOnline ? 'online' : 'offline'}`}></div>
            </div>
            {/* <small>{data &&  data.text}</small> */}
            </div>
            
            
            
        </div>
    </div>
  )
}

export default User
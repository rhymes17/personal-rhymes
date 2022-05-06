import React, { useEffect, useState } from 'react'
import './home.css';
import {storage, db, auth } from '../../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection,query, where, onSnapshot,addDoc, Timestamp, orderBy, setDoc, doc } from 'firebase/firestore';
import User from '../../components/user/User';
import {FiInfo} from 'react-icons/fi'
import MessageForm from '../../components/messageForm/MessageForm';
import Message from '../../components/message/Message';
import Modal from '../../components/modal/Modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Home = () => {
  
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState('');
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const [msgs, setMsgs] = useState([]);
  
  const [show, setShow] = useState(false);

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, 'users');
    // create query
    const q = query(usersRef, where('uid', 'not-in', [auth.currentUser.uid]));

    // execute query
    const unsub = onSnapshot(q, querySnapshot => {
      let users = []
      querySnapshot.forEach(doc => {
          users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const selectUser = (user) => {
    setShow(true);
    setChat(user);
    
    const user2 = user.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
  
    const msgsRef = collection(db, 'messages', id, 'chat')

    const q = query(msgsRef, orderBy('createdAt', 'asc'))

    onSnapshot(q, querySnapshot => {
      let msgs = []
      querySnapshot.forEach(doc => {
        msgs.push(doc.data())
      })

      setMsgs(msgs)
    })
    console.log(show);
  };

  const handleSubmit = async e =>{
    e.preventDefault();
    const user2 = chat.uid;
    
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    let url;
    if(img){
      const imgRef  = ref(storage, `images/${new Date().getTime()} + ${img.name}`)
    
      const snap = await uploadBytes(imgRef, img)
    const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath))
    url = dlurl;
    };
     

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || ''
    });

    await setDoc(doc(db, 'lastMessage', id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || '',
      unread: true
    })

    setText('');
  }

  return (
    <div className='home__container'>

      <div className='users__container'>
        {users.map(user => <User key={user.uid} chat = {chat} user1={user1} user={user} msgs ={msgs} selectUser={selectUser} />)}
      </div>

      
      <Modal show={show} setShow={setShow} chat={chat} msgs={msgs} user1={user1} handleSubmit={handleSubmit} text={text} setText={setText} setImg={setImg} img={img}/>

      <div className='chat__container'>

        {chat ?
        <>

          <div className='chat__nav'>
            

            <div className='chat__nav_left'>
              <img src={chat.avatar} className="avatar" alt = "avatar"/>
              <h4 className='username'> {chat.name} </h4>
            </div>
            {
              show ? 
              <AiOutlineCloseCircle className="back__icon" onClick={(e) => setShow(false)}/>:
              null
            }
            
            <FiInfo className="icons"/>
            
          </div>

          <div className='messages__container'>
            {msgs.length ? msgs.map((msg, i) => <Message key={i} msg={msg} user1={user1} />) : null}
          </div>

          <MessageForm
          handleSubmit={handleSubmit}
          text={text}
          setText={setText}
          setImg={setImg}
          />
        </>
         : 
        <div className='default__chat'>
          <h6>Select an user to Start</h6>
        </div>
        }
      </div>
    </div>
  )
}

export default Home
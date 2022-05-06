import React from 'react'
import './modal.css';
// import '../../pages/Home/home.css';

import {FiInfo} from 'react-icons/fi'
import MessageForm from '../../components/messageForm/MessageForm';
import Message from '../../components/message/Message';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Modal = ({show, setShow,chat, msgs, user1, handleSubmit, text, setImg, setText }) => {
  
  if(!show){
    return null
  }

  return (
    <div className='modal'>
      <AiOutlineCloseCircle className="back__icon" onClick={(e) => setShow(false)}/>
      <div className='chat__container__mob' onClick={e => e.stopPropagation()}>

          {chat ?
            <>
              <div className='chat__nav'>

                <div className='chat__nav_left'>
                  <img src={chat.avatar} className="avatar" alt = "avatar"/>
                  <h4 className='username'> {chat.name} </h4>
                </div>

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

export default Modal
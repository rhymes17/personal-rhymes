import React from 'react'
import './messageForm.css';
import { BiImage } from 'react-icons/bi'

const MessageForm = ({ handleSubmit, text, setText , setImg}) => {
  return (
    <form className='message__form' onSubmit={handleSubmit}>
        <label htmlFor='img'>{ <BiImage className='img__icon'/>}</label>
        <input onChange={(e) => setImg(e.target.files[0])} type='file' id='img' accept='image/' style={{display: 'none'}} />
            <input type="text" placeholder='Enter Message' value ={text} onChange={e => setText(e.target.value)}/>
        
            <button className='btn btn__send'>Send</button>
    </form>
  )
}

export default MessageForm
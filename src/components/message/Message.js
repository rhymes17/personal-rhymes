import React, { useRef, useEffect } from 'react'
import Moment from 'react-moment'
import './message.css';

const Message = ({msg, user1}) => {

    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [msg])

  return (
    <div className={`message__wrapper ${msg.from === user1 ? 'own' : ""} `} ref={scrollRef}>
        <p className={msg.from === user1 ? 'me' : 'friend'}>
            {msg.media ? <img className='msg__img' src={msg.media} alt={msg.etxt} /> : null}
            {msg.text}
            <br />
            <small>
                <Moment fromNow>{msg.createdAt.toDate()}</Moment>
            </small>
        </p>
    </div>
  )
}

export default Message
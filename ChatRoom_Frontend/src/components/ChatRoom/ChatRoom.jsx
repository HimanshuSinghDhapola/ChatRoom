import React from 'react'
import { useLocation } from 'react-router-dom';
import './styles.css';

function ChatRoom() {

  const location = useLocation();
  console.log(location.state);

  return (
    <div>
        ChatRoom
        <div className="container">
            <div className="message left">This is left message</div>
            <div className='message center'>This is center message</div>
            <div className="message right">This is right message</div>
        </div>
        <div className="send">
            <form>
                <input
                    className='msgInp'
                    type='text'
                    name='messageInp'
                    id='messageInp'
                />
                <button className="btn">Send</button>
            </form>
        </div>
    </div>
  )
}

export default ChatRoom
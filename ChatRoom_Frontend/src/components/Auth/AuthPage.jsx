import React from 'react'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../Context/SocketContext'
import './styles.css';
import io from 'socket.io-client';


function AuthPage() {

  const socket = io("http://localhost:3000");
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');

  function handleSubmit(event){
    event.preventDefault();
    socket.emit('new-user-joined', userName);
    navigate('/chatroom', {replace: true, state: {socket}});
  }

  return (
    <div className="wrapper">      
      <div className='auth p-8 m-2 rounded-lg'>
          <h1>CHATROOM</h1>
          <h2>WELCOME</h2>
          <p>Enter the username and join the chats</p>
          <form onSubmit={handleSubmit}>
              <input
                type='text'
                onChange={(e) => setUserName(e.target.value)}
                placeholder='UserName'
                value={userName}
              />
              <button className=' p-4 m-4 bg-slate-400 rounded-lg border-black'>
                Join the Room
              </button>
          </form>
      </div>
    </div>
  )
}

export default AuthPage
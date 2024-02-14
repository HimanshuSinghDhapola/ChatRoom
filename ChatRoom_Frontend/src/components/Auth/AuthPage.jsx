import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../Context/SocketContext'
import './styles.css';
import io from 'socket.io-client';


function AuthPage() {

  const socket = io("http://localhost:3000");
  const navigate = useNavigate();

  const socketState = useContext(SocketContext);

  function handleSubmit(event){
    event.preventDefault();
    socket.emit('new-user-joined', socketState.userName);
    navigate('/chatroom');
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
                onChange={(e) => socketState.setUserName(e.target.value)}
                placeholder='UserName'
                value={socketState.userName}
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
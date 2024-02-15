import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../Context/SocketContext'
import './styles.css';
import io from 'socket.io-client';
import hero_img from '../../assets/hero_img.svg';


function AuthPage() {

  const navigate = useNavigate();

  const socketState = useContext(SocketContext);

  function handleSubmit(event){
    event.preventDefault();
    socketState.socket.emit('new-user-joined', socketState.userName);
    navigate('/chatroom');
  }

  return (
    <div className="wrapper">
      <img className='hero-img' src={hero_img} alt='hero image'/>
      <form onSubmit={handleSubmit} className='form-card'>
        <div className="form-title">WELCOME 👋</div>
        <div className="form-subtitle">Enter the username and join the chats</div>

        <div className="auth">
          <div className="auth-label">UserName</div>
          <input
            className='auth-input'
            type='text'
            onChange={(e) => socketState.setUserName(e.target.value)}
            value={socketState.userName}
          />
          <button className='auth-button'>
            Join the Room
          </button>
        </div>
      </form>
    </div>
  )
}

export default AuthPage
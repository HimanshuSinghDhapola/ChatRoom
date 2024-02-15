import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../Context/SocketContext";
import "./styles.css";
import hero_img from "../../assets/hero_img.svg";

function AuthPage() {
  const navigate = useNavigate();

  const socketState = useContext(SocketContext);

  function handleSubmit(event) {
    event.preventDefault();
    socketState.socket.emit("new-user-joined", socketState.userName);
    navigate("/chatroom");
  }

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <main className="flex justify-center items-center w-full min-h-screen">
      <section className="my-10 mx-4 rounded-lg overflow-hidden p-4 w-[90%] lg:max-w-[900px] lg:flex drop-shadow-md lg:min-h-[400px]">
        <div className="h-fit lg:w-1/2">
          <img
            className="w-2/3 mx-auto lg:w-full max-w-lg object-cover rounded-lg lg:h-full"
            src={hero_img}
            alt="hero_img"
          />
        </div>
        <div className="w-full pt-6 flex flex-col lg:mx-10 items-center lg:items-center lg:justify-center lg:pl-4 lg:w-1/2 h-fit lg:my-auto">
          <h1 className=" font-[Avenir] text-xl md:text-3xl font-medium text-[#e8e8e8]">
            WELCOME <span className="emoji">👋</span>
          </h1>
          <div className="font-[Avenir] text-[#afafaf] tracking-wide text-lg pb-6">
            Enter the username and join the chats
          </div>
          <form
            className="w-full h-full py-5 text-gray-600 flex flex-col items-center justify-center"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="auth max-w-sm">
              <div className="auth-label">UserName</div>
              <input
                ref={inputRef}
                className="auth-input"
                type="text"
                onChange={(e) => socketState.setUserName(e.target.value)}
                value={socketState.userName}
              />
              <button className="auth-button">Join the Room</button>
            </div>
          </form>
        </div>
      </section>
    </main>
    // <div className="wrapper">
    //   <img className='hero-img' src={hero_img} alt='hero image'/>
    //   <form onSubmit={handleSubmit} className='form-card'>
    //     <div className="form-title">WELCOME 👋</div>
    //     <div className="form-subtitle">Enter the username and join the chats</div>

    //     <div className="auth">
    //       <div className="auth-label">UserName</div>
    //       <input
    //         className='auth-input'
    //         type='text'
    //         onChange={(e) => socketState.setUserName(e.target.value)}
    //         value={socketState.userName}
    //       />
    //       <button className='auth-button'>
    //         Join the Room
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
}

export default AuthPage;

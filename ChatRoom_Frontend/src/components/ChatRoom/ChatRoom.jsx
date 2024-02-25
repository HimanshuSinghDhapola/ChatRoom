import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../Context/SocketContext";
import { IoSend } from "react-icons/io5";
import Header from "../Header/Header";
import "./styles.css";
import Chats from "../Chats/Chats";

function ChatRoom() {
  const navigate = useNavigate();

  const { socket, userName } = useContext(SocketContext);
  const [messageInp, setMessageInp] = useState("");
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    if (userName === "") {
      navigate(-1);
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (messageInp !== "") {
      const messageData = {
        author: userName,
        message: messageInp,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send-message", messageData);
      setFeed((prevFeed) => [...prevFeed, messageData]);
    }
    setMessageInp("");
  }

  useEffect(() => {
    socket.on("user-joined", (name) => {
      setFeed((prevFeed) => [...prevFeed, name]);
    });
    socket.on("receive-message", (data) => {
      setFeed((prevFeed) => [...prevFeed, data]);
    });
    socket.on("user-left", (name) => {
      setFeed((prevFeed) => [...prevFeed, name]);
    });
  }, [socket]);

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return (
    <div className="wrapper w-full h-screen overflow-hidden">
      <Header />
      <div className="chat-card p-4">
        <Chats feed={feed} />
        <div className="send">
          <form onSubmit={handleSubmit} className="form">
            <input
              className="msgInp"
              ref={inputRef}
              placeholder="Write a message"
              type="text"
              onChange={(e) => setMessageInp(e.target.value)}
              value={messageInp}
            />
            <button className="btn">
              Send <IoSend size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;

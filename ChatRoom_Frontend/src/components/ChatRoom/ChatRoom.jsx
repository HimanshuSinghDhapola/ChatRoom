import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../Context/SocketContext";
import { IoSend } from "react-icons/io5";
import Header from "../Header/Header";
import "./styles.css";

function ChatRoom() {
  const navigate = useNavigate();

  const { socket, userName } = useContext(SocketContext);
  const [messageInp, setMessageInp] = useState("");
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    if(userName === ""){
      navigate(-1);
    }
  }, [])

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
        <div className="container my-auto mx-auto">
          {feed.map((feedContent) => {
            return (
              <div
                className={
                  " md:max-w-[40%] max-w-[60%] message " +
                  (feedContent.author
                    ? feedContent.author === userName
                      ? "right"
                      : "left"
                    : "center")
                }
              >
                {feedContent.message ? (
                  <div className="p-1">
                    <div className="text-xs font-bold justify-start mb-0">
                      {feedContent.author}
                    </div>
                    <div className=" -my-0.5 font-normal">
                      {feedContent.message}
                    </div>
                    <div className=" font-medium flex justify-end text-[10px] -my-1">
                      {feedContent.time}
                    </div>
                  </div>
                ) : (
                  feedContent
                )}
              </div>
            );
          })}
        </div>
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

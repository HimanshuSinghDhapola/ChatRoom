import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../Context/SocketContext";
import { IoSend } from "react-icons/io5";
import "./styles.css";

function ChatRoom() {
  const navigate = useNavigate();

  const { socket, userName } = useContext(SocketContext);
  const [messageInp, setMessageInp] = useState("");
  const [feed, setFeed] = useState([]);

  if (userName === "") {
    useEffect(() => {
      navigate(-1);
    }, []);
  }

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
  }, [socket]);

  return (
    <div className="chat-card">
      <div className="container">
        {feed.map((feedContent) => {
          return (
            <div
              className={
                "message " +
                (feedContent.author
                  ? feedContent.author === userName
                    ? "right"
                    : "left"
                  : "center")
              }
            >
              {feedContent.message
                ? (
                    <div className="p-2">
                        {feedContent.message}
                        <div className="flex justify-end text-xs">{feedContent.author} {feedContent.time}</div>
                    </div>
                )
                : feedContent + " joined the chat"}
            </div>
          );
        })}
      </div>
      <div className="send">
        <form onSubmit={handleSubmit} className="form">
          <input
            className="msgInp"
            placeholder="Write a message"
            type="text"
            onChange={(e) => setMessageInp(e.target.value)}
            value={messageInp}
          />
          <button className="btn">Send <IoSend size={20}/></button>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;

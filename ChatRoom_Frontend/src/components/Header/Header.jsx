import React, { useContext } from "react";
import "./styles.css";
import logo from "../../assets/chatroom.png";
import { FaUserCircle } from "react-icons/fa";
import { SocketContext } from "../../Context/SocketContext";

function Header() {
  const { userName } = useContext(SocketContext);

  return (
    <div className=" sticky top-0 inline-block w-full p-3 bg-white">
      <div className="logo">
        <img src={logo} alt="logo image"/>
      </div>
      <div className="user text-gray-600 float-end flex flex-col items-center">
        <FaUserCircle size={50}/>
        {userName}
      </div>
    </div>
  );
}

export default Header;

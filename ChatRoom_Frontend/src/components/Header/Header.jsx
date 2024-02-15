import React, { useContext } from "react";
import logo from "../../assets/chatroom.png";
import { FaUserCircle } from "react-icons/fa";
import { SocketContext } from "../../Context/SocketContext";

function Header() {
  const { userName } = useContext(SocketContext);

  return (
    <div className=" top-0 inline-block w-full p-10 py-2 pt-8">
      <div className=" w-[100px] lg:w-[150px]  float-start ">
        <img src={logo} alt="logo image" />
      </div>
      <div className=" text-xl text-white float-end flex flex-col items-center">
        <FaUserCircle size={50} color="black" />
        {userName}
      </div>
    </div>
  );
}

export default Header;

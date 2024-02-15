import React, { useContext } from "react";
import logo from "../../assets/chatroom.png";
import { FaUserCircle } from "react-icons/fa";
import { SocketContext } from "../../Context/SocketContext";

function Header() {
  const { userName } = useContext(SocketContext);

  return (
    <div className=" top-0 inline-block w-full p-10 py-2 pt-8">
      <div className=" w-[100px] lg:w-[200px]  float-start lg:p-0 pt-[15px] ">
        <img src={logo} alt="logo image" />
      </div>
      <div className=" text-xl text-black float-end flex flex-col items-center w-4 px-7 drop-shadow-2xl">
        <FaUserCircle size={40} color="black" />
        {userName}
      </div>
    </div>
  );
}

export default Header;

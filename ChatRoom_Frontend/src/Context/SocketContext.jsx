import { createContext, useEffect, useState } from "react";
import {io} from 'socket.io-client';


export const SocketContext = createContext(null);

export const SocketProvider = (props) => {

    // const BASE_URL = "https://chatroom-backend-2v7s.onrender.com";
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    console.log(BASE_URL);

    const socket = io(BASE_URL);
    const [userName, setUserName] = useState('');

    return (
        <SocketContext.Provider value={{
            userName,
            setUserName,
            socket
        }}>
            {props.children}
        </SocketContext.Provider>
    )
}
import { createContext, useState } from "react";
import {io} from 'socket.io-client';

export const SocketContext = createContext(null);

export const SocketProvider = (props) => {

    const BASE_URL = "http://localhost:3000";

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
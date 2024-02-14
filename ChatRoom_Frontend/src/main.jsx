import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AuthPage from './components/Auth/AuthPage.jsx'
import ChatRoom from './components/ChatRoom/ChatRoom.jsx'
import { SocketProvider } from './Context/SocketContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<AuthPage/>}/>
      <Route path='/chatroom' element={<ChatRoom/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <SocketProvider>
      <RouterProvider router={router}/>
    </SocketProvider>
)

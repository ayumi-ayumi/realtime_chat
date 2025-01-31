import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client'
import Home from './pages/home';
import Chat from './pages/chat';
import { Login_user } from './type/type';
// import './App.css';

const socket = io('http://localhost:3000');

export default function App() {
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  useEffect(() => {
    const user: Login_user = JSON.parse(localStorage.getItem('login_user') || "null");
    setUsername(user?.username)
    setRoom(user?.room)
  }, []);

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={
            <Home
              username={username}
              setUsername={setUsername}
              room={room}
              setRoom={setRoom}
              socket={socket} />}
          />
          <Route
            path='/chat/:room'
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

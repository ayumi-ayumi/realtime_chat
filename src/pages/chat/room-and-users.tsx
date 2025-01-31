import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../type/type';
import styles from './styles.module.css';

type Props = {
  username: string, 
  room:string, 
  socket:any
}

export default function RoomAndUsers ({ username, room, socket }: Props)  {
  const [roomUsers, setRoomUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('chatroom_users', (data: User[]) => {
      setRoomUsers(data);
    });

    return () => socket.off('chatroom_users');
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    localStorage.removeItem('login_user');
    navigate('/', { replace: true });
  };

  return (
    <div className='border-r border-solid border-slate-300 pr-3'>
      <h2 className='mb-16 uppercase text-3xl text-indigo-500'>{room}</h2>

      <div>
        {roomUsers.length > 0 && <h5 className='text-xl text-indigo-500'>Users:</h5>}
        <ul className='list-none pl-0 mb-16 bg-indigo-300'>
          {roomUsers.map((user) => (
            <li
              className={`mb-2 ${user.username === username ? 'font-black' : 'font-normal'}`}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className='btn btn-outline' onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};

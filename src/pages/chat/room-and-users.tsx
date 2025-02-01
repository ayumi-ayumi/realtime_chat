import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../type/type';

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
    <div className='bg-slate-300 relative'>
      <h2 className='mb-16 p-1.5 uppercase text-3xl text-center mx-auto text-indigo-500'>{room}</h2>

      <div>
        {roomUsers.length > 0 && <h5 className='text-xl text-indigo-500 pl-2'>Users:</h5>}
        <ul className='list-none pl-0 mb-16 bg-indigo-300'>
          {roomUsers.map((user) => (
            <li
              className={`mb-2 pl-2 ${user.username === username ? 'font-black' : 'font-normal'}`}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className='rounded-none text-slate-100 bg-indigo-500 p-3.5 font-bold text-base cursor-pointer border-none absolute bottom-0 w-full transition duration-200 hover:bg-indigo-700 ' onClick={leaveRoom}>
        Leave
        <i className="fa-solid fa-right-from-bracket pl-3"></i>
      </button>
    </div>
  );
};

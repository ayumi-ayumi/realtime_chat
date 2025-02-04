import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../type/type';

type Props = {
  username: string,
  room: string,
  socket: any
}

export default function RoomAndUsers({ username, room, socket }: Props) {
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
    <div className='h-[10%] sm:h-full grid grid-cols-[7fr_1fr] grid-rows-2 sm:block bg-slate-200 relative'>
      <h2 className='text-left sm:text-center sm:mb-16 sm:text-3xl p-1.5 uppercase text-indigo-500'>{room}</h2>

      <div className='col-start-1 row-start-2'>
        {roomUsers.length > 0 && <h5 className='hidden sm:block text-xl text-indigo-500 pl-2'>Users:</h5>}
        <ul className='list-none pl-0'>
          {roomUsers.map((user) => (
            <li
              className={'px-2 mr-2 sm:mr-0 sm:mb-1 inline bg-indigo-300 sm:block'}
              key={user.id}
            >
              {user.username === username ? 'Me' : user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className='row-[1_/_span_2] col-start-2 rounded-none text-slate-100 bg-indigo-500 p-3.5 text-base cursor-pointer border-none sm:absolute bottom-0 w-full transition duration-200 sm:hover:bg-indigo-700' onClick={leaveRoom}>
        <span className='hidden sm:inline-block '>Leave</span>
        <i className="fa-solid fa-right-from-bracket p-4 sm:pl-3 hover:bg-indigo-400 sm:hover:bg-indigo-700 transition duration-200 rounded-3xl"></i>
      </button>
    </div>
  );
};

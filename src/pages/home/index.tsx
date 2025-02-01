import { useNavigate } from 'react-router-dom';

type Props = {
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  room: string,
  setRoom: React.Dispatch<React.SetStateAction<string>>,
  socket: any
}

export default function Home({ username, setUsername, room, setRoom, socket }: Props) {
  const navigate = useNavigate();

  const rooms = [
    { value: 'introduce yourself', name: 'Introduce Yourself' },
    { value: 'technology talk', name: 'Technology Talk' },
    { value: 'coding help', name: 'Coding Help' },
    { value: 'career advice', name: 'Career Advice' },
  ]

  function joinRoom() {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
    }
    localStorage.setItem('login_user', JSON.stringify({ username, room }));
    navigate(`/chat/${room}`, { replace: true });
  };

  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-indigo-800'>
      <div className='w-auto my-0 mx-auto p-12 bg-indigo-50 rounded-md flex flex-col items-center gap-7 shadow-2xl shadow-slate-900'>
        <h1 className='text-4xl leading-tight tracking-tight'>
        <i className="fa-regular fa-comments mr-3"></i>
          Community chat</h1>
        <input
          className='input'
          placeholder='Username...'
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          className='input'
          onChange={(e) => setRoom(e.target.value)}
        >
          <option>-- Select Room --</option>
          {rooms.map(room => (
            <option value={room.value} key={room.value} className='mt-5'>{room.name}</option>
          ))}
        </select>

        <button
          className='btn btn-secondary w-full hover:bg-indigo-700'
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};
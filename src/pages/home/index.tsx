import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

type Props = {
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  room: string,
  setRoom: React.Dispatch<React.SetStateAction<string>>,
  socket: any
}

export default function Home({ username, setUsername, room, setRoom, socket }: Props) {
  const navigate = useNavigate();

  function joinRoom() {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
    }
    localStorage.setItem('login_user', JSON.stringify({ username, room }));
    navigate(`/chat/${room}`, { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input
          className={styles.input}
          placeholder='Username...'
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option>-- Select Room --</option>
          <option value='javascript'>JavaScript</option>
          <option value='node'>Node</option>
          <option value='express'>Express</option>
          <option value='react'>React</option>
        </select>

        <button
          className='btn btn-secondary'
          style={{ width: '100%' }}
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};
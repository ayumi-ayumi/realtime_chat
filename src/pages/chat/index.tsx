import RoomAndUsersColumn from './room-and-users'; 
import MessagesReceived from './messages';
import SendMessage from './send-message';
import styles from './styles.module.css';

type Props = {
  username: string,
  room: string,
  socket: any
}

export default function Chat({ username, room, socket }: Props) {
  return (
    <div className='max-w-screen-lg my-0 mx-auto grid gap-6' style={{gridTemplateColumns: '1fr 4fr'}}>
      <RoomAndUsersColumn socket={socket} username={username} room={room} />

      <div>
        <MessagesReceived socket={socket} username={username} room={room} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

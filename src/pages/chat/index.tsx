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
    <div className={styles.chatContainer}>
      <RoomAndUsersColumn socket={socket} username={username} room={room} />

      <div>
        <MessagesReceived socket={socket} room={room} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

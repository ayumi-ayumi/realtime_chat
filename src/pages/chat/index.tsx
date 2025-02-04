import RoomAndUsersColumn from './room-and-users'; 
import MessagesReceived from './messages';
import SendMessage from './send-message';

type Props = {
  username: string,
  room: string,
  socket: any
}

export default function Chat({ username, room, socket }: Props) {
  return (
    <div className='sm:grid sm:grid-cols-[1fr_3fr] bg-slate-50 h-full'>
      <RoomAndUsersColumn socket={socket} username={username} room={room} />

      <div className='h-[90%] sm:h-full flex flex-col justify-between'>
        <MessagesReceived socket={socket} username={username} room={room} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

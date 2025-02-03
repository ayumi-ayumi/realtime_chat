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
    <div className='h-full grid bg-slate-50' style={{gridTemplateColumns: '1fr 3fr'}}>
      <RoomAndUsersColumn socket={socket} username={username} room={room} />

      <div className='flex flex-col justify-between'>
        <MessagesReceived socket={socket} username={username} room={room} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

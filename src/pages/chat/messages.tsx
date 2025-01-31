import { useState, useEffect, useRef } from 'react';
import chatApi from '../../api/chat';
import { Message } from '../../type/type';
import styles from './styles.module.css';

type Props = {
  socket: any,
  username: string,
  room: string,
}

export default function Messages ({ socket, room, username }: Props)  {
  const [messagesRecieved, setMessagesReceived] = useState<Message[]>([]);

  const messagesColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('receive_message', (data: Message) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

  // useEffect(() => {
  //   socket.on('messagesOnDB', (messages:Message[]) => {
  //     setMessagesReceived((state) => [...messages, ...state]);
  //   });

  //   return () => socket.off('messagesOnDB');
  // }, [socket]);

  useEffect(() => {
    async function fetchData() {
      const messagesOnDB = await chatApi.getAll(room)
      setMessagesReceived((state) => [...messagesOnDB, ...state])
    }
    fetchData();
  }, [socket]);

  useEffect(() => {
    if (!messagesColumnRef.current) return;
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  function formatDateFromTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className='h-[80vh] overflow-auto py-2.5 pb-2.5 px-10' ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        // <div className='bg-indigo-800 rounded-md mb-6 max-w-xl p-3 w-4/5' key={i}>
        <div className={`rounded-md mb-6 max-w-xl p-3 w-4/5 ${msg.username === username ? 'ml-auto bg-indigo-800' : 'bg-slate-300'}`} key={i}> 
          <div className='flex justify-between'>
            <span className={`${msg.username === username ? 'msgMeta-receiver' : 'msgMeta-sender'}`}>{msg?.username}</span>
            <span className={`${msg.username === username ? 'msgMeta-receiver' : 'msgMeta-sender'}`}>
              {formatDateFromTimestamp(msg?.__createdtime__)}
            </span>
          </div>
          <p className={`${msg.username === username ? 'text-white' : 'text-indigo-900'}`}>{msg?.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

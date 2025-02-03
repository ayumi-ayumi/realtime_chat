import { useState, useEffect, useRef } from 'react';
import chatApi from '../../api/chat';
import { Message } from '../../type/type';

type Props = {
  socket: any,
  username: string,
  room: string,
}

export default function Messages({ socket, room, username }: Props) {
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
  }, []);

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
        <div key={i}>
          <div className={`flex flex-col ${msg.username === username ? 'items-end' : ''}`}>
            <span className='text-xs'>{msg?.username}</span>
            <p className={`rounded-md max-w-xl p-3 w-4/5 text-indigo-900 ${msg.username === username ? 'ml-auto bg-indigo-800 text-white' : 'bg-slate-300'}`}>{msg?.message}</p>
            <span className='text-xs'>{formatDateFromTimestamp(msg?.__createdtime__)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

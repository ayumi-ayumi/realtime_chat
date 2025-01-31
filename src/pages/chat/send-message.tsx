import React, { useState } from 'react';
import chatApi from '../../api/chat';
import styles from './styles.module.css';

type Props = {
  username: string,
  room: string,
  socket: any
}

export default function SendMessage({ username, room, socket }: Props) {
  const [message, setMessage] = useState<string>('');

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();

      socket.emit('send_message', { username, room, message, __createdtime__ });
      chatApi.post({ username, room, message, __createdtime__ })
      setMessage('');
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") sendMessage();
  };

  return (
    <div className='pt-4 pb-5 px-10 flex relative'>
      <input
        className='p-3.5 w-full rounded-md border border-solid border-indigo-300 text-sm '
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyDown={handleKey}
      />
      <button className='absolute right-[8%] top-[25%] p-1.5 bg-indigo-300 rounded-full' onClick={sendMessage}>
        <img src='/send_icon.png' alt='send icon' className='h-7 w-7 rotate-[315deg]'/>
      </button>
    </div>
  );
};


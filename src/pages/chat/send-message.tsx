import React, { useState } from 'react';
import chatApi from '../../api/chat';

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
    <div className='pt-4 pb-5 px-10 relative bg-white'>
      <input
        className='p-3.5 w-full text-sm outline-none'
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyDown={handleKey}
      />
      <button className='absolute right-[8%] top-[25%] p-3 bg-white rounded-full transition duration-200 hover:bg-indigo-400 hover:shadow-[inset_0px_0px_7px_0px_white]' onClick={sendMessage}>
        <i className="fa-solid fa-paper-plane fa-xl "></i>
      </button>
    </div>
  );
};


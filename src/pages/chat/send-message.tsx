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
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyDown={handleKey}
      />
      <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};


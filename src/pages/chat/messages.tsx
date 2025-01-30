import { useState, useEffect, useRef } from 'react';
import chatApi from '../../api/chat';
import { Message } from '../../type/type';
import styles from './styles.module.css';

type Props = {
  room: string,
  socket: any
}

export default function Messages ({ room, socket }: Props)  {
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
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg?.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg?.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg?.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

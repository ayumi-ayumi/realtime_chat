import chatApi from '../../api/chat';
import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';

const Messages = ({ socket, room }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null); 

  console.log(room)


  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });


    // Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    async function fetchData() {
      const messagesOnDB = await chatApi.getAll(room)
      // console.log(messagesOnDB)
      // return messagesOnDB
      setMessagesReceived((state) => [...messagesOnDB, state])
    }
    fetchData();
    // return () => {

    // };
  }, [socket]);

  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;
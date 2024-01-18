import { useParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Client } from '../../models/Client';
import './WorkerStyles.scss';

const socketUrl = import.meta.env.VITE_REACT_APP_API_SOCKET_URL;

const QueueWatchComponent = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const { queueId } = useParams();

  useEffect(() => {
    const socket = io(socketUrl, {
      query: {
        queueId: queueId,
      }
    });
    setSocket(socket);

    socket.on('queue_update', (clients: Client[]) => {
      console.log(clients)

      const limitedClients = clients.slice(0, 25);

      setClients(limitedClients);
    });

    return () => {
      if (socket) {
        console.log('disconnect')
        socket.disconnect();
      }
    };
  }, [queueId]);

  return (
    <div className='queue-watch'>
      {clients.map((client, index) => (
        <div className='number' key={index}>
          <>{client.assignedNumber}</>
        </div>
      ))}
    </div>
  );
};
  
export default QueueWatchComponent;
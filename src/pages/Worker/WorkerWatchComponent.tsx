import { useParams } from 'react-router-dom';
import './WorkerStyles.scss';
import { Socket, io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Client } from '../../models/Client';

const WorkerWatchComponent = () => {
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const { workerId } = useParams();

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      query: {
        workerToWatchId: workerId,
      },
      withCredentials: true
    });
    setSocket(socket);

    socket.on('worker_update', (currentClient: Client | null) => {
      console.log(currentClient);
      setCurrentClient(currentClient);
    });

    return () => {
      if (socket) {
        console.log('disconnect')
        socket.disconnect();
      }
    };
  }, [workerId]);

  return (
    <div className='worker-watch'>
      {currentClient ? (
      <>
        <a>Current client:</a>
        <a className='number'>{currentClient.assignedNumber}</a>
      </>
    ) : (
      <p>Waiting...</p>
    )}
    </div>
  );
};
  
export default WorkerWatchComponent;
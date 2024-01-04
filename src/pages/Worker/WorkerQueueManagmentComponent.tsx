import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Client } from '../../models/Client';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';

const WorkerQueueManagmentComponent: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const { queueId } = useParams();
  const { user } = useUser();

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io('http://localhost:3000', {
      query: {
        queueId: queueId,
      }
    });
    setSocket(socket);

    console.log(socket)

    // Event listener for receiving clients from the server
    socket.on('on_connect', (newClients: Client[]) => {
      console.log(newClients)
      setClients(newClients);
    });

    socket.on('new_client_added', (newClient: Client) => {
      console.log(newClient)
      setClients(prevClients => [...prevClients, newClient]);
    })

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket) {
        console.log('disconnect')
        socket.disconnect();
      }
    };
  }, [queueId]); // Only run this effect on mount and unmount

  return (
    <div>
      <h3>Clients</h3>
      <div className='client-list'>
        {clients.map(client => (
          <div key={client._id}>{client.assignedNumber}</div>
        ))}
      </div>
    </div>
  );
};

export default WorkerQueueManagmentComponent;

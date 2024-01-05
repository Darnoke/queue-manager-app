import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Client } from '../../models/Client';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { Button } from '@mui/material';
import { ClientStatus } from '../../enums/ClientStatus';

const WorkerQueueManagmentComponent: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const { queueId } = useParams();
  const { user } = useUser();

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io('http://localhost:3000', {
      query: {
        queueId: queueId,
        userId: user._id
      },
      withCredentials: true
    });
    setSocket(socket);

    // Event listener for receiving clients from the server
    socket.on('on_connect', (newClients: Client[]) => {
      console.log(newClients)
      setClients(newClients);
    });

    socket.on('queue_update', (clients: Client[]) => {
      console.log(clients)
      setClients(clients);
    });

    socket.on('worker_update', (currentClient: Client | null) => {
      console.log(currentClient);
      setCurrentClient(currentClient);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket) {
        console.log('disconnect')
        socket.disconnect();
      }
    };
  }, [queueId]); // Only run this effect on mount and unmount

  const takeClient = (client: Client) => {
    socket?.emit('take_client', client._id);
  }

  const cancelClient = () => {
    socket?.emit('cancel_client', currentClient?._id);
  }

  const finishClient = () => {
    socket?.emit('finish_client', currentClient?._id);
  }

  const isTakeDisabled = () => {
    return !!currentClient;
  }

  return (
    <div className='managment-container'>
      <div className='container-50'>
        <h3>Clients</h3>
        <table className='client-list'>
          <thead>
          <tr>
            <th>
              Num
            </th>
            <th>
              Category
            </th>
            <th>
              Created at
            </th>
            <th>
              Status
            </th>
          </tr>
          </thead>
          <tbody>
          {clients.map(client => (
            <tr key={client._id}>
              <td>{client.assignedNumber}</td>
              <td>{client.category.name}</td>
              <td>{new Date(client.createdAt).toLocaleTimeString()}</td>
              <td>{client.status}</td>
              <td>{client.status === ClientStatus.Waiting && <Button onClick={() => takeClient(client)} disabled={isTakeDisabled()} className='take-button'>Take</Button>}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className='container-50'> 
        <h3>Current Client: {currentClient?.assignedNumber || 'none'}</h3>
        {currentClient && ( <>
        <p>Category: {currentClient.category.name}</p>
        <p>Created at: {new Date(currentClient.createdAt).toLocaleTimeString()}</p>
        <div className='buttons-box'>
          <Button onClick={cancelClient}>Cancel</Button>
          <Button onClick={finishClient}>Finish</Button>
        </div>
        </>)}
      </div>
    </div>
  );
};

export default WorkerQueueManagmentComponent;

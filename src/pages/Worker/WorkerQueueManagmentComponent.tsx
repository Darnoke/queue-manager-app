import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Client } from '../../models/Client';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { Button } from '@mui/material';
import { CategoryStatus } from '../../enums/CategoryStatus';
import { ClientStatus } from '../../enums/ClientStatus';
import TimeCounter from './TimeCounterComponent';

const WorkerQueueManagmentComponent: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [workerId, setWorkerId] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<string>('');

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
    socket.on('on_connect', (workerId: string) => {
      setWorkerId(workerId);
      setCurrentClient(null);
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy text');
    }
    setTimeout(() => {
      setCopySuccess('');
    }, 3000);
  };

  const themeColor = {
    [CategoryStatus.Good]: 'good-theme',
    [CategoryStatus.Medium]: 'medium-theme',
    [CategoryStatus.Bad]: 'bad-theme',
  };

  return (
    <div className='managment-container'>
      <div className='container-50'>
        <Button onClick={() => copyToClipboard(`http://localhost:4000/watch/worker/${workerId}`)}>
          Copy Screen Link
        </Button>
        <h3>Clients</h3>
        {copySuccess}
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
              Time passed
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
              <td className={themeColor[client?.categoryStatus || 'medium']}>{client.category.name}</td>
              <td><TimeCounter createdAt={client.createdAt} /></td>
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

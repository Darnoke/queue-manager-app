import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Client } from '../../models/Client';
import { useParams } from 'react-router-dom';

const WorkerQueueManagmentComponent: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const { queueId } = useParams();
  const { user } = useUser();

  useEffect(() => {

  }, []);

  return (
    <div>
      <h3>Clients</h3>
      <div className='client-list'>
      </div>
    </div>
  );
};

export default WorkerQueueManagmentComponent;

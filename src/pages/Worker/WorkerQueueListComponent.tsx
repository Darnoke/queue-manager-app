import React, { useEffect, useState } from 'react';
import { QueueList } from '../../models/QueueList';
import { useUser } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

const WorkerQueueListComponent: React.FC = () => {
  const [queues, setQueues] = useState<QueueList[]>([]);

  const { user, axiosInstance } = useUser();

  useEffect(() => {
    fetchQueues();
  }, []);

  const fetchQueues = async () => {
    try {
      const response = await axiosInstance.get(`/worker/queues/${user._id}`);
      const data = response.data;
      setQueues(data);
    } catch (error: any) {
      console.error('Error fetching queues data:', error.response.data);
    }
  };

  return (
    <div>
      <h3>Queues List</h3>
      <div className='queue-list'>
        {queues.map((queue) => (
          <Link key={queue._id} to={`/worker/${queue._id}`}>{queue.name}</Link>
        ))}
      </div>
    </div>
  );
};

export default WorkerQueueListComponent;

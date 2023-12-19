import { Button } from '@mui/material';
import './AdminQueueEditStyles.scss';
import ConfirmationDialog from '../../dialogs/ConfirmationDialog';
import { useEffect, useState } from 'react';
import { QueueList } from '../../models/QueueList';
import CreateQueueDialog from '../../dialogs/CreateQueueDialog';
import EditQueueDialog from '../../dialogs/EditQueueDialog';
import AdminQueueEditorComponent from './AdminQueueEditorComponent';

const AdminQueueEditComponent = () => {
  const [queueData, setQueueData] = useState<QueueList[]>([]);
  const [isCreateQueueDialogOpen, setIsCreateQueueDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedQueue, setSelectedQueue] = useState({} as QueueList);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const fetchQueueData = async () => {
    try {
      const response = await fetch(apiUrl + '/admin/queues', {credentials: 'include'});
      const data = await response.json();
      setQueueData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const deleteQueue = async (queue_id: string) => {
    try {
      setSelectedQueue({} as QueueList);
      const response = await fetch(apiUrl + '/admin/queues/' + queue_id, {method: 'DELETE', credentials: 'include'});

      if (response.ok) {
        fetchQueueData();
      }
    } catch (error) { 
      console.error('Error while deleting user:', error);
    }
  }

  useEffect(() => {
    // Use an IIFE (Immediately Invoked Function Expression) to define the async function
    (async () => {
      await fetchQueueData();
    })();
  }, []);

  const openCreateQueueDialog = () => {
    setIsCreateQueueDialogOpen(true);
  }

  const onEditQueue = (queue: QueueList) => {
    setSelectedQueue(queue);
    setIsEditDialogOpen(true);
  }

  const onDeleteQueue = (queue: QueueList) => {
    setSelectedQueue(queue);
    setIsConfirmDialogOpen(true);
  }

  const onDeleteDialogClose = (answer: boolean) => {
    setIsConfirmDialogOpen(false);
    if (answer) deleteQueue(selectedQueue._id);
  } 

  const onEditDialogClose = (refresh: boolean) => {
    setIsEditDialogOpen(false);
    if (refresh) fetchQueueData();
  }

  const onCreateQueueClose = (created: boolean) => {
    setIsCreateQueueDialogOpen(false);
    if (created) fetchQueueData();
  }



  return (
    <><div className='admin-queue-edit'>
      <div className='table-container'>
        <Button variant="contained" onClick={openCreateQueueDialog} fullWidth>Add queue</Button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {queueData.map((queue) => (
              <tr key={queue._id}>
                <td>{queue.name}</td>
                <td><Button onClick={() => onEditQueue(queue)}>Edit</Button></td>
                <td><Button onClick={() => onDeleteQueue(queue)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminQueueEditorComponent queueList={queueData}/> 
    </div>
    <CreateQueueDialog open={isCreateQueueDialogOpen} onClose={(created: boolean) => onCreateQueueClose(created)}/>
    <ConfirmationDialog open={isConfirmDialogOpen} onClose={(answer: boolean) => onDeleteDialogClose(answer)} messageInput={'Delete queue: ' + selectedQueue.name + '?'} />
    <EditQueueDialog open={isEditDialogOpen} onClose={(refresh: boolean) => onEditDialogClose(refresh)} queueInput={selectedQueue}/>
    </>
  );
};
  
export default AdminQueueEditComponent;
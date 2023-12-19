import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { QueueList } from '../models/QueueList';

interface EditUserDialogProps {
  open: boolean;
  onClose: (refresh: boolean) => void;
  queueInput: QueueList;
}

const EditQueueDialog: React.FC<EditUserDialogProps> = ({ open, onClose, queueInput }) => {
  const [queue, setQueue] = useState<QueueList>({} as QueueList);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    setQueue(queueInput);
  }, [queueInput]);

  const handleEdit = async () => {
    try {
      setError('');
      const response = await fetch(apiUrl + '/admin/queues/' + queue._id, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify( { name: queue.name } ),
        credentials: 'include',
      });
      if (response.ok) {
        onClose(true);
      } else {
        setError(await response.text());
        console.error('Edit failed:', response.statusText);
      }
    } catch (error) {
        console.error('Error during registration:', error);
      }
  };

  const closeDialog = () => {
    setError('');
    onClose(false)
  }


  return (
    <Dialog open={open} onClose={closeDialog}>
    <DialogTitle>Edit Queue</DialogTitle>
    <DialogContent>
      <TextField
      label="Name"
      type="text"
      fullWidth
      margin="normal"
      variant="outlined"
      value={queue?.name}
      onChange={(e) => setQueue({...queue, name: e.target.value })}
      />
      <br />
      <a className='error'>{error}</a>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeDialog}>Cancel</Button>
      <Button onClick={handleEdit} color="primary">
        Update
      </Button>
    </DialogActions>
  </Dialog>
  );
};

export default EditQueueDialog;

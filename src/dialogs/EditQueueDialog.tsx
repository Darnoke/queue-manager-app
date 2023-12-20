import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { QueueList } from '../models/QueueList';
import { useUser } from '../contexts/UserContext';

interface EditUserDialogProps {
  open: boolean;
  onClose: (refresh: boolean) => void;
  queueInput: QueueList;
}

const EditQueueDialog: React.FC<EditUserDialogProps> = ({ open, onClose, queueInput }) => {
  const [queue, setQueue] = useState<QueueList>({} as QueueList);
  const [error, setError] = useState('');

  const {axiosInstance} = useUser();

  useEffect(() => {
    setQueue({...queueInput});
  }, [queueInput]);

  const handleEdit = async () => {
    try {
      setError('');
      await axiosInstance.put('/admin/queues/' + queue._id, { name: queue.name });
      onClose(true);
    } catch (error: any) {
      setError(error.response.data)
      console.error('Error during registration:', error.response.data);
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
      value={queue.name || ''}
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

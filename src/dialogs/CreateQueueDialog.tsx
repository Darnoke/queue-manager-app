import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axiosInstance from '../services/AxiosInstance';

interface CreateQueueDialogProps {
  open: boolean;
  onClose: (created: boolean) => void;
}

const CreateQueueDialog: React.FC<CreateQueueDialogProps> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = async () => {
    try {
      setError('');
      await axiosInstance.post('/admin/queues', { name });
      onClose(true);
    } catch (error: any) {
      setError(error.response.data);
      console.error('Error during registration:', error.response.data);
    }
  };

  useEffect(() => {
    setName('');
    setError('');
  }, [open]);

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Create Queue</DialogTitle>
      <DialogContent>
        <TextField
        label="Name"
        type="text"
        fullWidth
        margin="normal"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <br />
        <a className='error'>{error}</a>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateQueueDialog;

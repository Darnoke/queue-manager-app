import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useUser } from '../contexts/UserContext';

interface CreateCategoryDialogProps {
  open: boolean;
  queueId: string;
  onClose: (created: boolean) => void;
}

const CreateCategoryDialog: React.FC<CreateCategoryDialogProps> = ({ open, queueId, onClose }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const {axiosInstance} = useUser();

  const handleCreate = async () => {
    try {
      setError('');
      await axiosInstance.post('/admin/queues/' + queueId + '/categories', { name }); 
      onClose(true);
    } catch (error: any) {
      setError(error.response.data)
      console.error('Error during registration:', error.response.data);
    }
  };

  useEffect(() => {
    setName('');
    setError('');
  }, [open]);

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Create Category</DialogTitle>
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

export default CreateCategoryDialog;

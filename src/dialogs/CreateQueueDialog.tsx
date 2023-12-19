import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

interface CreateNameDialogProps {
  open: boolean;
  onClose: (created: boolean) => void;
}

const CreateNameDialog: React.FC<CreateNameDialogProps> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


  const handleCreate = async () => {
    try {
      setError('');
      const response = await fetch(apiUrl + '/admin/queues', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
        credentials: 'include',
      });
      if (response.ok) {
        onClose(true);
      } else {
        setError(await response.text());
        console.error('Register failed:', response.statusText);
      }
    } catch (error) {
        console.error('Error during registration:', error);
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

export default CreateNameDialog;

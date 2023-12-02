import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: (answer: boolean) => void;
  messageInput: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onClose, messageInput = '' }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(messageInput);
  }, [open]);


  return (
    <Dialog open={open}>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button onClick={() => onClose(true)} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
  oldPassword?: string;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ open, onClose, oldPassword = '' }) => {
  const [newPassword, setNewPassword] = useState('');
  const [firstTime, setFirstTime] = useState(false);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    if (oldPassword && oldPassword !== '') setFirstTime(true);
  }, [open]);

  const handleSave = async () => {
    try {
      const response = await fetch(apiUrl + '/auth/change-password', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
        credentials: 'include',
      });
      if (response.ok) {
        onClose();
      } else {
        setError(await response.text());
        console.error('Password change failed:', response.statusText);
      }
    } catch (error) {
        console.error('Error during changing password:', error);
      }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        {!firstTime && (
            <TextField
            label="Old Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={oldPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            />
        )}
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <br />
        <a className='error'>{error}</a>
      </DialogContent>
      <DialogActions>
      {!firstTime && (
        <Button onClick={onClose}>Cancel</Button>
      )}
        <Button onClick={handleSave} color="primary">
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;

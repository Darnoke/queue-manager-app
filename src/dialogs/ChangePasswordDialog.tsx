import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axiosInstance from '../services/AxiosInstance';

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
      setError('');
      const response = await axiosInstance.post(apiUrl + '/auth/change-password', { oldPassword, newPassword });
      onClose();
    } catch (error: any) {
      setError(error.response.data);
      console.error('Error during changing password:', error.response.data);
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

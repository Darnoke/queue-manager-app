import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, TextField, MenuItem } from '@mui/material';
import { User } from '../models/User';
import { UserRole } from '../enums/UserRole';
import axiosInstance from '../services/AxiosInstance';

interface EditUserDialogProps {
  open: boolean;
  onClose: (refresh: boolean) => void;
  userInput: User;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ open, onClose, userInput }) => {
  const [user, setUser] = useState<User>({} as User);
  const [error, setError] = useState('');

  useEffect(() => {
    setUser({...userInput});
  }, [userInput]);

  const handleEdit = async () => {
    try {
      setError('');
      await axiosInstance.put('/admin/users/' + user._id, {...user});
      onClose(true);
    } catch (error: any) {
      setError(error.response.data);
      console.error('Error during registration:', error.response.data);
    }
  };

  const closeDialog = () => {
    setError('');
    onClose(false)
  }


  return (
    <Dialog open={open} onClose={closeDialog}>
    <DialogTitle>Edit User</DialogTitle>
    <DialogContent>
      <TextField
      label="Username"
      type="text"
      fullWidth
      margin="normal"
      variant="outlined"
      value={user.username || ''}
      onChange={(e) => setUser({...user, username: e.target.value})}
      />
      <Select
        label="Role"
        fullWidth
        margin="none"
        variant="outlined"
        value={user.role || UserRole.None}
        onChange={(e) => setUser({...user, role: e.target.value as UserRole})}
      >
        {Object.values(UserRole).map((userRole) => (
          <MenuItem key={userRole} value={userRole}>
            {userRole}
          </MenuItem>
        ))}
      </Select>
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

export default EditUserDialog;

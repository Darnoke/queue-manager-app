import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from '@mui/material';
import { UserRole } from '../enums/UserRole';
import { useUser } from '../contexts/UserContext';

interface CreateUserDialogProps {
  open: boolean;
  onClose: (created: boolean) => void;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ open, onClose }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(UserRole.Worker);
  const [error, setError] = useState('');

  const {axiosInstance} = useUser();

  const handleCreate = async () => {
    try {
      setError('');
      await axiosInstance.post('/admin/users/register', { username, role });
      onClose(true);
    } catch (error: any) {
      setError(error.response.data)
      console.error('Error during registration:', error.response.data);
    }
  };

  useEffect(() => {
    setUsername('');
    setRole(UserRole.None);
    setError('');
  }, [open]);

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <TextField
        label="Username"
        type="text"
        fullWidth
        margin="normal"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <Select
          label="Role"
          fullWidth
          margin="none"
          variant="outlined"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
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
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;

import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from '@mui/material';
import { UserRole } from '../enums/UserRole';

interface CreateUserDialogProps {
  open: boolean;
  onClose: (created: boolean) => void;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ open, onClose }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(UserRole.Client);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


  const handleCreate = async () => {
    try {
        const response = await fetch(apiUrl + '/admin/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, role }),
            credentials: 'include',
        });
        if (response.ok) {
            onClose(true);
        } else {
            console.error('Register failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error during registration:', error);
      }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Change Password</DialogTitle>
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
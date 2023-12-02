import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, TextField, MenuItem } from '@mui/material';
import { User } from '../models/User';
import { UserRole } from '../enums/UserRole';

interface EditUserDialogProps {
  open: boolean;
  onClose: (refresh: boolean) => void;
  userInput: User;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ open, onClose, userInput }) => {
  const [user, setUser] = useState<User>({} as User);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    setUser({...userInput});
  }, [open]);

  const handleEdit = async () => {
    try {
        setError('');
        const response = await fetch(apiUrl + '/admin/users/' + user.username, {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify( {...user} ),
          credentials: 'include',
        });
        if (response.ok) {
          onClose(true);
        } else {
          setError(await response.text());
          console.error('Edit failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error during registration:', error);
      }
  };


  return (
    <Dialog open={open} onClose={() => onClose(false)}>
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
      disabled={true}
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
      <Button onClick={() => onClose(false)}>Cancel</Button>
      <Button onClick={handleEdit} color="primary">
        Update
      </Button>
    </DialogActions>
  </Dialog>
  );
};

export default EditUserDialog;

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
  const [error, setError] = useState<string | undefined>('');
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [userCreated, setUserCreated] = useState<boolean>(false);

  const {axiosInstance} = useUser();

  const handleCreate = async () => {
    try {
      setError('');
      const response = await axiosInstance.post('/admin/users/register', { username, role });
      const data = response.data;
      if (data.generatedPassword) {
        setUserCreated(true);
        setGeneratedPassword(data.generatedPassword);
      } 
    } catch (error: any) {
      setError(error?.response?.data)
      console.error('Error during registration:', error?.response?.data);
    }
  };

  useEffect(() => {
    setUserCreated(false);
    setUsername('');
    setRole(UserRole.None);
    setError('');
    setGeneratedPassword('');
  }, [open]);

  return (
    <Dialog open={open} onClose={() => onClose(userCreated)}>
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
        {userCreated && (
          <a>User created, password: {generatedPassword}</a>)}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(userCreated)}>{userCreated ? 'Close' : 'Cancel'}</Button>
        {!userCreated && (<Button onClick={handleCreate} color="primary">
          Create
        </Button>)}
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;

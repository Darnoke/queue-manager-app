import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { TextField, Button } from '@mui/material';
import ChangePasswordDialog from '../dialogs/ChangePasswordDialog';
import './LoginComponentStyles.scss';

const LoginComponent = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChangePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(apiUrl + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.changePassword) {
          setChangePasswordDialogOpen(true);
        } else {
          login();
        }
      } else {
        setError(await response.text());
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const onClose = () => {
    setChangePasswordDialogOpen(false);
    login();
  }

  return (
    <>
    <div className='login-component'>
      <h2>Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <br />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
        <br />
        <br />
        <a className='error'>{error}</a>
      </form>
    </div>
    <ChangePasswordDialog open={isChangePasswordDialogOpen} onClose={onClose} oldPassword={password}/>
    </>
  );
};

export default LoginComponent;

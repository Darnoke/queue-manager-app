import { useState, useEffect } from 'react';
import { User } from '../models/User';
import './AdminUserTableStyles.scss';
import { Button } from '@mui/material';
import CreateUserDialog from '../dialogs/CreateUserDialog';
import ConfirmationDialog from '../dialogs/ConfirmationDialog';

const AdminUserTable = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const fetchUserData = async () => {
    try {
      const response = await fetch(apiUrl + '/admin/users', {credentials: 'include'});
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  }

  const deleteUser = async (username: string) => {
    try {
      setSelectedUser('');
      const response = await fetch(apiUrl + '/admin/users/' + username, {method: 'DELETE', credentials: 'include'});

      if (response.ok) {
        fetchUserData();
      }
    } catch (error) { 
      console.error('Error while deleting user:', error);
    }
  }

  useEffect(() => {
    // Use an IIFE (Immediately Invoked Function Expression) to define the async function
    (async () => {
      await fetchUserData();
    })();
  }, []);

  const onCreateUserClose = (created: boolean) => {
    setIsCreateUserDialogOpen(false);
    if (created) fetchUserData();
  }

  const openCreateUserDialog = () => {
    setIsCreateUserDialogOpen(true);
  }

  const deleteDialogCallback = (answer: boolean) => {
    setIsConfirmDialogOpen(false);
    if (answer) deleteUser(selectedUser);
  }

  const onDeleteUser = (username: string) => {
    setSelectedUser(username);
    setIsConfirmDialogOpen(true);
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <><div className='admin-users-content'>
            <Button variant="contained" onClick={openCreateUserDialog}>Add user</Button>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user.username}>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td><Button onClick={() => onDeleteUser(user.username)}>Delete</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CreateUserDialog open={isCreateUserDialogOpen} onClose={(param: boolean) => onCreateUserClose(param)}/>
          <ConfirmationDialog open={isConfirmDialogOpen} onClose={(answer: boolean) => deleteDialogCallback(answer)} messageInput={'Delete user: ' + selectedUser + '?'}/>
          </>
      )}
    </div>
  );
};

export default AdminUserTable;

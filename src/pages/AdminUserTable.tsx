import { useState, useEffect } from 'react';
import { User } from '../models/User';
import './AdminUserTableStyles.scss';
import { Button } from '@mui/material';
import CreateUserDialog from '../dialogs/CreateUserDialog';

const AdminUserTable = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CreateUserDialog open={isCreateUserDialogOpen} onClose={(param: boolean) => onCreateUserClose(param)}/>
          </>
      )}
    </div>
  );
};

export default AdminUserTable;

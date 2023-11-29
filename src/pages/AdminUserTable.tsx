import { useState, useEffect } from 'react';
import { User } from '../models/User';
import './AdminUsersStyles.scss';

const AdminUserTable = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
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
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='content'>
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
      )}
    </div>
  );
};

export default AdminUserTable;

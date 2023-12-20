import { useEffect, useState } from 'react';
import { QueueList } from '../../models/QueueList';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { User } from '../../models/User';
import { Category } from '../../models/Category';
import CreateCategoryDialog from '../../dialogs/CreateCategoryDialog';
import ConfirmationDialog from '../../dialogs/ConfirmationDialog';
import EditCategoryDialog from '../../dialogs/EditCategoryDialog';
import { UserCategories } from '../../models/UserCategories';
import EditUserCategoriesDialog from '../../dialogs/EditUserCategoriesDialog';
import { useUser } from '../../contexts/UserContext';

interface QueueEditorProps {
  queueList : QueueList[]
}

const AdminQueueEditorComponent: React.FC<QueueEditorProps> = ({ queueList }) => {
  const [selectedQueue, setSelectedQueue] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<UserCategories[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserCategories>({} as UserCategories);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [selectedUserToAdd, setSelectedUserToAdd] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category>({} as Category);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isCreateCategoryDialogOpen, setIsCreateCategoryDialogOpen] = useState(false);
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [confirmDialogMessage, setConfirmDialogMessage] = useState<string>('');
  const [confirmDialogCallback, setConfirmDialogCallback] = useState<() => void>(() => {});

  const { axiosInstance } = useUser();

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/admin/queues/' + selectedQueue + '/categories');
      const data = await response.data;
      setCategories(data);
    } catch (error: any) {
      console.error('Error fetching user data:', error.response.data);
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/admin/queues/' + selectedQueue + '/users');
      const data = response.data;
      setUsers(data);
    } catch (error: any) {
      console.error('Error fetching user data:', error.response.data);
    }
  }

  const fetchAvailableUsers = async () => {
    try {
      const response = await axiosInstance.get('/admin/queues/' + selectedQueue + '/available-users');
      const data = await response.data;
      setAvailableUsers(data);
    } catch (error: any) {
      console.error('Error fetching user data:', error.response.data);
    }
  }

  const handleQueueChange = (event: SelectChangeEvent<string>) => {
    const selectedQueueId = event.target.value;
    setSelectedQueue(selectedQueueId);
  };

  const addSelectedUser = async () => {
    if (selectedUserToAdd === '') return;
    try {
      await axiosInstance.post('/admin/queues/' + selectedQueue + '/users/' + selectedUserToAdd);
      setSelectedUserToAdd('');
      fetchUsers();
      fetchAvailableUsers();
    } catch (error: any) {
      console.error('Error fetching user data:', error.response.data);
    }
  }

  const onConfirmDialogClose = (answer: boolean) => {
    setIsConfirmDialogOpen(false);
    if (!answer) return;
    confirmDialogCallback();
  }

  const deleteUser = async (id: string) => {
    try {
      await axiosInstance.delete('/admin/queues/' + selectedQueue + '/users/' + id);
      fetchUsers();
      fetchAvailableUsers();
    } catch (error: any) {
      console.error('Error fetching user data:', error.response.data);
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      await axiosInstance.delete('/admin/queues/' + selectedQueue + '/categories/' + id);
      fetchCategories();
    } catch (error: any) {
      console.error('Error fetching user data:', error.response.data);
    }
  }

  const onDeleteUser = (user: User) => {
    setConfirmDialogMessage('Do you want to delete user: ' + user.username + '?');
    setConfirmDialogCallback(() => () => deleteUser(user._id));
    setIsConfirmDialogOpen(true);
  }

  const onDeleteCategory = (category: Category) => {
    setConfirmDialogMessage('Do you want to delete category: ' + category.name + '?');
    setConfirmDialogCallback(() => () => deleteCategory(category._id));
    setIsConfirmDialogOpen(true);
  }

  const onEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsEditCategoryDialogOpen(true);
  }

  const onEditCategoryClose = (refresh: boolean) => {
    setIsEditCategoryDialogOpen(false);
    if (refresh) fetchCategories();
  }

  const onEditUser = (user: UserCategories) => {
    setSelectedUser(user);
    setIsEditUserDialogOpen(true);
  }

  const onEditUserClose = (refresh: boolean) => {
    setIsEditUserDialogOpen(false);
    if (refresh) fetchUsers();
  }

  useEffect(() => {
    // Use an IIFE (Immediately Invoked Function Expression) to define the async function
    (async () => {
      if (selectedQueue) await Promise.all([
        fetchCategories(),
        fetchUsers(),
        fetchAvailableUsers(),
      ]);
    })();
  }, [selectedQueue]);

  return (
    <div className='table-container container-66'>
      <FormControl fullWidth className='m-b-10'>
        <InputLabel id="queueSelectLabel">Select a Queue</InputLabel>
        <Select
          labelId="queueSelectLabel"
          id="queueSelect"
          value={selectedQueue}
          label="Select a Queue"
          onChange={handleQueueChange}
        >
          <MenuItem value="">
            <em>Select a queue</em>
          </MenuItem>
          {queueList.map(queue => (
            <MenuItem key={queue._id} value={queue._id}>
              {queue.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedQueue && (
        <div className='queue-edit'>
          <div className='table-container'>
            <FormControl fullWidth className='controls'>
            <Button variant="contained" onClick={() => setIsCreateCategoryDialogOpen(true)}>Add category</Button>
            </FormControl>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td><Button onClick={() => onEditCategory(category)}>Edit</Button></td>
                    <td><Button onClick={() => onDeleteCategory(category)}>Delete</Button></td> 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='table-container'>
            <FormControl fullWidth className='controls'>
            <InputLabel id="userSelectLabel">Select user to add</InputLabel>
            <Select
              labelId="userSelectLabel"
              id="userSelect"
              value={selectedUserToAdd}
              label="Select User"
              onChange={(e) => setSelectedUserToAdd(e.target.value)}
            >
              <MenuItem value="">
                <em>Select user</em>
              </MenuItem>
              {availableUsers.map(user => (
                <MenuItem key={user._id} value={user._id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
            <Button fullWidth variant="contained" onClick={addSelectedUser}>Add user</Button>
            </FormControl>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Categories</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.categories.map(cat => cat.name).join(', ')}</td>
                    <td><Button onClick={() => onEditUser(user)}>Edit</Button></td>
                    <td><Button onClick={() => onDeleteUser(user)}>Delete</Button></td> 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <CreateCategoryDialog open={isCreateCategoryDialogOpen} queueId={selectedQueue} onClose={(created) => { 
        setIsCreateCategoryDialogOpen(false); 
        created && fetchCategories();
      }
      }/> 
      <ConfirmationDialog open={isConfirmDialogOpen} onClose={onConfirmDialogClose} messageInput={confirmDialogMessage}/>
      <EditCategoryDialog open={isEditCategoryDialogOpen} onClose={onEditCategoryClose} categoryInput={selectedCategory} queueId={selectedQueue}/>
      <EditUserCategoriesDialog open={isEditUserDialogOpen} onClose={onEditUserClose} userInput={selectedUser} categories={categories} queueId={selectedQueue}/>
    </div>
  );
};


export default AdminQueueEditorComponent;
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox } from '@mui/material';
import { UserCategories } from '../models/UserCategories';
import { Category } from '../models/Category';

interface EditUserCategoriesDialogProps {
  open: boolean;
  onClose: (refresh: boolean) => void;
  userInput: UserCategories;
  categories: Category[];
  queueId: string;
}

const EditUserCategoriesDialog: React.FC<EditUserCategoriesDialogProps> = ({ open, onClose, userInput, categories, queueId }) => {
  const [user, setUser] = useState<UserCategories>({} as UserCategories);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    if (userInput && userInput.categories) setUser({...userInput, categories: [...userInput.categories.map((category) => ({ ...category }))],});
  }, [userInput]);

  const handleEdit = async () => {
    try {
      setError('');
      const response = await fetch(apiUrl + '/admin/queues/' + queueId + '/users/' + user._id, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify( { categories: user.categories} ),
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

  const isCategoryChecked = (categoryId: string) => {
    if (!user.categories) return false;
    return user.categories.some(category => category._id === categoryId);
  }

  const onCategoryChange = (checked: boolean, category: Category) => {
    if (checked) setUser({...user, categories: [...user.categories, category],});
    else setUser({...user, categories: user.categories.filter((categ) => categ._id !== category._id) });
  }

  const closeDialog = () => {
    setError('');
    onClose(false)
  }


  return (
    <Dialog open={open} onClose={closeDialog}>
    <DialogTitle>Edit User {user.username}</DialogTitle>
    <DialogContent>
      <div className='categories-box'> 
        {categories.map((category) => (
          <FormControlLabel key={category._id} label={category.name} control={<Checkbox checked={isCategoryChecked(category._id)} onChange={(e, chk) => onCategoryChange(chk, category)} />}  />
        ))}
      </div>
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

export default EditUserCategoriesDialog;

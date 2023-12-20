import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Category } from '../models/Category';
import { useUser } from '../contexts/UserContext';

interface EditCategoryDialogProps {
  open: boolean;
  onClose: (refresh: boolean) => void;
  categoryInput: Category;
  queueId: String;
}

const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({ open, onClose, categoryInput, queueId }) => {
  const [category, setCategory] = useState<Category>({} as Category);
  const [error, setError] = useState('');

  const {axiosInstance} = useUser();

  useEffect(() => {
    setCategory({...categoryInput});
  }, [categoryInput]);

  const handleEdit = async () => {
    try {
      setError('');
      await axiosInstance.put('/admin/queues/' + queueId + '/categories/' + category._id, { name: category.name });
      onClose(true);
    } catch (error: any) {
      setError(error.response.data);
      console.error('Error during registration:', error.response.data);
    }
  };

  const closeDialog = () => {
    setError('');
    onClose(false)
  }


  return (
    <Dialog open={open} onClose={closeDialog}>
    <DialogTitle>Edit Category</DialogTitle>
    <DialogContent>
      <TextField
      label="Name"
      type="text"
      fullWidth
      margin="normal"
      variant="outlined"
      value={category.name || ''}
      onChange={(e) => setCategory({...category, name: e.target.value })}
      />
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

export default EditCategoryDialog;

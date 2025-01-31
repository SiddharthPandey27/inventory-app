import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface EditModalProps {
  product: any;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ product, onClose }) => {
  const [formValues, setFormValues] = React.useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    // Save logic here
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Category"
          name="category"
          value={formValues.category}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Price"
          name="price"
          value={formValues.price}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Quantity"
          name="quantity"
          value={formValues.quantity}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;

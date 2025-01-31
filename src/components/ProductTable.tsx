import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteProduct, disableProduct } from '../redux/inventorySlice';
import EditModal from './EditModal';

// Define the Product type
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  value: number;
  disabled: boolean;
}

interface ProductTableProps {
  isAdmin: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ isAdmin }) => {
  const products = useSelector((state: RootState) => state.inventory.products);
  const dispatch = useDispatch();

  // Update useState to allow Product or null
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
      <Table>
        <TableHead>
          <TableRow>
            {['Name', 'Category', 'Price', 'Quantity', 'Value', 'Actions'].map(
              header => (
                <TableCell key={header} className="bg-gray-700 text-white rounded-lg px-4 py-2">
                  {header}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>${product.value}</TableCell>
              <TableCell>
                {isAdmin && (
                  <>
                    <IconButton
                      color="primary"
                      onClick={() => setEditProduct(product)} // No error now
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrash />
                    </IconButton>
                    <IconButton
                      color="warning"
                      onClick={() => dispatch(disableProduct(product.id))}
                    >
                      <FaEye />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editProduct && <EditModal product={editProduct} onClose={() => setEditProduct(null)} />}
    </div>
  );
};

export default ProductTable;

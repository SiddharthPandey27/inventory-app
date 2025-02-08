import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import { FaPen, FaTrashAlt, FaRegEye } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteProduct, disableProduct } from '../redux/inventorySlice';
import EditModal from './EditModal';

// Define the Product type
interface Product {
  id: string;
  name: string;
  category: string;
  price: string | number; // Allow both string and number
  quantity: number;
  value: string;
  disabled: boolean;
}

interface ProductTableProps {
  isAdmin: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ isAdmin }) => {
  const products = useSelector((state: RootState) => state.inventory.products);
  const dispatch = useDispatch();

  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const parsePrice = (price: string | number): number => {
    const numericPrice = typeof price === 'string' ? parseFloat(price.replace('$', '')) : price;
    return numericPrice;
  };

  return (
    <div className="bg-[#1f1f1f] rounded-lg shadow-lg mt-6">
      <div className="overflow-hidden rounded-lg">
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              {['Name', 'Category', 'Price', 'Quantity', 'Value', 'ACTION'].map(
                (header) => (
                  <TableCell
                    key={header}
                    className="px-4 py-3"
                  >
                    <span className="rounded-md bg-[#1a1a1a] px-4 py-2 text-[0.7rem] text-lime-400">
                      {header}
                    </span>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-[#333333] transition duration-200"
              >
                <TableCell className="px-4 py-3 text-[#e0e0e0] text-sm">
                  {product.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-[#e0e0e0] text-sm">
                  {product.category}
                </TableCell>
                <TableCell className="px-4 py-3 text-[#e0e0e0] text-sm">
                  ${parsePrice(product.price)}
                </TableCell>
                <TableCell className="px-4 py-3 text-[#e0e0e0] text-sm">
                  {product.quantity}
                </TableCell>
                <TableCell className="px-4 py-3 text-[#e0e0e0] text-sm">
                  ${parsePrice(product.value)}
                </TableCell>
                <TableCell className="px-4 py-3 text-[#e0e0e0] text-sm">
                  {isAdmin && (
                    <>
                      <IconButton
                        onClick={() => setEditProduct(product)}
                        className="!text-[#017001]"
                      >
                        <FaPen className="text-sm" />
                      </IconButton>
                      <IconButton
                        onClick={() => dispatch(disableProduct(product.id))}
                        className="!text-[#f786f7]"
                      >
                        <FaRegEye className="text-sm" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(product.id)}
                        className="!text-[#FF6B6B]"
                      >
                        <FaTrashAlt className="text-sm" />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <EditModal product={editProduct} onClose={() => setEditProduct(null)} />
      )}
    </div>
  );
};

export default ProductTable;

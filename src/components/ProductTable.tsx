import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import { FaPen, FaTrashAlt, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteProduct, toggleProductDisabled, updateProduct } from '../redux/inventorySlice';
import EditModal from './EditModal';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string | number;
  quantity: number;
  value: string | number;
  disabled: boolean;
}

interface EditProductState {
  product: Product;
  productIndex: number;
}

interface ProductTableProps {
  isAdmin: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ isAdmin }) => {
  const products = useSelector((state: RootState) => state.inventory.products);
  const dispatch = useDispatch();

  const [editProduct, setEditProduct] = useState<EditProductState | null>(null);

  const handleDelete = (productIndex: number) => {
    dispatch(deleteProduct(productIndex));
  };

  const handleDisable = (productIndex: number) => {
    dispatch(toggleProductDisabled(productIndex));
  };

  const handleSave = (updatedProduct: Product) => {
    if (editProduct) {
      const parsedProduct = {
        ...updatedProduct,
        price: typeof updatedProduct.price === 'string'
          ? parseFloat(updatedProduct.price.replace('$', '')) || 0
          : updatedProduct.price,
        quantity: updatedProduct.quantity || 0,
        value:
          (typeof updatedProduct.price === 'string'
            ? parseFloat(updatedProduct.price.replace('$', ''))
            : updatedProduct.price || 0) * (updatedProduct.quantity || 0),
      };
      dispatch(updateProduct({ product: parsedProduct, productIndex: editProduct.productIndex }));
      setEditProduct(null);
    }
  };

  const formatCurrency = (value: string | number): string => {
    const numericValue =
      typeof value === 'string' ? parseFloat(value.replace('$', '')) : value;
    return isNaN(numericValue) ? '$0' : `$${numericValue}`;
  };

  return (
    <div className="bg-[#1f1f1f] rounded-lg shadow-lg mt-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              {['Name', 'Category', 'Price', 'Quantity', 'Value', 'ACTION'].map((header) => (
                <TableCell
                  key={header}
                  className="px-4 py-3"
                  style={header === 'ACTION' ? { width: '150px' } : undefined}
                >
                  <span className="rounded-md bg-[#1a1a1a] px-4 py-2 text-[0.7rem] text-lime-400">
                    {header}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product, productIndex) => (
              <TableRow
                key={`${product.name}_${productIndex}`}
                className={`hover:bg-[#333333] transition duration-200 ${
                  product.disabled ? 'opacity-50' : ''
                }`}
              >
                <TableCell className="px-4 py-3 text-[#e0e0e0] text-sm">{product.name}</TableCell>
                <TableCell className="px-4 py-3 text-[#e0e0e0] text-sm">{product.category}</TableCell>
                <TableCell className="px-4 py-3 text-[#e0e0e0] text-sm">{formatCurrency(product.price)}</TableCell>
                <TableCell className="px-4 py-3 text-[#e0e0e0] text-sm">{product.quantity}</TableCell>
                <TableCell className="px-4 py-3 text-[#e0e0e0] text-sm">{formatCurrency(product.value)}</TableCell>
                <TableCell className="px-4 py-3 text-[#e0e0e0] flex items-center justify-between">
                  {isAdmin && (
                    <div className='flex flex-row gap-3'>
                      <IconButton
                        onClick={() =>
                          !product.disabled &&
                          setEditProduct({
                            product: { ...product },
                            productIndex,
                          })
                        }
                        className="!text-[#017001]"
                        disabled={product.disabled}
                      >
                        <FaPen className="text-sm" />
                      </IconButton>
                      <IconButton onClick={() => handleDisable(productIndex)} className="!text-[#f786f7]">
                        {product.disabled ? (
                          <FaRegEyeSlash className="text-[1.2rem]" />
                        ) : (
                          <FaRegEye className="text-[1.2rem]" />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={() => !product.disabled && handleDelete(productIndex)}
                        className={`!text-[#FF6B6B] ${product.disabled ? 'pointer-events-none' : ''}`}
                      >
                        <FaTrashAlt className="text-sm" />
                      </IconButton>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editProduct && (
        <EditModal
          product={editProduct.product}
          onClose={() => setEditProduct(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProductTable;

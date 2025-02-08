import React, { useState, useEffect } from 'react';
import { Product } from '../types/types';

interface EditModalProps {
  product: Product;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const EditModal: React.FC<EditModalProps> = ({ product, onClose, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>({
    ...product,
    price: typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) || 0 : product.price,
    value: typeof product.value === 'string' ? parseFloat(product.value.replace('$', '')) || 0 : product.value,
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    setIsSaveDisabled(JSON.stringify(updatedProduct) === JSON.stringify(product));
  }, [updatedProduct, product]);

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setUpdatedProduct((prev) => {
      const newValue = field === 'price' || field === 'quantity' ? +value : value;
      const updatedFields = { ...prev, [field]: newValue };

      if (field === 'price' || field === 'quantity') {
        updatedFields.value = (updatedFields.price as number || 0) * (updatedFields.quantity || 0);
      }

      return updatedFields;
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1a1a1a] rounded-lg shadow-lg w-full md:w-[40%] p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="!text-3xl text-white">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-lime-400 hover:text-white text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <div className="w-full rounded text-white">
            {updatedProduct.name}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-2">Category</label>
            <input
              type="text"
              value={updatedProduct.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#2c2c2c] text-white border border-gray-700 focus:outline-none focus:ring focus:ring-lime-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-2">Price ($)</label>
            <input
              type="number"
              value={updatedProduct.price}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
              className="w-full px-3 py-2 rounded bg-[#2c2c2c] text-white border border-gray-700 focus:outline-none focus:ring focus:ring-lime-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-2">Quantity</label>
            <input
              type="number"
              value={updatedProduct.quantity}
              onChange={(e) => handleInputChange('quantity', parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 rounded bg-[#2c2c2c] text-white border border-gray-700 focus:outline-none focus:ring focus:ring-lime-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-2">Value</label>
            <div className="w-full px-3 py-2 rounded bg-[#2c2c2c] text-white border border-gray-700">
              ${updatedProduct.value}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="text-lime-300 hover:text-white text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(updatedProduct)}
            disabled={isSaveDisabled}
            className={`text-sm font-medium px-4 py-2 rounded ${
              isSaveDisabled
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-lime-500 text-black hover:bg-lime-600'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

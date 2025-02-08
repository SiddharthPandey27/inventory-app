import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/types';

interface InventoryState {
  products: Product[];
}

const initialState: InventoryState = {
  products: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    updateProduct: (
      state,
      action: PayloadAction<{ product: Product; productIndex: number }>
    ) => {
      const { product, productIndex } = action.payload;
      state.products[productIndex] = product;
    },    
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((_, index) => index !== action.payload);
    },
    toggleProductDisabled: (state, action: PayloadAction<number>) => {
      const product = state.products[action.payload];
      if (product) {
        product.disabled = !product.disabled;
      }
    },
  },
});

export const { setProducts, updateProduct, deleteProduct, toggleProductDisabled } =
  inventorySlice.actions;
export default inventorySlice.reducer;

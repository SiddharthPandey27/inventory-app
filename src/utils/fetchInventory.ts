import axios from 'axios';
import { setProducts } from '../redux/inventorySlice';
import { AppDispatch } from '../redux/store';

export const fetchInventoryData = async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(
      'https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory'
    );
    dispatch(setProducts(response.data));
  } catch (error) {
    console.error('Error fetching inventory data:', error);
  }
};

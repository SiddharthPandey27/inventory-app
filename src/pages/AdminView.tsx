import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInventoryData } from '../utils/fetchInventory';
import Widgets from '../components/Widgets';
import ProductTable from '../components/ProductTable';

const AdminView: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchInventoryData(dispatch);
  }, [dispatch]);

  return (
    <div className="p-4">
      <Widgets />
      <ProductTable isAdmin />
    </div>
  );
};

export default AdminView;

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
        <div className="p-4 min-h-screen text-white">
            {/* Add "Inventory Stats" Title */}
            <h1 className="text-3xl font-bold text-center mb-6">Inventory Stats</h1>

            {/* Widgets Section */}
            <Widgets />

            {/* Product Table */}
            <ProductTable isAdmin />
        </div>
    );
};

export default AdminView;

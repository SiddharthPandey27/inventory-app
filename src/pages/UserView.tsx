import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInventoryData } from '../utils/fetchInventory';
import Widgets from '../components/Widgets';
import ProductTable from '../components/ProductTable';

const UserView: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch inventory data when the User view is loaded
        fetchInventoryData(dispatch);
    }, [dispatch]);

    return (
        <div className="p-4 min-h-screen text-white">
            {/* Add "Inventory Stats" Title */}
            <h1 className="text-[2.75rem] mb-6">Inventory Stats</h1>

            {/* Widgets Section */}
            <Widgets />

            {/* Product Table */}
            <ProductTable isAdmin={false} />
        </div>
    );
};

export default UserView;

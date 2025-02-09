import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInventoryData } from '../utils/fetchInventory';
import Widgets from '../components/Widgets';
import ProductTable from '../components/ProductTable';

const UserView: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchInventoryData(dispatch);
    }, [dispatch]);

    return (
        <div className="min-h-screen text-white">
            <Widgets />
            <ProductTable isAdmin={false} />
        </div>
    );
};

export default UserView;

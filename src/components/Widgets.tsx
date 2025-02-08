import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { FaBox, FaDollarSign, FaExclamationTriangle, FaLayerGroup } from 'react-icons/fa';

const Widgets: React.FC = () => {
    const products = useSelector((state: RootState) => state.inventory.products);

    // Calculate Total Products
    const totalProducts = products.length;

    // Calculate Total Store Value (remove "$" and parse the value)
    const totalValue = products.reduce((sum, p) => {
        const numericValue = parseFloat(p.value.replace('$', '') || '0');
        return sum + numericValue;
    }, 0).toLocaleString();

    // Count Products Out of Stock
    const outOfStock = products.filter(p => p.quantity === 0).length;

    // Count Number of Unique Categories
    const categories = new Set(products.map(p => p.category)).size;

    // Define Widget Data
    const widgetData = [
        { label: 'Total products', value: totalProducts, icon: FaBox },
        { label: 'Total store value', value: `${totalValue}`, icon: FaDollarSign },
        { label: 'Out of stock', value: outOfStock, icon: FaExclamationTriangle },
        { label: 'No. of categories', value: categories, icon: FaLayerGroup },
    ];

    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            gap={2}
        >
            {widgetData.map(widget => (
                <Card key={widget.label} className="!bg-[#1a3d2f] text-white !rounded-xl shadow-lg">
                    <CardContent className="flex flex-row items-start !p-6 gap-5">
                        {/* Widget Icon */}
                        <widget.icon className="text-4xl text-white" />
                        <div className='flex flex-col gap-3 my-1'>
                            {/* Widget Label */}
                            <Typography variant="body2" className="tracking-wide !text-[0.9rem] mb-1">
                                {widget.label}
                            </Typography>
                            {/* Widget Value */}
                            <Typography variant="h4" className="!font-semibold !text-[2.5rem]">
                                {widget.value}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default Widgets;

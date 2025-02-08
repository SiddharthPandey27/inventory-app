import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { FaBox, FaDollarSign, FaExclamationTriangle, FaLayerGroup } from 'react-icons/fa';

const Widgets: React.FC = () => {
    const products = useSelector((state: RootState) => state.inventory.products);
    const totalProducts = products.length;

    const totalValue = products.reduce((sum, p) => {
        const numericValue =
          typeof p.value === 'string'
            ? parseFloat(p.value.replace('$', ''))
            : p.value || 0;
        return sum + numericValue;
    }, 0).toLocaleString();

    const outOfStock = products.filter(p => p.quantity === 0).length;

    const categories = new Set(products.map(p => p.category)).size;

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
                <Card key={widget.label} className="!bg-[#273326] text-white !rounded-xl shadow-lg">
                    <CardContent className="flex flex-row items-start !p-6 gap-5">
                        <widget.icon className="text-4xl text-white" />
                        <div className='flex flex-col gap-3 my-1'>
                            <Typography variant="body2" className="tracking-wide !text-[0.9rem] mb-1">
                                {widget.label}
                            </Typography>
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

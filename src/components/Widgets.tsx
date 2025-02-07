import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FaBox, FaDollarSign, FaExclamationTriangle, FaLayerGroup } from 'react-icons/fa';

const Widgets: React.FC = () => {
    const products = useSelector((state: RootState) => state.inventory.products);

    console.log('products:', products);

    // Calculate Total Products
    const totalProducts = products.length;

    // Calculate Total Store Value (remove "$" and parse the value)
    const totalValue = products.reduce((sum, p) => {
        const numericValue = parseFloat(p.value.replace('$', '') || '0');
        return sum + numericValue;
    }, 0);

    // Count Products Out of Stock
    const outOfStock = products.filter(p => p.quantity === 0).length;

    // Count Number of Unique Categories
    const categories = new Set(products.map(p => p.category)).size;

    // Define Widget Data
    const widgetData = [
        { label: 'Total Products', value: totalProducts, icon: FaBox },
        { label: 'Total Store Value', value: `$${totalValue.toFixed(2)}`, icon: FaDollarSign },
        { label: 'Out of Stock', value: outOfStock, icon: FaExclamationTriangle },
        { label: 'No. of Categories', value: categories, icon: FaLayerGroup },
    ];

    return (
        <Grid container spacing={4}>
            {widgetData.map(widget => (
                <Grid item xs={12} sm={6} md={3} key={widget.label}>
                    {/* Card with Dark Green Background */}
                    <Card className="!bg-[#051f0f] text-white rounded-lg shadow-md">
                        <CardContent className="flex items-center">
                            {/* Widget Icon */}
                            <widget.icon className="text-3xl text-white mr-4" />
                            <div>
                                {/* Widget Label */}
                                <Typography variant="body1">{widget.label}</Typography>
                                {/* Widget Value */}
                                <Typography variant="h5" className="font-bold">
                                    {widget.value}
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Widgets;

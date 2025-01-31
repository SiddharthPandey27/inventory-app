import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FaBox, FaDollarSign, FaExclamationTriangle, FaLayerGroup } from 'react-icons/fa';

const Widgets: React.FC = () => {
  const products = useSelector((state: RootState) => state.inventory.products);

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (!p.disabled ? p.value : 0), 0);
  const outOfStock = products.filter(p => p.quantity === 0).length;
  const categories = new Set(products.map(p => p.category)).size;

  const widgetData = [
    { label: 'Total Products', value: totalProducts, icon: FaBox },
    { label: 'Total Store Value', value: `$${totalValue}`, icon: FaDollarSign },
    { label: 'Out of Stock', value: outOfStock, icon: FaExclamationTriangle },
    { label: 'No. of Categories', value: categories, icon: FaLayerGroup },
  ];

  return (
    <Grid container spacing={4}>
      {widgetData.map(widget => (
        <Grid item xs={12} sm={6} md={3} key={widget.label}>
          <Card className="bg-green-800 text-white rounded-lg shadow-md">
            <CardContent className="flex items-center">
              <widget.icon className="text-3xl text-white mr-4" />
              <div>
                <Typography variant="body1">{widget.label}</Typography>
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

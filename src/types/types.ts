export interface Product {
    id: string;
    name: string;
    category: string;
    price: string | number;
    quantity: number;
    value: string | number;
    disabled: boolean;
}
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const CartButton = ({ className }) => (
    <Button variant="primary" as={Link} to="/cart" className={className}>Корзина</Button>
);

export default CartButton;
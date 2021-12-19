import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const CartButton = ({ ...props }) => {
  const history = useHistory();

  return (
    <Button variant="primary" onClick={() => history.push('/cart')} {...props}>
      Корзина
    </Button>
  );
};

export default CartButton;

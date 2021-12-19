import React from 'react';
import { useMutation } from '@apollo/client';

import { Button, Card } from 'react-bootstrap';
import { GET_CART } from '../../../graphql/cart';
import { ADD_TO_CART_QUERY } from '../../../graphql/products';
import { fetchNotifyHandler } from '../../../utils/notifyHandler';
import { ProductGrid, Container } from './styled';

export const ProductsView = ({ products, cartEnable }) => {
  const [addToCartMutate] = useMutation(ADD_TO_CART_QUERY, {
    refetchQueries: [{ query: GET_CART }],
    onCompleted: () =>
      fetchNotifyHandler(
        'Товар успешно добавлен в корзину',
        'Ошибка добавления в корзину'
      ),
  });

  const addToCart = (id: number) =>
    addToCartMutate({
      variables: { id },
      refetchQueries: [{ query: GET_CART }],
    });

  return (
    <Container>
      <h2>Товары</h2>
      <ProductGrid>
        {products.map((product, index) => (
          <Card style={{ width: '18rem' }} key={index}>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.desc}</Card.Text>
              <Card.Text>{product.price}</Card.Text>
              {cartEnable && (
                <Button variant="primary" onClick={() => addToCart(product.id)}>
                  В корзину
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </ProductGrid>
    </Container>
  );
};

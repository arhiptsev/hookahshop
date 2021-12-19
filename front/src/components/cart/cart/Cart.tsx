import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import BlockOverlay from '../../../common/BlockUi';
import { NotificationsService } from '../../../common/notifications/notifications.service';
import { CREATE_ORDER, GET_CART, REMOVE_FROM_CART } from '../../../graphql/cart';
import { GET_ORDERS } from '../../../graphql/orders';
import { CartItems } from './cart-table/CartTable';
import { CartContainer } from './styled';

export const Cart = () => {
  const notificatons = NotificationsService.getInstance();

  const [removeFromCartMutation, { loading: removing }] = useMutation(REMOVE_FROM_CART, {
    onCompleted: () => notificatons.addSuccess(
      'Товар успешно удален из корзины :)'
    ),
    onError: () => notificatons.addError('Ошибка при удалении товара.'),
    refetchQueries: [{ query: GET_CART }]
  });

  const [createOrder, { loading: creating }] = useMutation(CREATE_ORDER, {
    onCompleted: () => notificatons.addSuccess(
      'Заказ успешно создан!'
    ),
    onError: () => notificatons.addError('Ошибка при создании заказа.'),
    refetchQueries: [{ query: GET_ORDERS }]
  });


  const removeFromCart = (id: Number) => removeFromCartMutation({
    variables: {
      id: id
    }
  });

  const { loading, data } = useQuery(GET_CART);

  const overlay = removing || creating || loading;

  return (
    <BlockOverlay blocked={overlay}>
      <CartContainer>
        <CartItems
          cartItems={(data && data.cart) || []}
          removeFromCart={removeFromCart}
          createOrder={createOrder}
        />
      </CartContainer>
    </BlockOverlay>
  );
}

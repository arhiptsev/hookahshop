import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import BlockOverlay from '../../../common/BlockUi';
import { NotificationsServies } from '../../../common/notifications/notifications.service';
import { CartItems } from './cart-table/CartTable';
import './Cart.scss';

const CREATE_ORDER = gql`
  mutation createOrderFromCart { 
            createOrderFromCart {
                id
            }
  }
`;

const REMOVE_FROM_CART = gql`
  mutation removeFromCart($id: Int) { 
    removeFromCart(id: $id){
        isSuccess
  }
  }
`;

const GET_CART = gql`
  query getCart {
    cart {
        id,
        count,
        product {
            id,
            name,
            price,
            }
        }
  }
`;


const Cart = () => {

    const notificatons = NotificationsServies.getInstance();

    const [removeFromCartMutation, { loading: removing }] = useMutation(REMOVE_FROM_CART, {
        onCompleted: () => notificatons.addSuccess(
            'Товар успешно удален из корзины :)'
        ),
        onError: () => notificatons.addError('Ошибка при удалении товара.')
    });
    const [createOrder, { loading: creating }] = useMutation(CREATE_ORDER, {
        onCompleted: () => notificatons.addSuccess(
            'Заказ успешно создан!'
        ),
        onError: () => notificatons.addError('Ошибка при создании заказа.')
    });


    const removeFromCart = (id: Number) => removeFromCartMutation({
        variables: {
            id: id
        },
        refetchQueries: [
            {
                query: GET_CART
            }
        ],
    });

    const { loading, data } = useQuery(GET_CART);

    const overlay = removing || creating || loading;


    return (
        <BlockOverlay blocked={overlay}>
            <div className="cart-container">
                <CartItems
                    cartItems={(data && data.cart) || []}
                    removeFromCart={removeFromCart}
                    createOrder={createOrder}
                />
            </div>
        </BlockOverlay>
    );
}

export default Cart;


import React, { Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import './CartTable.scss';

export const CartItems = ({ cartItems, removeFromCart, createOrder }) => (
    <Fragment>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Товар</th>
                    <th>Количество</th>
                    <th>Цена</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((item, i) => (
                    <tr key={i}>
                        <td>{item.product.name}</td>
                        <td>{item.count}</td>
                        <td>{item.product.price} Р</td>
                        <td><Button variant="primary" onClick={() => removeFromCart(item.id)}>Удалить</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>

        <div className="cart-actions">
            <Button variant="primary" onClick={createOrder}>Создать заказ</Button>
        </div>

    </Fragment>
);


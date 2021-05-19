import React from 'react';
import { Button, Table } from 'react-bootstrap';

export  const OrderTable =  ({ orders, deleteOrder }) => (
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>Дата</th>
                <th>Товаров</th>
                <th>Статус</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order, i) => (
                <tr key={i}>
                    <td>{order.created_at}</td>
                    <td>{order.items.length}</td>
                    <td>Ожидает оплаты</td>
                    <td><Button variant="primary" onClick={() => deleteOrder(order.id)}>Удалить</Button></td>
                </tr>
            ))}
        </tbody>
    </Table>
);


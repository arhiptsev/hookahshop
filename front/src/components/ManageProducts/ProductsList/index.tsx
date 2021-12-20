import React from 'react';
import { Button } from 'react-bootstrap';
import { Actions, DeleteButton, TableStyled } from './styled';

export const ProductsList = ({ products, updateProduct, deleteProduct }) => (
  <TableStyled striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {products.map(({ id, name, price, count }) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{count}</td>
          <td>{price} </td>
          <td>
            <Actions>
              <Button variant="primary" onClick={() => updateProduct(id)}>
                Редактировать
              </Button>
              <DeleteButton variant="danger" onClick={() => deleteProduct(id)}>
                Удалить
              </DeleteButton>
            </Actions>
          </td>
        </tr>
      ))}
    </tbody>
  </TableStyled>
);

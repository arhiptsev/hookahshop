import React from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { DELETE_ORDER, GET_ORDERS } from '../../../graphql/orders';
import { OrderTable } from '../order-table/OrderTable';
import { Container } from './styled';

export const Orders = () => {
  const { data } = useQuery(GET_ORDERS);
  const [deleteOrderMutation] = useMutation(DELETE_ORDER, {
    refetchQueries: [{ query: GET_ORDERS }],
  });

  const deleteOrder = (id) => deleteOrderMutation({ variables: { id } });

  return (
    <Container>
      <OrderTable
        orders={data?.orders || []}
        deleteOrder={deleteOrder}
      ></OrderTable>
    </Container>
  );
};

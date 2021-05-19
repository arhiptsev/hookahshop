import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { RxContext } from '../../context/rx-context';
import { GET_CAREGORY } from '../../graphql/products';
import { useObservable } from '../../utils/hooks/useObservable';

import { ProductsView } from './ProductsView/';

export const Category = () => {
  const { params } = useRouteMatch<{ id?: string }>();
  const { id } = params;

  const { data } = useQuery(GET_CAREGORY, { variables: { id: Number(id) } });

  const { currentUserObservable } = useContext(RxContext);
  const currentUser = useObservable(currentUserObservable);

  if (!data) return null;

  const { products } = data.category;

  return (
    <ProductsView
      cartEnable={Boolean(currentUser)}
      products={products}
    ></ProductsView>
  );
}


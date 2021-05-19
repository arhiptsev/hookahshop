import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { RxContext } from '../../context/rx-context';
import { GET_All_PRODUCTS } from '../../graphql/products';
import { useObservable } from '../../utils/hooks/useObservable';

import { ProductsView } from './ProductsView';

export const Products = () => {
  const { data } = useQuery(GET_All_PRODUCTS);
  const { currentUserObservable } = useContext(RxContext);
  const currentUser = useObservable(currentUserObservable);

  if (!data) return null;

  const { products } = data;

  return (
    <ProductsView
      cartEnable={Boolean(currentUser)}
      products={products}
    ></ProductsView>
  );
};

import { useQuery } from '@apollo/client';
import React from 'react';
import { connect } from 'react-redux';
import { GET_All_PRODUCTS } from '../../graphql/products';

import { ProductsView } from './ProductsView';

export const Products = ({ currentUser }) => {
  const { data } = useQuery(GET_All_PRODUCTS);
  if (!data) return null;
  const { products } = data;

  return (
    <ProductsView
      cartEnable={Boolean(currentUser)}
      products={products}
    ></ProductsView>
  );
}




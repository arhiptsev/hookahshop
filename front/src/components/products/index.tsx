import React, { useContext } from 'react';
import { RxContext } from '../../context/rx-context';

import { useObservable } from '../../utils/hooks/useObservable';
import { useGetProductsWithSubsription } from './hooks';

import { ProductsView } from './ProductsView';
import { Container } from './styled';

export const Products = () => {
  const { data } = useGetProductsWithSubsription();

  const { currentUserObservable } = useContext(RxContext);
  const currentUser = useObservable(currentUserObservable);

  if (!data) return null;

  const { products } = data;

  return (
    <Container>
      <ProductsView cartEnable={Boolean(currentUser)} products={products} />
    </Container>
  );
};

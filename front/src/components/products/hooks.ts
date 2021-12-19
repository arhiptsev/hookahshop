import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { GET_All_PRODUCTS, PRODUCTS_SUBSCRIPTION } from '../../graphql';

export const useGetProductsWithSubsription = () => {
  const { subscribeToMore, ...data } = useQuery(GET_All_PRODUCTS);

  useEffect(
    () =>
      subscribeToMore({
        document: PRODUCTS_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newProducts = subscriptionData.data.productsUpdated;

          return { products: newProducts };
        },
      }),
    []
  );

  return data;
};

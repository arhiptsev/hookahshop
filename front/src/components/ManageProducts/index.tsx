import React from 'react';
import { ProductsList } from './ProductsList';
import { Button } from 'react-bootstrap';
import { useModal } from '../../hooks';
import { СreateProduct } from './СreateProduct';
import { useGetProductsWithSubsription } from '../products/hooks';
import { Container } from './styled';
import { DELETE_PRODUCT_MUTATION, GET_All_PRODUCTS } from '../../graphql';
import { useMutation } from '@apollo/client';
import BlockOverlay from '../../common/BlockUi';
import { useNotifications } from '../../common/hooks';

export const ManageProducts = () => {
  const { data } = useGetProductsWithSubsription();
  const notifications = useNotifications();

  const [deleteProduct, { loading: deleting }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      refetchQueries: [{ query: GET_All_PRODUCTS }],
      onCompleted: () => {
        notifications.addSuccess('Товар успешно удален');
      },
      onError: () => {
        notifications.addError('Ошибка удаления товара');
      },
    }
  );

  const deleteHandler = (id: number) => deleteProduct({ variables: { id } });

  const { isOpen, onOpen, onClose } = useModal();

  if (!data) return null;

  const { products } = data;

  return (
    <BlockOverlay blocked={deleting}>
      <Container>
        <ProductsList
          products={products}
          updateProduct={() => {}}
          deleteProduct={deleteHandler}
        />
        <Button
          variant="primary"
          onClick={() => {
            onOpen();
          }}
        >
          Создать товар
        </Button>
        <СreateProduct show={isOpen} handleClose={onClose} />
      </Container>
    </BlockOverlay>
  );
};

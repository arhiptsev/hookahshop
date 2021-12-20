import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import React from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import { createPropertyAccessChain } from 'typescript';
import BlockOverlay from '../../../common/BlockUi';
import { useNotifications } from '../../../common/hooks';
import { NotificationsService } from '../../../common/notifications/notifications.service';
import { CREATE_PRODUCT_MUTATION, GET_All_PRODUCTS } from '../../../graphql';
import { TextField } from '../../forms/controls';
import { ContainerStyled, DescriptionField, RowStyled } from './styled';
import { СreateProductForm } from './СreateProductForm';
interface СreateProductProps {
  show: boolean;
  handleClose: () => void;
}

const INITIAL_VALUES = {
  name: '',
  desc: '',
  price: undefined,
  count: undefined,
};

const productValidation = (
  values
): { [key in keyof typeof INITIAL_VALUES]?: string | undefined } => {
  const errors: {
    [key in keyof typeof INITIAL_VALUES]?: string | undefined;
  } = {};

  if (values.name.length < 3)
    errors.name = 'Наименование не должно быть меньше трех символов';
  if (values.desc.length < 10)
    errors.desc = 'Наименование не должно быть меньше десяти символов';
  if (typeof values.price !== 'number')
    errors.price = 'Цена должна быть указана';
  if (typeof values.count !== 'number')
    errors.count = 'Количество должно быть указано';

  return errors;
};

export const СreateProduct = ({ show, handleClose }: СreateProductProps) => {
  const notifications = useNotifications();

  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: GET_All_PRODUCTS }],
    onCompleted: () => {
      notifications.addSuccess('Товар успешно создан');
    },
    onError: () => {
      notifications.addError('Ошибка создания товара');
    },
  });

  const onSubmit = (payload) => {
    createProduct({ variables: { payload } });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <СreateProductForm
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validate={productValidation}
        submiting={loading}
      />
    </Modal>
  );
};

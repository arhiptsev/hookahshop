import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useNotifications } from '../../../common/hooks';
import {
  CREATE_PRODUCT_MUTATION,
  GET_All_PRODUCTS,
  GET_CAREGORIES_QUERY,
} from '../../../graphql';
import { CreateProductForm, FormValues } from './CreateProductForm';
interface СreateProductProps {
  show: boolean;
  handleClose: () => void;
}

const INITIAL_VALUES: FormValues = {
  name: '',
  desc: '',
  price: undefined,
  count: undefined,
  categories: [],
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

  const [createProduct, { loading: creating }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      refetchQueries: [{ query: GET_All_PRODUCTS }],
      onCompleted: () => {
        notifications.addSuccess('Товар успешно создан');
      },
      onError: () => {
        notifications.addError('Ошибка создания товара');
      },
    }
  );

  const { data } = useQuery(GET_CAREGORIES_QUERY);

  const onSubmit = ({ categories, ...data }: typeof INITIAL_VALUES) => {
    createProduct({
      variables: {
        payload: {
          ...data,
          categories: categories?.map((id) => Number.parseInt(id)) || [],
        },
      },
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <CreateProductForm
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validate={productValidation}
        submiting={creating}
        categories={data?.categories || []}
      />
    </Modal>
  );
};

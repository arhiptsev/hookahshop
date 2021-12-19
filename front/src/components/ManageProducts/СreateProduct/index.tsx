import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import React from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import BlockOverlay from '../../../common/BlockUi';
import { CREATE_PRODUCT_MUTATION, GET_All_PRODUCTS } from '../../../graphql';
import { ContainerStyled, RowStyled } from './styled';

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

export const СreateProduct = ({ show, handleClose }: СreateProductProps) => {
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: GET_All_PRODUCTS }],
  });

  const onSubmit = (payload) => {
    createProduct({ variables: { payload } });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
        {({ handleSubmit, handleChange, values }) => {
          return (
            <BlockOverlay blocked={loading}>
              <Modal.Header closeButton>
                <Modal.Title>Создание тоавра</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit as any}>
                  <ContainerStyled fluid="xxl">
                    <RowStyled>
                      <Col>
                        <FloatingLabel label="Наименование">
                          <Form.Control
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="Наименование"
                            name="name"
                          />
                        </FloatingLabel>
                      </Col>
                    </RowStyled>
                    <RowStyled>
                      <Col>
                        <FloatingLabel label="Описание">
                          <Form.Control
                            // id="password"
                            name="desc"
                            as="textarea"
                            value={values.desc}
                            style={{ height: '100px' }}
                            onChange={handleChange}
                            type="desc"
                            placeholder="Описание"
                          />
                        </FloatingLabel>
                      </Col>
                    </RowStyled>
                    <RowStyled>
                      <Col>
                        <FloatingLabel label="Цена">
                          <Form.Control
                            type="number"
                            value={values.price}
                            onChange={handleChange}
                            placeholder="Цена"
                            // id="username"
                            name="price"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col>
                        <FloatingLabel label="Количество">
                          <Form.Control
                            type="number"
                            value={values.count}
                            onChange={handleChange}
                            placeholder="Количество"
                            // id="username"
                            name="count"
                          />
                        </FloatingLabel>
                      </Col>
                    </RowStyled>
                  </ContainerStyled>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={() => handleSubmit()}>
                  Создать
                </Button>
              </Modal.Footer>
            </BlockOverlay>
          );
        }}
      </Formik>
    </Modal>
  );
};

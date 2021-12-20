import { Formik } from 'formik';
import React from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import BlockOverlay from '../../../../common/BlockUi';
import { TextField } from '../../../forms/controls';
import { ContainerStyled, RowStyled } from './styled';

interface FormValues {
  name?: string;
  desc?: string;
  price?: number;
  count?: number;
}

interface СreateProductFormProps {
  validate?: (
    values: FormValues
  ) => { [key in keyof FormValues]?: string | undefined } | void | object;
  initialValues: FormValues;
  submiting: boolean;
  onSubmit: (values: FormValues) => void | Promise<any>;
}

export const СreateProductForm = ({
  validate,
  onSubmit,
  initialValues,
  submiting,
}: СreateProductFormProps) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
    {({ handleSubmit, handleChange, values, errors, touched }) => (
      <BlockOverlay blocked={submiting}>
        <Modal.Header closeButton>
          <Modal.Title>Создание тоавра</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit as any}>
            <ContainerStyled fluid="xxl">
              <RowStyled>
                <Col>
                  <TextField
                    value={values.name}
                    onChange={handleChange}
                    label="Наименование"
                    name="name"
                    isInvalid={!!touched.name && !!errors.name}
                    errors={errors.name}
                  />
                </Col>
              </RowStyled>
              <RowStyled>
                <Col>
                  <TextField
                    as="textarea"
                    value={values.desc}
                    onChange={handleChange}
                    label="Описание"
                    name="desc"
                    isInvalid={!!touched.desc && !!errors.desc}
                    errors={errors.desc}
                  />
                </Col>
              </RowStyled>
              <RowStyled>
                <Col>
                  <TextField
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    label="Цена"
                    name="price"
                    isInvalid={!!touched.price && !!errors.price}
                    errors={errors.price}
                  />
                </Col>
                <Col>
                  <TextField
                    type="number"
                    value={values.count}
                    onChange={handleChange}
                    label="Количество"
                    name="count"
                    isInvalid={!!touched.count && !!errors.count}
                    errors={errors.count}
                  />
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
    )}
  </Formik>
);

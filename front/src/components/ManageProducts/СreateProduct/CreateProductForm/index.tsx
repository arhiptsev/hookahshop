import { Formik } from 'formik';
import React from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import BlockOverlay from '../../../../common/BlockUi';
import { Category } from '../../../../types/categoties';
import { TextField, Checkbox } from '../../../forms/uncontrols';
import { ContainerStyled, RowStyled } from './styled';

export interface FormValues {
  name?: string;
  desc?: string;
  price?: number;
  count?: number;
  categories?: string[];
}

interface СreateProductFormProps {
  validate?: (
    values: FormValues
  ) => { [key in keyof FormValues]?: string | undefined } | void | object;
  initialValues: FormValues;
  submiting: boolean;
  onSubmit: (values: FormValues) => void | Promise<any>;
  categories: Category[];
}

export const CreateProductForm = ({
  validate,
  onSubmit,
  initialValues,
  submiting,
  categories,
}: СreateProductFormProps) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
    {({ handleSubmit }) => (
      <BlockOverlay blocked={submiting}>
        <Modal.Header closeButton>
          <Modal.Title>Создание тоавра</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit as any}>
            <ContainerStyled fluid="xxl">
              <RowStyled>
                <Col>
                  <TextField label="Наименование" name="name" />
                </Col>
              </RowStyled>
              <RowStyled>
                <Col>
                  <TextField as="textarea" label="Описание" name="desc" />
                </Col>
              </RowStyled>
              <RowStyled>
                <Col>
                  {categories.map(({ id, name }) => (
                    <Checkbox label={name} name="categories" value={id} />
                  ))}
                </Col>
              </RowStyled>
              <RowStyled>
                <Col>
                  <TextField type="number" label="Цена" name="price" />
                </Col>
                <Col>
                  <TextField type="number" label="Количество" name="count" />
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

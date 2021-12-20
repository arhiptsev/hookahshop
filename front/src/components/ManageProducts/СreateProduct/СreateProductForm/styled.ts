import { Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { TextField } from '../../../forms/controls';

export const CartActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ContainerStyled = styled(Container)`
  row-gap: 5px;
`;

export const RowStyled = styled(Row)`
  margin-bottom: 20px;
`;

export const DescriptionField = styled(TextField)`
  height: 100px;
  width: 100%;
`;

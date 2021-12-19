import { Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

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

export const DescriptionField = styled(Form.Control)`
  height: 100px;
`;

import styled from 'styled-components';
import { Button, Table } from 'react-bootstrap';

export const DeleteButton = styled(Button)`
  margin-left: 10px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const TableStyled = styled(Table)`
  max-height: 400px;
  overflow-y: scroll;
`;

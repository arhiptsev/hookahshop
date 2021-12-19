import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${({ $open }) => ($open ? '200px' : 0)};
  width: ${({ $open }) => ($open ? '25%' : 0)};
  overflow: hidden;
  transition-duration: 400ms;
  border-right: 1px solid #cccccc;
`;

export const Content = styled.div`
  flex-grow: 1;
`;

import React from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../common/AuthRoute';
import { Cart } from '../components/cart/cart/Cart';
import { ManageProducts } from '../components/ManageProducts';
import { Orders } from '../components/order/orders/Orders';
import { Products } from '../components/products';
import { Category } from '../components/products/Category';
import { Categories } from './Categories';
import { Container, Content, Sidebar } from './styled';

export const Main = ({ sidebar }) => {
  return (
    <Container>
      <Sidebar $open={sidebar}>
        <Categories></Categories>
      </Sidebar>
      <Content>
        <Route path="/products" component={Products}></Route>
        <Route path="/category/:id" component={Category}></Route>
        <AuthRoute path="/cart" component={Cart}></AuthRoute>
        <AuthRoute path="/orders" component={Orders}></AuthRoute>
        <AuthRoute
          path="/manage-products"
          component={ManageProducts}
        ></AuthRoute>
      </Content>
    </Container>
  );
};

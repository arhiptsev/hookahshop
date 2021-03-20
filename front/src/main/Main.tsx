import React, { Component, ReactNode } from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import AuthRoute from '../common/AuthRoute';
import Cart from '../components/cart/cart/Cart';
import Orders from '../components/order/orders/Orders';
import Products from '../components/products/Products';
import Categories from './Categories/Categories';
import './Main.scss';


export default class Main extends Component<{ sidebar?: boolean }, {}> {

  public toolbar = true;

  componentDidMount(): void {
  }

  public render(): ReactNode {
    return (
      <div className='main'>
        <div className={this.getSidebarClass()}>
          <Categories></Categories>
        </div>
        <div className='content'>

          <Switch>
            <Route path="/products" component={Products} ></Route>
            <Route path="/category/:id" component={Products} ></Route>
            <AuthRoute path="/cart" component={Cart} ></AuthRoute>
            <AuthRoute path="/orders" component={Orders} ></AuthRoute>
          </Switch>
        </div>
      </div >
    )
  }

  public getSidebarClass(): string {
    const sidebarClass = 'sidebar';
    return this.props.sidebar ? sidebarClass + ' sidebar-show' : sidebarClass;
  }


}

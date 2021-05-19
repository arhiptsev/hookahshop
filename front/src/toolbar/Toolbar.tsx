import React, { Component, ReactNode } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthRender } from '../common/AuthRender';
import { UserButton } from '../components/Authentification/userButton/UserButton';
import CartButton from '../components/cart/CartButton';
import './Toolbar.scss';

export interface ToolbarProps {
  toogle: () => void;
}

export class Toolbar extends Component<ToolbarProps> {

  componentDidMount() {
  }

  public render(): ReactNode {

    return (
      <Navbar bg="light" expand="lg">
        <Button variant="primary" onClick={this.props.toogle}>Категории</Button>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Главная
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Кальяны
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <AuthRender>
          <Button variant="primary" as={Link} to="/orders" className="cartButton">Заказы</Button>
        </AuthRender>
        <AuthRender>
          <CartButton className="cartButton"></CartButton>
        </AuthRender>
        <UserButton></UserButton>
      </Navbar>
    )
  }


}


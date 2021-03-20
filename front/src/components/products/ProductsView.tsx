import React from 'react';
import { Button, Card } from 'react-bootstrap';

import './ProductsView.scss';


const ProductsView = ({ products, addToCartHandler, cartEnable }) => (
    <div className="ProductsView">
        <h2>Товары</h2>
        <div  className="products-grid">
            {products.map((product, index) => (


                <Card style={{ width: '18rem' }} key={index}>
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            {product.desc}
                        </Card.Text>
                        <Card.Text>
                            {product.price}
                        </Card.Text>
                        {cartEnable && (<Button variant="primary" onClick={() => addToCartHandler(product.id)}>В корзину</Button>)}
                    </Card.Body>
                </Card>

            ))}
        </div>
    </div>
);

export default ProductsView;

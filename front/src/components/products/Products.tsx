import { gql } from '@apollo/client';
import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { apolloClient } from '../..';
import { AxiosInstance } from '../../common/Axios';
import Config from '../../common/config';
import { fetchNotifyHandler } from '../../utils/notifyHandler';

import './Products.scss';
import ProductsView from './ProductsView';


export function getProducts(id?: number): Promise<any[]> {
    return id ?
        AxiosInstance.post(
            Config.graphQlUrl,
            {
                query: `
        {
        category(id: ${id}) {
            products {
                id,
                name,
                desc,
                price,
                count
            }
        }
        }
        `
            }
        ).then(res => res.data.data.category.products)
        : AxiosInstance.post(
            Config.graphQlUrl,
            {
                query: `
        {
        products {
            id,
            name,
            desc,
            price,
            count
        }
        }
        `
            }
        ).then(res => res.data.data.products)

}




const ADD_TO_CART_QUERY = gql`
  mutation addToCart($id: Int) { 
    addToCart(productId: $id) {
        id
    }
  }
`;



class Products extends Component<any, any> {

    public state = {
        products: []
    }

    public addToCartHandler(id: number): void {
        apolloClient.mutate({
            mutation: ADD_TO_CART_QUERY,
            variables: {
                id
            }
        }).then(fetchNotifyHandler(
            'Товар успешно добавлен в корзину',
            'Ошибка добавления в корзину',
        ));
    }


    componentDidMount(): void {
        const { id } = this.props.match.params
        getProducts(id).then(res => this.setState({
            products: res
        }));
    }

    componentWillReceiveProps(props): void {
        const { id } = props.match.params;
        getProducts(id).then(res => this.setState({
            products: res
        }));
    }





    public render(): ReactNode {
        return (
            <ProductsView
                cartEnable={Boolean(this.props.currentUser)}
                products={this.state.products}
                addToCartHandler={this.addToCartHandler.bind(this)} ></ProductsView>
        );
    }

}

export default connect<any, any, any, any>(
    state => ({ currentUser: state.currentUser })
)(Products);



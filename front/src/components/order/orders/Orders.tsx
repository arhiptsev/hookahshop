import React, { Component, ReactNode } from 'react';
import { AxiosInstance } from '../../../common/Axios';
import Config from '../../../common/config';
import { OrderTable } from '../order-table/OrderTable';
import './Orders.scss';


export function getOrders(): Promise<any[]> {

    return AxiosInstance.post(
        Config.graphQlUrl,
        {
            query: `
        {
            orders  {
                id, 
                created_at,
                items{
                    count
                }
            }
        }
        `
        }
    ).then(res => res.data.data.orders)


}

export function deleteOrder(id: number): Promise<boolean> {
    return AxiosInstance.post(
        Config.graphQlUrl,
        {
            query: `
        mutation {
            removeOrder(id: ${id}) {isSuccess}
        }
        `
        }
    ).then(res => res.data.data.isSuccess)
}



export default class Orders extends Component<any, any> {

    public state = {
        orders: []
    }


    componentDidMount(): void {
        this.getOrders();
    }


    public render(): ReactNode {
        return (
            <div className="orders-container">
                <OrderTable
                 orders={this.state.orders} 
                 deleteOrder={this.deleteOrder.bind(this)}></OrderTable>
            </div>
        );
    }

    private getOrders(): void {
        getOrders().then(res => this.setState({
            orders: res
        }));
    }

    public deleteOrder(id: number): void {
        deleteOrder(id).then(() => this.getOrders());
    }

}



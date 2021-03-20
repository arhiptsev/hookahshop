import Axios from "axios"
import Config from "../../common/config";

export const getProductsAction = (id?: number) => (dispatch, getState) => {



    const query: Promise<any[]> = id ?
        Axios.post(
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
        : Axios.post(
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
        
        
        query.then(res => {
            dispatch({
                type: 'GET_PRODUCTS',
                payload: res
            })
        });
}


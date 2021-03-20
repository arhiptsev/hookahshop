import Axios from 'axios';
import React, { Component, ReactNode } from 'react';
import { ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Config from '../../common/config';
import { GraphQlResponse } from '../../types/graphql';
import './Categories.scss';



export interface CategoriesState {
  categories: any[];
}

export default class Categories extends Component<any, CategoriesState> {

  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount(): void {
    Axios.post<GraphQlResponse<CategoriesState>>(
      Config.graphQlUrl,
      {
        query: `
          {
              categories {
                  id, name
              }
          }
          `
      }
    ).then(res => this.setState(res.data.data))
  }



  public render(): ReactNode {
    return (
        <ListGroup className="nav-list">
          {this.state.categories.map((c, i) => (<ListGroup.Item key={i} as={Link} to={`/category/${c.id}`}>{c.name}</ListGroup.Item>))}
        </ListGroup>
    );
  }
}
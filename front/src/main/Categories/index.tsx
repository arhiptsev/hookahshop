import { useQuery } from '@apollo/client';
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GET_CAREGORIES_QUERY } from '../../graphql';

export interface CategoriesState {
  categories: any[];
}

export const Categories = () => {
  const { data, loading, error } = useQuery(GET_CAREGORIES_QUERY);

  if (loading || error) return null;

  const { categories } = data;

  return (
    <ListGroup>
      {categories.map((c, i) => (
        <ListGroup.Item key={i} as={Link} to={`/category/${c.id}`}>
          {c.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

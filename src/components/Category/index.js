import React from 'react';
import Title from './Title';
import ThreeCards from '../Grids/ThreeCards';
import TwoCards from '../Grids/TwoCards';

function Category(props) {
  console.log(props.type,  props.recipes.filter((r) => r.type[0] === props.type))
  return props.recipes.filter((r) => r.type[0] === props.type).length > 0 ? (
    <>
      <Title title={props.title} type={props.type}></Title>
      {props.twoCards ? (
        <TwoCards recipes={props.recipes} type={props.type} />
      ) : (
        <ThreeCards recipes={props.recipes} type={props.type} />
      )}
    </>
  ) : null;
}

export default Category;

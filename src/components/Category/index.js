import React from 'react';
import Title from './Title';
import ThreeCards from '../Grids/ThreeCards';
import TwoCards from '../Grids/TwoCards';

function Category(props) {
  return (
    <>
      <Title
        title={props.title}
        type={props.type}
        showAll={props.showAll}
      ></Title>
      {props.twoCards ? (
        <TwoCards recipes={props.recipes} type={props.type} />
      ) : (
        <ThreeCards recipes={props.recipes} type={props.type} />
      )}
    </>
  );
}

export default Category;

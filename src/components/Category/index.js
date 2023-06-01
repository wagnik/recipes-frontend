import React from 'react';
import Title from './Title';
import ThreeCards from '../Grids/ThreeCards';
import TwoCards from '../Grids/TwoCards';
import styles from './styles.module.scss';

function Category(props) {
  return (
    <>
      <Title title={props.title} type={props.type}></Title>
      {props.twoCards ? (
        <TwoCards recipes={props.recipes} type={props.type} />
      ) : (
        <ThreeCards recipes={props.recipes} type={props.type} />
      )}
    </>
  );
}

export default Category;

import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants';
import ThreeCards from '../Categories/ThreeCards';
import TwoCards from '../Categories/TwoCards';
import CategoryTitle from '../CategoryTitle';
import styles from './styles.module.scss';

function Content(props) {
  return (
    <div className={styles.wrapper}>
      {props.recipes.length === 0 && 'Dodaj przepisy'}
      {props.recipes.filter((r) => r.type[0] === 'Śniadanie').length > 0 ? (
        <>
          <CategoryTitle title='Śniadania' type='Śniadanie'></CategoryTitle>
          <TwoCards recipes={props.recipes} type='Śniadanie'></TwoCards>
        </>
      ) : null}
      {props.recipes.filter((r) => r.type[0] === 'Obiad').length > 0 ? (
        <>
          <CategoryTitle title='Obiady' type='Obiad'></CategoryTitle>
          <ThreeCards recipes={props.recipes} type='Obiad'></ThreeCards>
        </>
      ) : null}
      {props.recipes.filter((r) => r.type[0] === 'Deser').length > 0 ? (
        <>
          <CategoryTitle title='Desery' type='Deser'></CategoryTitle>
          <TwoCards recipes={props.recipes} type='Deser'></TwoCards>
        </>
      ) : null}
    </div>
  );
}

export default Content;

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
      <CategoryTitle title='Śniadania' type='Śniadanie'></CategoryTitle>
      <TwoCards recipes={props.recipes} type='Śniadanie'></TwoCards>
      <CategoryTitle title='Obiady' type='Obiad'></CategoryTitle>
      <ThreeCards recipes={props.recipes} type='Obiad'></ThreeCards>
      <CategoryTitle title='Desery' type='Deser'></CategoryTitle>
      <TwoCards recipes={props.recipes} type='Deser'></TwoCards>
    </div>
  );
}

export default Content;

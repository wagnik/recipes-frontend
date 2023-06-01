import React from 'react';
import styles from './styles.module.scss';
import Category from '../Category';

function MainContent(props) {
  return (
    <div className={styles.wrapper}>
      {props.recipes.length === 0 && (
        <>
          <Category twoCards={true} />
          <Category twoCards={false} />
          <Category twoCards={true} />
          <Category twoCards={false} />
        </>
      )}
      <Category
        type='Śniadanie'
        title='Śniadania'
        recipes={props.recipes}
        twoCards={true}
      />
      <Category
        type='Obiad'
        title='Obiady'
        recipes={props.recipes}
        twoCards={false}
      />
      <Category
        type='Deser'
        title='Desery'
        recipes={props.recipes}
        twoCards={true}
      />
      <Category title='Wszystkie' recipes={props.recipes} twoCards={false} />
    </div>
  );
}

export default MainContent;

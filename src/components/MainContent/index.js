import React from 'react';
import styles from './styles.module.scss';
import Category from '../Category';

function MainContent(props) {
  const recipes = props.recipes;

  return (
    <div className={styles.wrapper}>
      {recipes.length === 0 ? (
        <>
          <Category twoCards={true} />
          <Category twoCards={false} />
          <Category twoCards={false} />
          <Category twoCards={false} />
        </>
      ) : (
        <>
          <Category
            title='Ostatnio dodane...'
            recipes={recipes}
            twoCards={false}
          />
          <Category
            type='Śniadanie'
            title='Śniadania'
            recipes={recipes}
            twoCards={true}
            showAll={true}
          />
          <Category
            type='Obiad'
            title='Obiady'
            recipes={recipes}
            twoCards={false}
            showAll={true}
          />
          <Category
            type='Deser'
            title='Desery'
            recipes={recipes}
            twoCards={false}
            showAll={true}
          />
          <Category
            title='Wszystkie'
            recipes={recipes}
            twoCards={false}
            showAll={true}
          />
        </>
      )}
    </div>
  );
}

export default MainContent;

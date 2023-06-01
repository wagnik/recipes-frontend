import React from 'react';
import styles from './styles.module.scss';

function Description(props) {
  return (
    <>
      <div className={styles.dash} />
      <div className={styles.description}>
        {props.showIngredients ? (
          <>
            <p className={styles.descriptionTitle}>Składniki</p>
            <ul>
              {props.previewIngredients &&
                props.previewIngredients.map((i, index) => {
                  return i ? <li key={index}>{i}</li> : <br></br>;
                })}
            </ul>
          </>
        ) : (
          props.ingredients &&
          props.ingredients.length > 0 && (
            <>
              <p className={styles.descriptionTitle}>Składniki</p>
              <ul>
                {props.ingredients &&
                  props.ingredients.map((i, index) => {
                    return i ? <li key={index}>{i}</li> : <br></br>;
                  })}
              </ul>
            </>
          )
        )}
        {props.description ? (
          <>
            <p className={styles.descriptionTitle}>Przygotowanie</p>
            <div className={styles.descriptionArea}>{props.description}</div>
          </>
        ) : (
          <>
            <p className={styles.descriptionTitlePlaceholder} />
            <div className={styles.descriptionAreaPlaceholder} />
          </>
        )}
      </div>
    </>
  );
}

export default Description;

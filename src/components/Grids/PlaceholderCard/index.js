import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';
import rightArrowIcon from '../../../statics/icons/rightArrow.svg';

function PlaceholderCard(props) {
  return (
    <div className={styles.card}>
      <div className={styles.imagePlaceholder}>&nbsp;</div>
      <div className={styles.content}>
        <div
          className={clsx(
            styles.titlePlaceholder,
            (props.size === 'threeCards' || 'grid') && styles.left
          )}
        >
          &nbsp;
        </div>
        {props.size === 'grid' && (
          <img className={styles.icon} src={rightArrowIcon} alt={'arrow'} />
        )}
        {props.size !== 'grid' && (
          <div className={styles.descriptionPlaceholder}></div>
        )}
        {props.size === 'threeCards' && <div className={styles.dash} />}
      </div>
    </div>
  );
}

export default PlaceholderCard;

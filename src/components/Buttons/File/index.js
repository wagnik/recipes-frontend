import React from 'react';

import styles from './styles.module.scss';

function FileButton(props) {
  return (
    <div className={styles.wrapper}>
      <input type='file' onChange={props.onChange} name='img' />
    </div>
  );
}

export default FileButton;

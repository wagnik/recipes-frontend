import React from 'react';
import FileBase64 from 'react-file-base64';

import styles from './styles.module.scss';

function FileButton(props) {
  return (
    <div className={styles.wrapper}>
      <FileBase64 multiple={false} onDone={props.onDone} />
      {/* <input
      type='file'
      accept={'image/*'}
      onChange={handleChange('image')}
    />
    <div>
      <img
        className={styles.removeIcon2}
        onClick={() => setValues({ ...values, image: recipe.img })}
        src={removeIcon}
        alt={TRANSLATION.remove}
        title={TRANSLATION.remove}
      />
    </div> */}
    </div>
  );
}

export default FileButton;

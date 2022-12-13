import { ColorButton } from '../Button/ColorButton';
import styles from './Form.module.scss';
import React, { useState } from 'react';

function Form(props) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [war, setWar] = useState(false);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleChange2 = (event) => {
    setDesc(event.target.value);
  };
  return (
    <div className={styles.wrapper}>
      Title: <input value={title} onChange={handleChange} />
      Opis: <textarea value={desc} onChange={handleChange2} />
      <ColorButton
        title={props.buttonName}
        onClick={async () => {
          if (props.id) {
            await props.onClick(props.id, title, desc);
            return;
          }
          if (!title || !desc) {
            setWar(!war);
            return;
          }
          await props.onClick(title, desc);
        }}
      />
      {war && <div>Brakujace pola!</div>}
    </div>
  );
}

export default Form;

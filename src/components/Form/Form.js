import { ColorButton } from '../Button/ColorButton';
import styles from './Form.module.scss';
import React, { useState } from 'react';
import FileBase64 from 'react-file-base64';

function Form(props) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [war, setWar] = useState(false);
  const [img, setFiles] = useState('');
  const [tags, setTags] = useState([]);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleChange2 = (event) => {
    setDesc(event.target.value);
  };
  const handleChange3 = (base64) => {
    setFiles(base64);
  };
  const handleChange4 = (event) => {
    if (event.target.value === '') {
      setTags([]);
      return;
    }
    setTags(event.target.value.split(','));
  };

  return (
    <div className={styles.wrapper}>
      <div>
        Title: <input value={title} onChange={handleChange} />
      </div>
      <div>
        Opis: <textarea value={desc} onChange={handleChange2} />
      </div>
      <div>
        <FileBase64 multiple={false} onDone={handleChange3} />
      </div>
      <div>
        Tagi: <input value={tags} onChange={handleChange4} />
      </div>

      <div className={styles.button}>
        <ColorButton
          title={props.buttonName}
          onClick={async () => {
            if (props.id) {
              await props.onClick(props.id, title, desc, img.base64, tags);
              return;
            }
            if (!title || !desc) {
              setWar(!war);
              return;
            }
            await props.onClick(title, desc, img.base64, tags);
          }}
        />
      </div>
      {war && <div className={styles.war}>Brakujace pola!</div>}
    </div>
  );
}

export default Form;

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import { SaveButton } from '../../Buttons';
import { addRecipe, editRecipe } from '../../../services/recipeService';
import { PATH, TRANSLATION } from '../../../constants';
import config from '../../../config.json';
import logo from './../../../logo.svg';
import backIcon from '../../../images/right-arrow.png';
import styles from './styles.module.scss';

function Recipe(props) {
  const appTitle = config.appTitle;
  const navigate = useNavigate();
  const { id } = useParams();

  const [values, setValues] = useState({
    title: '',
    description: '',
    image: '',
    tags: [],
  });
  const [warning, setWarning] = useState(false);

  const { title, description, image, tags } = values;

  const handleChange = (fieldName) => (event, base64) => {
    const currentValue = event.target.value;

    if (fieldName === 'tags') {
      setValues({
        ...values,
        [fieldName]: currentValue === '' ? [] : currentValue.split(','),
      });
      return;
    }

    setValues({
      ...values,
      [fieldName]: base64 ?? event.target.value,
    });
  };

  const handleClick = async () => {
    if (id) {
      await editRecipe(id, title, description, image.base64, tags).then(() =>
        props.setRefreshKey((oldKey) => oldKey + 1)
      );
      navigate(PATH.MAIN);
      return;
    }
    if (!title || !description) {
      setWarning(true);
      return;
    }

    await addRecipe(title, description, image.base64, tags).then(() =>
      props.setRefreshKey((oldKey) => oldKey + 1)
    );
    props.setVisibleNavigation(true);
    navigate(PATH.MAIN);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <img
          className={styles.backIcon}
          onClick={() => {
            navigate(-1);
            props.setRefreshKey((oldKey) => oldKey + 1);
            props.setVisibleNavigation(true);
          }}
          src={backIcon}
          alt={TRANSLATION.RETURN}
          title={TRANSLATION.RETURN_PREV_PAGE}
        />
        <div className={styles.logoInput}>
          <div className={styles.logo}>
            <img
              src={logo}
              className={styles.logoImage}
              alt={TRANSLATION.LOGO}
            />
            <div className={styles.logoTitle}>{appTitle}</div>
          </div>
        </div>
        <div className={styles.inputs}>
          <div>
            <p>TYTUŁ</p>
            <input value={title} onChange={handleChange('title')} />
          </div>
          <div>
            <p>OPIS</p>
            <input
              value={description}
              onChange={handleChange('descritption')}
            />
          </div>
          <div>
            <div className={styles.imageInput}>
              <FileBase64 multiple={false} onDone={handleChange('image')} />
            </div>
          </div>
          <div>
            <p>TAGI</p>
            <input value={tags} onChange={handleChange('tags')} />
          </div>
        </div>
        <div className={styles.button}>
          <SaveButton
            title={props.buttonName}
            login={true}
            onClick={handleClick}
          />
        </div>
      </div>
      {warning && <div className={styles.war}>Brakujące pola!</div>}
    </div>
  );
}

export default Recipe;

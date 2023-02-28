import React, { useState } from 'react';
import clsx from 'clsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import { SaveButton } from '../../Buttons';
import { addRecipe, editRecipe } from '../../../services/recipeService';
import { PATH, TRANSLATION } from '../../../constants';
import config from '../../../config.json';
import logo from './../../../logo.svg';
import backIcon from '../../../statics/images/right-arrow.png';
import cake from '../../../statics/images/cake.png';
import styles from './styles.module.scss';

function Recipe(props) {
  const appTitle = config.appTitle;
  const navigate = useNavigate();
  const { id } = useParams();

  const [values, setValues] = useState({
    title: '',
    description: '',
    image: '',
    type: [],
  });
  const [warning, setWarning] = useState(false);

  const { title, description, image, type } = values;
  console.log(image);
  const handleChange = (fieldName) => (event, base64) => {
    const currentValue = event.target.value;

    if (fieldName === 'type') {
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
      await editRecipe(id, title, description, image.base64, type).then(() =>
        props.setRefreshKey((oldKey) => oldKey + 1)
      );
      navigate(PATH.MAIN);
      return;
    }
    if (!title || !description) {
      setWarning(true);
      return;
    }

    await addRecipe(title, description, image.base64, type).then(() =>
      props.setRefreshKey((oldKey) => oldKey + 1)
    );
    navigate(PATH.MAIN);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <Link to={PATH.MAIN} className={styles.link}>
          {'< wróć na stronę główną'}
        </Link>
        <div className={styles.heading}>Dodaj przepis</div>
        <div className={styles.paragraph}>
          Podaj wszystkie potrzebne składniki, instrukcję krok po kroku oraz
          wrzuć zdjęcia, jeżeli takie posiadasz. Na pewno zachęci to innych do
          wypróbowania Twoich przepisów
        </div>
        <div className={styles.inputs}>
          <div>
            <h5>Tytuł</h5>
            <input
              className={styles.test}
              value={title}
              onChange={handleChange('title')}
            />
          </div>
          <div>
            <h5>Opis</h5>
            <textarea
              className={styles.test}
              value={description}
              onChange={handleChange('description')}
            />
          </div>
          <div>
            <h5>Zdjęcie</h5>
            <div className={styles.imageInput}>
              <FileBase64
                multiple={false}
                onDone={(base64) => setValues({ ...values, image: base64 })}
              />
            </div>
          </div>
          <div className={styles.select}>
            <h5>Rodzaj</h5>
            <select onChange={handleChange('type')} value={type} multiple>
              <option value='Śniadanie'>Śniadanie</option>
              <option value='Obiad'>Obiad</option>
              <option value='Deser'>Deser</option>
            </select>
          </div>
        </div>
        <div className={styles.button}>
          <SaveButton
            title={props.buttonName}
            form={true}
            onClick={handleClick}
          />
        </div>
      </div>
      <div className={styles.bg}>
        <img className={styles.image} src={cake} alt={'cake'} />
      </div>
    </div>
  );
}

export default Recipe;

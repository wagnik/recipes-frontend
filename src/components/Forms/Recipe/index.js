import React, { useState } from 'react';
import clsx from 'clsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import { NavButton, SaveButton } from '../../Buttons';
import { addRecipe, editRecipe } from '../../../services/recipeService';
import { PATH, TRANSLATION } from '../../../constants';
import config from '../../../config.json';
import logo from './../../../logo.svg';
import backIcon from '../../../statics/images/right-arrow.png';
import cake from '../../../statics/images/cake.png';
import styles from './styles.module.scss';
import removeIcon from '../../../statics/images/remove-icon.svg';
import { EditText, EditTextarea } from 'react-edit-text';

function Recipe(props) {
  const appTitle = config.appTitle;
  const navigate = useNavigate();
  const { id } = useParams();
  const [ areIngredients, setIngredients] = useState(false);

  const [values, setValues] = useState({
    title: '',
    description: '',
    image: '',
    type: [],
    ingredients: []
  });
  const [warning, setWarning] = useState(false);

  const { title, description, image, ingredients, type } = values;
  const handleChange = (fieldName) => (event, base64) => {
    const currentValue = event.target.value;

    if (fieldName === 'ingredients') {
      const ingredients = event.target.value.split('\n').filter(e => e !== '');
      setValues({
        ...values,
        [fieldName]: ingredients,
      });
      return;
    }
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
      await editRecipe(id, title, description, image.base64, ingredients, type).then(() =>
        props.setRefreshKey((oldKey) => oldKey + 1)
      );
      navigate(PATH.MAIN);
      return;
    }
    if (!title || !description) {
      setWarning(true);
      return;
    }

    await addRecipe(title, description, image.base64, ingredients, type).then(() =>
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
              placeholder='Przykładowy tytuł'
              onChange={handleChange('title')}
            />
          </div>
          <div>
            <div className={styles.checkbox}>
              <h5>Składniki</h5>
              <input type="checkbox" value={areIngredients} onClick={() => setIngredients(!areIngredients)}></input>
            </div>
            {<textarea rows={5} 
              disabled={!areIngredients}               
              className={styles.test}
              placeholder={areIngredients && "Dodawaj kolejne składniki po kliknięciu 'Enter'"}
              onChange={handleChange('ingredients')}
            />}
          </div>
          <div>
            <h5>Przygotowanie</h5>
            <textarea
              className={styles.test}
              value={description}
              rows={8}
              placeholder='Dodaj instrukcję krok po kroku'
              onChange={handleChange('description')}
            />
          </div>
          <div>
            <h5>Zdjęcie</h5>
            <div className={styles.editImage}>
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
          <NavButton title={'Anuluj'} onClick={() => navigate(PATH.MAIN)} />
          <SaveButton title={props.buttonName} onClick={handleClick} />
        </div>
      </div>
      <div className={styles.preview}>
        <div className={styles.image}>
          {image && <img
            className={styles.image}
            src={URL.createObjectURL(image.file) }
            alt={'cake'}
          />}
        </div>
         <div className={styles.recipeTitle}>
            {title || 'Przykładowy tytuł'}
          </div>
        <div className={styles.dash} />
        <div className={styles.desc}>
          {areIngredients ? (
            <>
            <p className={styles.descTitle}>Składniki</p>
            <ul>
            {ingredients.map((i) => <li>{i}</li>)}
            </ul>
            </>
          ) : null}
          <p className={styles.descTitle}>Przygotowanie</p>
          <p className={styles.description}>
            {description || 'Dodaj instrukcję krok po kroku'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Recipe;

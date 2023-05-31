import React, { useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import { UserContext } from '../../../App';
import { addRecipe, editRecipe } from '../../../services/recipeService';
import { TransparrentButton, BgColorButton } from '../../Buttons';
import { PATH } from '../../../constants';
import styles from './styles.module.scss';

function Recipe(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const userContext = useContext(UserContext);

  const [values, setValues] = useState({
    title: '',
    description: '',
    image: '',
    type: [],
    ingredients: [],
    showIngredients: true,
    author: userContext
      ? {
          id: userContext.id,
          name: userContext.name,
        }
      : {},
  });

  const {
    title,
    description,
    image,
    ingredients,
    showIngredients,
    type,
    author,
  } = values;

  const handleChange = (fieldName) => (event, base64) => {
    const currentValue = event.target.value;

    if (fieldName === 'ingredients') {
      const ingredients = event.target.value.split('\n');

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
  console.log(values)
  const handleClick = async () => {
    if (id) {
      await editRecipe(
        id,
        title,
        description,
        image.base64,
        ingredients,
        showIngredients,
        type
      ).then(() => props.setRefreshKey((oldKey) => oldKey + 1));
      navigate(PATH.MAIN);
      return;
    }

    await addRecipe(
      title,
      description,
      image.base64,
      ingredients,
      type,
      author
    ).then(() => props.setRefreshKey((oldKey) => oldKey + 1));
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
              className={styles.placeholder}
              value={title}
              placeholder='Przykładowy tytuł'
              onChange={handleChange('title')}
            />
          </div>
          <div>
            <div className={styles.checkbox}>
              <h5>Składniki</h5>
              <input
                type='checkbox'
                value={showIngredients}
                onClick={() =>
                  setValues({
                    ...values,
                    showIngredients: !values.showIngredients,
                  })
                }
              ></input>
            </div>
            {
              <textarea
                rows={5}
                disabled={showIngredients}
                className={styles.placeholder}
                placeholder={
                  !showIngredients
                    ? "Dodawaj kolejne składniki po kliknięciu 'Enter'"
                    : 'Kliknij checkbox by dodać składniki'
                }
                onChange={handleChange('ingredients')}
              />
            }
          </div>
          <div>
            <h5>Przygotowanie</h5>
            <textarea
              className={styles.placeholder}
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
          <TransparrentButton
            title={'Anuluj'}
            onClick={() => navigate(PATH.MAIN)}
          />
          <BgColorButton title={props.buttonName} onClick={handleClick} />
        </div>
      </div>
      <div className={styles.preview}>
        <div className={styles.image}>
          {image && (
            <img
              className={styles.image}
              src={URL.createObjectURL(image.file)}
              alt={'cake'}
            />
          )}
        </div>
        <div className={styles.recipeTitle}>{title || 'Przykładowy tytuł'}</div>
        <div className={styles.dash} />
        <div className={styles.description}>
          {!showIngredients ? (
            <>
              <p className={styles.descriptionTitle}>Składniki</p>
              <ul>
                {ingredients.map((ing, index) => {
                  return ing ? <li key={index}>{ing}</li> : <br></br>;
                })}
              </ul>
            </>
          ) : null}
          <p className={styles.descriptionTitle}>Przygotowanie</p>
          <p className={styles.descriptionArea}>
            {description || 'Dodaj instrukcję krok po kroku'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Recipe;

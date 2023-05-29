import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { EditText, EditTextarea } from 'react-edit-text';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchRecipe, deleteRecipe } from '../../../services/recipeService';
import backIcon from '../../../statics/images/right-arrow.png';
import editIcon from '../../../statics/images/edit.svg';
import removeIcon from '../../../statics/images/remove-icon.svg';
import styles from './styles.module.scss';
import { PATH, TRANSLATION } from '../../../constants';
import { SaveButton, NavButton } from '../../Buttons';
import FileBase64 from 'react-file-base64';
import { editRecipe } from '../../../services/recipeService';

function Edit(props) {
  const [recipe, getRecipe] = React.useState({
    title: '',
    description: '',
    image: '',
    ingredients: [],
    showIngredients: true,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const modalRef = useRef();
  const [values, setValues] = React.useState({
    title: '',
    description: '',
    image: '',
    ingredients: [],
    showIngredients: false,
  });

  const { title, description, image, ingredients, type, showIngredients } =
    values;
  console.log(recipe.ingredients, showIngredients);
  const handleChange = (fieldName) => (event, base64) => {
    if (fieldName === 'image') {
      setValues({
        ...values,
        [fieldName]: event.target.value,
      });
    }
    if (fieldName === 'ingredients') {
      const ingredients = event.target.value.split('\n');

      setValues({
        ...values,
        [fieldName]: ingredients,
      });
      return;
    }
    setValues({
      ...values,
      [fieldName]: base64 ?? event.target.value,
    });
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      await fetchRecipe(id).then((data) => {
        getRecipe(data);
        setValues({
          ...values,
          showIngredients: data.ingredients && data.ingredients.length > 0,
        });
      });
    };
    fetchRecipes();
  }, [id]);

  const handleClick = async () => {
    if (id || title || description || ingredients || showIngredients) {
      await editRecipe(
        id,
        title,
        description,
        image.base64,
        ingredients,
        showIngredients,
        type
      ).then(() => props.setRefreshKey((oldKey) => oldKey + 1));
      navigate(-1);
      return;
    }
  };

  return (
    <div ref={modalRef} className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.recipeWrapper}>
          <div className={styles.bg}>
            <img
              className={styles.bg}
              src={
                image.file
                  ? URL.createObjectURL(image.file || image)
                  : recipe.img
              }
            />
          </div>

          <div className={styles.content}>
            <div className={styles.editImage}>
              <FileBase64
                multiple={false}
                onClick='this.form.reset()'
                onDone={(base64) => setValues({ ...values, image: base64 })}
              />
              <input
                type='file'
                accept={'image/*'}
                onChange={handleChange('image')}
              />
              <div>
                <img
                  className={styles.removeIcon2}
                  onClick={() => setValues({ ...values, image: recipe.img })}
                  src={removeIcon}
                  alt={TRANSLATION.REMOVE}
                  title={TRANSLATION.REMOVE}
                />
              </div>
            </div>
            <EditText
              className={styles.recipeTitle}
              inputClassName={clsx(styles.recipeTitle, styles.editField)}
              value={title || recipe.title}
              onChange={handleChange('title')}
            />
            <div className={styles.dash} />
            <div className={styles.desc}>
              <>
                <div className={styles.checkbox}>
                  <p className={styles.descTitle}>Składniki</p>
                  <input
                    type='checkbox'
                    value={showIngredients}
                    checked={showIngredients}
                    onClick={() =>
                      setValues({
                        ...values,
                        showIngredients: !values.showIngredients,
                      })
                    }
                  ></input>
                </div>
                <EditTextarea
                  rows={4}
                  readonly={!showIngredients}
                  inputClassName={clsx(
                    styles.editField,
                    styles.te,
                    styles.description
                  )}
                  className={clsx(
                    styles.editField,
                    styles.description,
                    !showIngredients && styles.disabled
                  )}
                  placeholder={
                    showIngredients
                      ? "Dodawaj kolejne składniki po kliknięciu 'Enter'"
                      : 'Zaznacz checkbox jeśli chcesz wyświetlać składniki, inaczej zostaną usunięte'
                  }
                  value={
                    showIngredients
                      ? ingredients.join('\n') || recipe.ingredients.join('\n')
                      : ''
                  }
                  onChange={handleChange('ingredients')}
                />
              </>
              <p className={styles.descTitle}>Przygotowanie</p>
              <EditTextarea
                className={styles.description}
                inputClassName={clsx(styles.editField, styles.description)}
                rows={5}
                value={description || recipe.description}
                onChange={handleChange('description')}
              />
            </div>
          </div>
        </div>
        <div className={styles.save}>
          <NavButton title={'Anuluj'} onClick={() => navigate(-1)}></NavButton>
          <SaveButton
            title={TRANSLATION.SAVE}
            onClick={handleClick}
          ></SaveButton>
        </div>
      </div>
    </div>
  );
}

export default Edit;

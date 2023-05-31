import React, { useEffect, useRef } from 'react';
import { EditText, EditTextarea } from 'react-edit-text';
import { useParams, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import FileBase64 from 'react-file-base64';
import { BgColorButton, TransparrentButton } from '../../Buttons';
import { editRecipe, fetchRecipe } from '../../../services/recipeService';
import { TRANSLATION } from '../../../constants';
import removeIcon from '../../../statics/images/remove-icon.svg';
import styles from './styles.module.scss';

function Edit(props) {
  const { id } = useParams();
  const modalRef = useRef();
  const navigate = useNavigate();

  const [recipe, getRecipe] = React.useState({
    title: '',
    description: '',
    image: '',
    ingredients: [],
    showIngredients: true,
  });
  const [values, setValues] = React.useState({
    title: '',
    description: '',
    image: '',
    ingredients: [],
    showIngredients: false,
  });

  const { title, description, image, ingredients, type, showIngredients } =
    values;

  const handleChange = (fieldName) => (event, base64) => {
    // if (fieldName === 'image') {
    //   setValues({
    //     ...values,
    //     [fieldName]: event.target.value,
    //   });
    // }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div className={styles.bgImage}>
            <img
              className={styles.bgImage}
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
                // onClick='this.form.reset()'
                onDone={(base64) => setValues({ ...values, image: base64 })}
              />
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
                  alt={TRANSLATION.REMOVE}
                  title={TRANSLATION.REMOVE}
                />
              </div> */}
            </div>
            <EditText
              className={styles.recipeTitle}
              inputClassName={clsx(styles.recipeTitle, styles.editField)}
              value={title || recipe.title}
              onChange={handleChange('title')}
            />
            <div className={styles.dash} />
            <div className={styles.description}>
              <>
                <div className={styles.checkbox}>
                  <p className={styles.descriptionTitle}>Składniki</p>
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
                    styles.descriptionArea,
                    styles.editField,
                    styles.ingredientsArea
                  )}
                  className={clsx(
                    styles.editField,
                    styles.descriptionArea,
                    styles.ingredientsArea,
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
              <p className={styles.descriptionTitle}>Przygotowanie</p>
              <EditTextarea
                className={styles.descriptionArea}
                inputClassName={clsx(styles.editField, styles.descriptionArea)}
                rows={8}
                value={description || recipe.description}
                onChange={handleChange('description')}
              />
            </div>
          </div>
        </div>
        <div className={styles.saveArea}>
          <TransparrentButton
            title={'Anuluj'}
            onClick={() => navigate(-1)}
          ></TransparrentButton>
          <BgColorButton
            title={TRANSLATION.SAVE}
            onClick={handleClick}
          ></BgColorButton>
        </div>
      </div>
    </div>
  );
}

export default Edit;

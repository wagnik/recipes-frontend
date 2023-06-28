import React, { useEffect } from 'react';
import clsx from 'clsx';
import { EditText, EditTextarea } from 'react-edit-text';
import { useParams } from 'react-router-dom';

import Image from '../../Recipe/Image';
import { editRecipe, fetchRecipe } from '../../../services/recipeService';
import { ColorButton, FileButton, TransparrentButton } from '../../Buttons';
import { FORM_TITLES, PLACEHOLDER, TRANSLATION } from '../../constants';

import styles from './styles.module.scss';

function Edit(props) {
  const { id } = useParams();
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

  const { addTitle, addIngredients, noIngredients, addDescription } =
    PLACEHOLDER;

  const handleImageFile = (e) =>
    setValues({ ...values, image: e.target.files[0] });
  const handleChange = (fieldName) => (event, base64) => {
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
      [fieldName]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      await fetchRecipe(id).then((data) => {
        getRecipe(data);
        setValues({
          ...values,
          title: data.title,
          description: data.description,
          showIngredients: data.ingredients && data.ingredients.length > 0,
        });
      });
    };
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleClick = async () => {
    if (id || title || description || image || ingredients || showIngredients) {
      await editRecipe(
        id,
        title,
        description,
        image,
        ingredients,
        showIngredients,
        type
      ).then(() => props.setRefreshKey((oldKey) => oldKey + 1));
      props.setShowModal(false);
      return;
    }
  };

  return props.showModal ? (
    <div
      className={styles.wrapper}
      onClick={(e) => {
        props.setShowModal(false);
        e.stopPropagation();
      }}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.recipeWrapper}>
          <div className={styles.content}>
            <EditText
              className={styles.recipeTitle}
              inputClassName={clsx(styles.recipeTitle, styles.editField)}
              placeholder={addTitle}
              value={title}
              onChange={handleChange('title')}
            />
            <div className={styles.dash} />
            <Image
              src={image ? URL.createObjectURL(image) : recipe.img}
              title={recipe.title}
              edit={true}
            />
            <div className={styles.description}>
              <>
                <div className={styles.checkbox}>
                  <FileButton onChange={handleImageFile} />
                  <p className={styles.descriptionTitle}>
                    {FORM_TITLES.ingredients}
                  </p>
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
                  rows={8}
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
                  placeholder={showIngredients ? addIngredients : noIngredients}
                  value={
                    showIngredients
                      ? ingredients.join('\n') || recipe.ingredients.join('\n')
                      : ''
                  }
                  onChange={handleChange('ingredients')}
                />
              </>
              <p className={clsx(styles.descriptionTitle, styles.fullTitle)}>
                {FORM_TITLES.description}
              </p>
              <EditTextarea
                className={styles.descriptionArea}
                inputClassName={clsx(
                  styles.editField,
                  styles.descriptionArea,
                  styles.fullArea
                )}
                rows={8}
                placeholder={addDescription}
                value={description}
                onChange={handleChange('description')}
              />
            </div>
          </div>
        </div>
        <div className={styles.saveArea}>
          <TransparrentButton
            title={TRANSLATION.cancel}
            onClick={() => props.setShowModal(false)}
          ></TransparrentButton>
          <ColorButton
            title={TRANSLATION.save}
            onClick={handleClick}
          ></ColorButton>
        </div>
      </div>
    </div>
  ) : null;
}

export default Edit;

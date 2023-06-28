import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../../App';
import { addRecipe } from '../../../services/recipeService';

import {
  FORM_TITLES,
  PATH,
  PLACEHOLDER,
  TRANSLATION,
  TYPE_OPTIONS,
  WARNING_MESSAGE,
} from '../../constants';

import Title from '../../Recipe/Title';
import Image from '../../Recipe/Image';
import Description from '../../Recipe/Description';
import {
  TransparrentButton,
  ColorButton,
  FileButton,
  BackButton,
} from '../../Buttons';
import { Header } from '../components';

import styles from './styles.module.scss';

function Recipe(props) {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [inputClicked, setInputClicked] = useState(false);
  const [selectClicked, setSelectClicked] = useState(false);

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
  const [missingSubmitFields, setMissingSubmitFields] = useState({
    title: false,
    type: false,
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

  const validateField = (submitClicked, inputClicked, condition) =>
    submitClicked || inputClicked
      ? condition && WARNING_MESSAGE.missingField
      : null;

  const areTypesChosen = validateField(
    missingSubmitFields.type,
    selectClicked,
    type.length === 0
  );
  const isTitleFilled = validateField(
    missingSubmitFields.title,
    inputClicked,
    title === ''
  );

  const selectStyling = {
    control: (baseStyles) => ({
      ...baseStyles,
      fontSize: '1.125rem',
      fontWeight: '300',
      fontFamily: 'DM Sans, sans-serif',
      lineHeight: '1.2',
      border: areTypesChosen ? '2px solid #b33737' : '1px solid #b2afb0',
      boxShadow: 'none',
      '&:hover': {
        cursor: 'pointer',
        border: areTypesChosen ? '2px solid #b33737' : '1px solid #b2afb0',
      },
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '300',
      fontFamily: 'DM Sans, sans-serif',
      lineHeight: '1.2',
      backgroundColor: state.isFocused ? '#c48787' : 'white',
      outline: 'none',
      '&:active': {
        backgroundColor: '#b33737',
      },
    }),
    noOptionsMessage: (baseStyles) => ({
      ...baseStyles,
      fontSize: '1.125rem',
      fontWeight: '300',
      fontFamily: 'DM Sans, sans-serif',
      lineHeight: '1.2',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      ':hover': {
        backgroundColor: '#c48787',
        color: 'white',
      },
    }),
  };

  const handleImageFile = (e) =>
    setValues({ ...values, image: e.target.files[0] });
  const handleChange = (fieldName) => (event) => {
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
        [fieldName]: event,
      });
      return;
    }

    setValues({
      ...values,
      [fieldName]: event.target.value,
    });
  };

  const handleClick = async (event) => {
    event.preventDefault();

    if (!title || type.length === 0) {
      return setMissingSubmitFields({
        ...values,
        title: !title && true,
        type: type.length === 0 && true,
      });
    }

    await addRecipe(
      title,
      description,
      image,
      ingredients,
      type.map((t) => t.value),
      author
    ).then(() => props.setRefreshKey((oldKey) => oldKey + 1));
    navigate(PATH.main);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <BackButton />
        <Header title={FORM_TITLES.addRecipe} />
        <div className={styles.inputs}>
          <div>
            <h5>{FORM_TITLES.title}</h5>
            <input
              className={clsx(
                styles.placeholder,
                isTitleFilled && styles.warningInput
              )}
              value={title}
              placeholder={PLACEHOLDER.exampleTitle}
              onChange={handleChange('title')}
              onFocus={() => setInputClicked(true)}
            />
            {isTitleFilled && (
              <div className={styles.warningMessage}>{isTitleFilled}</div>
            )}
          </div>
          <div>
            <div className={styles.checkbox}>
              <h5>{FORM_TITLES.ingredients}</h5>
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
                    ? PLACEHOLDER.addIngredients
                    : PLACEHOLDER.noIngredients
                }
                onChange={handleChange('ingredients')}
              />
            }
          </div>
          <div>
            <h5>{FORM_TITLES.description}</h5>
            <textarea
              className={styles.placeholder}
              value={description}
              rows={8}
              placeholder={PLACEHOLDER.addDescription}
              onChange={handleChange('description')}
            />
          </div>
          <div>
            <h5>{FORM_TITLES.image}</h5>
            <FileButton onChange={handleImageFile} />
          </div>
          <div className={styles.select2}>
            <h5>{FORM_TITLES.category}</h5>
            <Select
              styles={selectStyling}
              options={TYPE_OPTIONS}
              value={type}
              isMulti
              onChange={handleChange('type')}
              onFocus={() => setSelectClicked(true)}
              placeholder={PLACEHOLDER.addCategories}
              noOptionsMessage={({ inputValue }) =>
                !inputValue && PLACEHOLDER.noMoreCategories
              }
            />
            {areTypesChosen && (
              <div className={styles.warningMessage2}>{areTypesChosen}</div>
            )}
          </div>
        </div>
        <div className={styles.button}>
          <TransparrentButton
            title={TRANSLATION.cancel}
            onClick={() => navigate(PATH.main)}
          />
          <ColorButton title={props.buttonName} onClick={handleClick} />
        </div>
      </div>
      <div className={styles.preview}>
        <div className={styles.previewContent}>
          <Title title={title || PLACEHOLDER.exampleTitle} />
          <div className={styles.dash} />
          {image ? (
            <Image
              src={URL.createObjectURL(image)}
              title={title}
              preview={true}
            />
          ) : (
            <div className={styles.image} />
          )}
          <Description
            showIngredients={!showIngredients}
            previewIngredients={ingredients}
            description={description || PLACEHOLDER.addDescription}
          />
        </div>
      </div>
    </div>
  );
}

export default Recipe;

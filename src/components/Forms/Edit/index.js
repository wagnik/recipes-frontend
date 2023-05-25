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
    ingredients: []
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const modalRef = useRef();
  const [ingr, setIngr] = React.useState([]);
  const [values, setValues] = React.useState({
    title: '',
    description: '',
    image: '',
    ingredients: []
  });
  
  const [ areIngredients, setIngredients] = useState(false);

  const { title, description, image, ingredients, type } = values;
  const { ingredients: ing } = recipe;
 console.log(ingr)
  const handleChange = (fieldName, index) => (event, base64) => {

    console.log(fieldName, index, 'ddd')
    if(fieldName === 'image') {
      setValues({
        ...values,
        [fieldName]: event.target.value,
      });
    }
    if (fieldName === 'ingredient') {
      let t = [...ingr];
      t = t.map((r, indexElement) => {
        console.log(indexElement, index)

        if(indexElement === index) {
          console.log(r, event.target.name)
          r = event.target.value;
        }
        return r;
      })
      t = t.filter(e => e !== '');
      // console.log(event.target.value, index, ingredients);
      // ingredients.map((i) => i[index] = event.target.value)
      // console.log(ingredients)
      setIngr(t)
      setValues({
        ...values,
        ['ingredients']: t
      });
      return;
    }
    if (fieldName === 'ingredients') {
      console.log(event.target.value)
      const ingredients = event.target.value.split('\n').filter(e => e !== '');
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
  // console.log(image.split('\\')[2]);
  useEffect(() => {
    const fetchRecipes = async () => {
      await fetchRecipe(id).then((data) => {
      
        getRecipe(data)
        setIngr(data.ingredients.filter(e => e !== ''))
      }
      );
    };
    fetchRecipes();
    
  }, [id]);

  const handleClick = async () => {
    if (id || title || description || ingredients) {
      console.log(ingredients)
      await editRecipe(id, title, description, image.base64, ingredients, type).then(() =>
        props.setRefreshKey((oldKey) => oldKey + 1)
      );
      navigate(-1);
      return;
    }
  };
  console.log(recipe.ingredients)
  // console.log(recipe);
  return (
    <div ref={modalRef} className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.recipeWrapper}>
          <div className={styles.bg}>
            <img
              className={styles.bg}
              src={image.file ? URL.createObjectURL(image.file || image) : recipe.img}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.editImage}>
              <FileBase64
                multiple={false}
                onClick="this.form.reset()"
                onDone={(base64) => setValues({ ...values, image: base64 })}
              />
              <input 
                type="file"
                accept={"image/*"}
                onChange={handleChange("image")}
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
              {recipe.ingredients && recipe.ingredients.length > 0 ? <>
                <p className={styles.descTitle}>Składniki</p>
                <ul>
                  {ingr.map((elem, index) => <li>
                      <EditText
                      inputClassName={clsx( styles.editFieldInput)}
                        className={styles.editFieldInput}
                        name={index}
                        value={elem}
                        onChange={handleChange('ingredient', index)}
                      />
                    </li>
                  )
                  }
                </ul>
              </> : <>
            <div className={styles.checkbox}>
              <p className={styles.descTitle}>Składniki</p>
              <input type="checkbox" value={areIngredients} onClick={() => setIngredients(!areIngredients)}></input>
            </div>
            {<textarea rows={5} 
              disabled={!areIngredients}               
              className={clsx(styles.editField, styles.description, !areIngredients && styles.disabled)}
              placeholder={areIngredients ? "Dodawaj kolejne składniki po kliknięciu 'Enter'" :
            "Zaznacz checkbox jeśli chcesz dodać brakujące"}
              onChange={handleChange('ingredients')}
            />}
              </>}
              <p className={styles.descTitle}>Przygotowanie</p>
              <EditTextarea
                className={styles.description}
                inputClassName={clsx(styles.editField, styles.description)}
                rows={6}
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

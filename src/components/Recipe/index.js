import React, { useEffect, useContext, useState } from 'react';
import clsx from 'clsx';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { fetchRecipe } from '../../services/recipeService';
import { PATH } from '../constants';

import Title from './Title';
import Author from './Author';
import Description from './Description';
import Image from './Image';
import { BackButton, EditButton, RemoveButton } from '../Buttons';

import styles from './styles.module.scss';

function Recipe(props) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const [recipe, setRecipe] = useState({});

  const { author } = recipe;

  const handleClick = () => navigate(PATH.main);

  useEffect(() => {
    const fetchRecipes = async () => {
      await fetchRecipe(id).then((data) => setRecipe(data));
    };
    fetchRecipes();
  }, [id, props.refreshKey]);

  return (
    <div className={clsx(styles.wrapper, props.showModal && styles.noScroll)}>
      <div className={styles.recipeWrapper}>
        <div className={styles.content}>
          <BackButton />
          {(author && author.id === userContext.id) || !author ? (
            <div className={styles.buttons}>
              <EditButton
                recipe={recipe}
                location={location}
                onClick={() => props.setShowModal(true)}
              />
              <RemoveButton
                recipe={recipe}
                onClick={handleClick}
                setRefreshKey={props.setRefreshKey}
              />
            </div>
          ) : null}
          <Title title={recipe.title} />
          {author && author.name ? <Author author={author.name} /> : null}
          <div className={styles.dash} />
          <Image src={recipe.img} title={recipe.title} />
          <Description
            ingredients={recipe.ingredients}
            description={recipe.description}
          />
        </div>
      </div>
    </div>
  );
}

export default Recipe;

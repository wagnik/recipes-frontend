import React, { useState, useEffect, createContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import Recipe from './components/Recipe';
import Grid from '../src/components/Grids/Grid';
import {
  Edit,
  Login,
  Recipe as RecipeForm,
  Registration,
} from './components/Forms';
import Footer from './components/Footer';
import { fetchAllRecipes } from './services/recipeService';
import { fetchAuthUser } from './services/userService';
import { PATH, TRANSLATION } from './components/constants';
import styles from './App.module.scss';

export const UserContext = createContext({});

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  const [message, setMessage] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshAuth, setRefreshAuth] = useState(0);
  const [userSession, setUserSession] = useState(true);
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      await fetchAllRecipes().then((data) => setRecipes(data));
    };
    fetchRecipes();
  }, [refreshKey]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchAuthUser();
        setUserSession(await res);
      } catch (err) {
        console.log(err);
        return;
      }
    };
    fetchUser();
  }, [refreshAuth]);

  return (
    <UserContext.Provider value={userSession}>
      <div className={styles.wrapper}>
        <Routes location={previousLocation || location}>
          <Route
            path={PATH.main}
            element={
              <>
                <Navigation
                  setRefreshKey={setRefreshKey}
                  setUserSession={setUserSession}
                  setRefreshAuth={setRefreshAuth}
                  message={message}
                  setMessage={setMessage}
                />
                <MainContent recipes={recipes} setRefreshKey={setRefreshKey} />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path={PATH.addRecipe}
            element={
              <RecipeForm
                setRefreshKey={setRefreshKey}
                buttonName={TRANSLATION.addRecipe}
              />
            }
          ></Route>
          {!userSession.email && (
            <>
              <Route
                path={PATH.register}
                element={<Registration buttonName={TRANSLATION.register} />}
              ></Route>
              <Route
                path={PATH.login}
                element={
                  <Login
                    buttonName={TRANSLATION.login}
                    setUserSession={setUserSession}
                    setRefreshAuth={setRefreshAuth}
                    setMessage={setMessage}
                  />
                }
              ></Route>
            </>
          )}
          <Route
            path={`${PATH.recipe}:id`}
            element={
              <>
                {/* <Search /> */}
                <Navigation
                  setRefreshKey={setRefreshKey}
                  setUserSession={setUserSession}
                  setRefreshAuth={setRefreshAuth}
                  message={message}
                  setMessage={setMessage}
                />
                <Recipe
                  setRefreshKey={setRefreshKey}
                  refreshKey={refreshKey}
                  setShowModal={setShowModal}
                  showModal={showModal}
                />
                <Footer showModal={showModal} />
              </>
            }
          ></Route>
          <Route
            path={PATH.allRecipes}
            element={
              <>
                {/* <Search /> */}
                <Navigation
                  setRefreshKey={setRefreshKey}
                  setUserSession={setUserSession}
                  setRefreshAuth={setRefreshAuth}
                  message={message}
                  setMessage={setMessage}
                />
                <Grid
                  recipes={recipes}
                  type={location.state}
                  setRefreshKey={setRefreshKey}
                />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path={`${PATH.typeRecipes}:type`}
            element={
              <>
                {/* <Search /> */}
                <Navigation
                  setRefreshKey={setRefreshKey}
                  setUserSession={setUserSession}
                  setRefreshAuth={setRefreshAuth}
                  message={message}
                  setMessage={setMessage}
                />
                <Grid
                  recipes={recipes}
                  type={location.state}
                  setRefreshKey={setRefreshKey}
                />
                <Footer />
              </>
            }
          ></Route>
        </Routes>

        {/* {previousLocation && ( */}
        <Routes>
          <Route
            path={`${PATH.edit}:id`}
            element={
              <Edit
                setRefreshKey={setRefreshKey}
                buttonName={TRANSLATION.save}
                setShowModal={setShowModal}
                showModal={showModal}
              />
            }
          ></Route>
        </Routes>
        {/* )} */}
      </div>
    </UserContext.Provider>
  );
}

export default App;

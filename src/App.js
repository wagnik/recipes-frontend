import React, { useState, useEffect, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Content from './components/ContentWrapper';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Recipe from './components/Recipe';
import Search from './components/Search';
import { Login, Recipe as RecipeForm, Registration } from './components/Forms';
import { fetchAllRecipes } from './services/recipeService';
import { fetchAuthUser } from './services/userService';
import { PATH, TRANSLATION } from './constants';
import styles from './App.module.scss';

export const UserContext = createContext({});

function App() {
  const [recipes, setRecipes] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [userSession, setUserSession] = useState(true);
  const [visibleNavigation, setVisibleNavigation] = useState(true);
  const [refreshAuth, setRefreshAuth] = useState(0);

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
        {visibleNavigation && (
          <Navigation
            setRefreshKey={setRefreshKey}
            setUserSession={setUserSession}
            setRefreshAuth={setRefreshAuth}
            setVisibleNavigation={setVisibleNavigation}
          />
        )}
        <Routes>
          <Route
            path={PATH.MAIN}
            element={
              <>
                <Search />
                <Content recipes={recipes} setRefreshKey={setRefreshKey} />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path={PATH.ADD_RECIPE}
            element={
              <RecipeForm
                setVisibleNavigation={setVisibleNavigation}
                setRefreshKey={setRefreshKey}
                buttonName={TRANSLATION.ADD_RECIPE}
              />
            }
          ></Route>
          {!userSession.email && (
            <>
              <Route
                path={PATH.REGISTRATION}
                element={
                  <Registration
                    buttonName={TRANSLATION.SUBMIT_REGISTER}
                    setVisibleNavigation={setVisibleNavigation}
                  />
                }
              ></Route>
              <Route
                path={PATH.LOGIN}
                element={
                  <Login
                    buttonName={TRANSLATION.SUBMIT_LOGIN}
                    setUserSession={setUserSession}
                    setRefreshAuth={setRefreshAuth}
                    setVisibleNavigation={setVisibleNavigation}
                  />
                }
              ></Route>
            </>
          )}
          <Route
            path={`${PATH.EDIT}:id`}
            element={
              <RecipeForm
                setRefreshKey={setRefreshKey}
                buttonName={TRANSLATION.SAVE}
              />
            }
          ></Route>
          <Route
            path={`${PATH.RECIPE}:id`}
            element={
              <>
                <Search />
                <Recipe setRefreshKey={setRefreshKey} />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;

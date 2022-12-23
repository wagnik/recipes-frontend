import React, { useState, useEffect, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Content } from './components/ContentWrapper';
import { Footer } from './components/Footer';
import { Login } from './components/Forms/Login';
import { Navigation } from './components/Navigation';
import { Recipe } from './components/Recipe';
import { RecipeForm } from './components/Forms/Recipe';
import { Registration } from './components/Forms/Registration';
import { Search } from './components/Search';
import { fetchAllRecipes } from './services/recipeService';
import { fetchAuthUser } from './services/userService';
import { ADD_RECIPE, SAVE, SUBMIT_LOGIN, SUBMIT_REGISTER } from './constants';
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
            path='/'
            element={
              <>
                <Search />
                <Content recipes={recipes} setRefreshKey={setRefreshKey} />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path='/add-recipe'
            element={
              <RecipeForm
                setVisibleNavigation={setVisibleNavigation}
                setRefreshKey={setRefreshKey}
                buttonName={ADD_RECIPE}
              />
            }
          ></Route>
          {!userSession.email && (
            <>
              <Route
                path='/register'
                element={
                  <Registration
                    buttonName={SUBMIT_REGISTER}
                    setVisibleNavigation={setVisibleNavigation}
                  />
                }
              ></Route>
              <Route
                path='/login'
                element={
                  <Login
                    buttonName={SUBMIT_LOGIN}
                    setUserSession={setUserSession}
                    setRefreshAuth={setRefreshAuth}
                    setVisibleNavigation={setVisibleNavigation}
                  />
                }
              ></Route>
            </>
          )}
          <Route
            path='/edit/:id'
            element={
              <RecipeForm setRefreshKey={setRefreshKey} buttonName={SAVE} />
            }
          ></Route>
          <Route
            path='/recipe/:id'
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

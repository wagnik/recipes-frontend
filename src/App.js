import React, { useState, useEffect, createContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Content from './components/ContentWrapper';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Recipe from './components/Recipe';
import {
  Edit,
  Login,
  Recipe as RecipeForm,
  Registration,
} from './components/Forms';
import { fetchAllRecipes } from './services/recipeService';
import { fetchAuthUser } from './services/userService';
import { PATH, TRANSLATION } from './constants';
import styles from './App.module.scss';
import AllRecipes from './components/AllRecipes';

export const UserContext = createContext({});

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  const [recipes, setRecipes] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [userSession, setUserSession] = useState(true);
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
        <Routes location={previousLocation || location}>
          <Route
            path={PATH.MAIN}
            element={
              <>
                <Navigation
                  setRefreshKey={setRefreshKey}
                  setUserSession={setUserSession}
                  setRefreshAuth={setRefreshAuth}
                />
                <Content recipes={recipes} setRefreshKey={setRefreshKey} />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path={PATH.ADD_RECIPE}
            element={
              <RecipeForm
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
                  <Registration buttonName={TRANSLATION.SUBMIT_REGISTER} />
                }
              ></Route>
              <Route
                path={PATH.LOGIN}
                element={
                  <Login
                    buttonName={TRANSLATION.SUBMIT_LOGIN}
                    setUserSession={setUserSession}
                    setRefreshAuth={setRefreshAuth}
                  />
                }
              ></Route>
            </>
          )}
          <Route
            path={`${PATH.RECIPE}:id`}
            element={
              <>
                {/* <Search /> */}
                <Navigation
                  setRefreshKey={setRefreshKey}
                  setUserSession={setUserSession}
                  setRefreshAuth={setRefreshAuth}
                />
                <Recipe setRefreshKey={setRefreshKey} refreshKey={refreshKey} />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path={PATH.ALL_RECIPES}
            element={
              <>
                {/* <Search /> */}
                <Navigation
                  setRefreshKey={setRefreshKey}
                  setUserSession={setUserSession}
                  setRefreshAuth={setRefreshAuth}
                />
                <AllRecipes recipes={recipes} setRefreshKey={setRefreshKey} />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path={`${PATH.TYPE_RECIPES}:type`}
            element={
              <>
                {/* <Search /> */}
                <Navigation
                  setRefreshKey={setRefreshKey}
                  setUserSession={setUserSession}
                  setRefreshAuth={setRefreshAuth}
                />
                <AllRecipes recipes={recipes} setRefreshKey={setRefreshKey} />
                <Footer />
              </>
            }
          ></Route>
        </Routes>

        {previousLocation && (
          <Routes>
            <Route
              path={`${PATH.EDIT}:id`}
              element={
                <Edit
                  setRefreshKey={setRefreshKey}
                  buttonName={TRANSLATION.SAVE}
                />
              }
            ></Route>
          </Routes>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;

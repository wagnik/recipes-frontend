import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Search } from './components/Search';
import { Content } from './components/ContentWrapper';
import { Footer } from './components/Footer';
import styles from './App.module.scss';

function App() {
  const [data2, setData] = useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3001/api/recipes')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [data2]);

  const addRecipe = async (title, body, img, tags) => {
    await fetch('http://localhost:3001/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        img,
        tags,
      }),
    }).then((response) => response.json());
  };

  return (
    <div className={styles.wrapper}>
      <Navigation addRecipe={addRecipe} />
      <Search />
      <Content recipes={data2} />
      {/* <Footer /> */}
    </div>
  );
}

export default App;

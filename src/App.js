import { Navigation } from './components/Navigation';
import { Search } from './components/Search';
import { Content } from './components/ContentWrapper';
import { Footer } from './components/Footer';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.wrapper}>
      <Navigation />
      <Search />
      <Content />
      <Footer />
    </div>
  );
}

export default App;

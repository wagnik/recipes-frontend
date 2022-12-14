import styles from './ContentWrapper.module.scss';
import { Category } from '../Category';
import cake from './../../images/cake.png';
import dinner from './../../images/dinner.png';
import lunch from './../../images/lunch.png';
import pancakes from './../../images/pancakes.png';
import snacks from './../../images/snacks.png';
import pasta from './../../images/pasta.png';
import pancakesBG from './../../images/pancakes-bg.jpg';
import { ColorButton } from '../Button/ColorButton';
import React from 'react';
import { Form } from '../Form';

function Content(props) {
  const [isVisibleFormID, setVisibleForm] = React.useState('');

  const deleteRecipe = async (id) => {
    await fetch('http://localhost:3001/api/recipes/' + id, {
      method: 'DELETE',
    });
  };

  const editRecipe = async (id, title, body, img, tags) => {
    await fetch(`http://localhost:3001/api/recipes/${id}`, {
      method: 'PUT',
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
      <div className={styles.mainContent}>
        {/* <div className={styles.categories}>
          <Category title={'Śniadanie'} image={pancakes} />
          <Category title={'Lunch'} image={lunch} />
          <Category title={'Obiad'} image={dinner} />
          <Category title={'Makarony'} image={pasta} />
          <Category title={'Przekąski'} image={snacks} />
          <Category title={'Ciasta'} image={cake} />
        </div> */}
        <div className={styles.test}>
          {props && props.recipes && props.recipes.length > 0
            ? props.recipes.map((recipe) => {
                return (
                  <div className={styles.recipeWrapper}>
                    <div className={styles.edit}>
                      <ColorButton
                        title={'EDYTUJ'}
                        onClick={() => {
                          console.log(isVisibleFormID);
                          if (isVisibleFormID) {
                            setVisibleForm('');
                            return;
                          }
                          setVisibleForm(recipe._id);
                        }}
                      />
                    </div>
                    <div className={styles.remove}>
                      <ColorButton
                        title={'USUŃ'}
                        onClick={() => deleteRecipe(recipe._id)}
                      />
                    </div>
                    <img
                      src={recipe.img}
                      alt={recipe.title}
                      className={styles.bg}
                    ></img>
                    <div className={styles.recipeTitle}>{recipe.title}</div>
                    <div className={styles.description}>{recipe.body}</div>
                    <div>{recipe.tags}</div>
                    {isVisibleFormID === recipe._id && (
                      <Form
                        id={recipe._id}
                        onClick={editRecipe}
                        buttonName={'EDYTUJ'}
                      />
                    )}
                  </div>
                );
              })
            : 'TEST'}
          {/* <div className={styles.title}>
            <img src={pancakesBG} alt={'Nalesniki'} className={styles.bg}></img>
            <div className={styles.recipeTitle}>{props.title}</div>
          </div> */}
          {/* <div className={styles.ingredients}>
            <ul>Składniki:</ul>
            <li>1 pełna szklanka i 2 łyżki mąki pszennej</li>
            <li>3 średnie jajka</li>
            <li>1 szklanka mleka</li>
            <li>1 szklanka wody - zwykła lub gazowana</li>
            <li>4 łyżki oleju roślinnego</li>
            <li>szczypta soli</li>
          </div> */}
          {/* <div className={styles.description}>
            Do miski wsyp pełną szklankę mąki pszennej + jeszcze dwie łyżki
            mąki. Będzie to około 230 gramów mąki. Używam zazwyczaj mąki
            pszennej tortowej lub mąki uniwersalnej. Wbij trzy średniej
            wielkości jajka i wlej szklankę mleka oraz szklankę wody. Dodaj
            szczyptę soli i wlej cztery łyżki oleju roślinnego np. ryżowego lub
            z pestek winogron. <br />
            Miksuj ciasto przez kilka minut na gładką masę, by pozbyć się
            ewentualnych grudek. Ciasto możesz odstawić na 30 minut, by
            odpoczęło. Nie jest to jednak konieczne, chociaż zawsze polecam
            zostawić ciasto, by uzyskało idealną konsystencję. <br />
            Jeśli szykujesz ciasto na naleśniki na słodko, to zamiast wody
            możesz użyć ulubionego, owocowego napoju gazowanego. Olej możesz też
            zastąpić roztopionym i przestudzonym masłem lub olejem kokosowym
            (również roztopionym i przestudzonym). Jeśli szykujesz naleśniki na
            słono, to zamiast wody możesz użyć piwa (tylko dla dorosłych).{' '}
            <br />
            Dobrze nagrzej płaską patelnię - najlepiej specjalnie przystosowaną
            do smażenia naleśników. Nie ustawiaj od razu najwyższej mocy
            palnika. Ustaw średnią moc i poczekaj aż ciepło rozprowadzi się
            równo po całej powierzchni użytkowej patelni. <br />
            Zamieszaj ciasto i małą chochlą odmierz porcję na naleśnika. Wylej
            na patelnię tylko tyle ciasta, by masa przykryła powierzchnię
            patelni. Przy każdym nalewaniu porcji na naleśnika podnoszę patelnię
            nad palnik. Od razu poruszam patelnią tak, by ciasto rozeszło się po
            całej powierzchni. Naleśniki powinny być cienkie. Możesz nawet za
            każdym razem odlać nadmiar ciasta z powrotem do miski. Wówczas
            wyjdzie Ci więcej, ale super cienkich naleśników. <br />
            Po około 40-50 sekundach przewracaj placek na drugą stronę. Druga
            strona potrzebuje zazwyczaj o połowę mniej czasu. Tutaj może Ci się
            przydać płaska łopatka do przewracania naleśników. W ten sposób
            usmaż wszystkie naleśniki.
            <br />
            <br />
            #śniadanie, #przekąska
          </div> */}
        </div>
      </div>
      {/* <img src={cake} alt={'ciasto'} /> */}
    </div>
  );
}

export default Content;

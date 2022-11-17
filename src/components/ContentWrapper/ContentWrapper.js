import './ContentWrapper.css'
import cake from './cake.png';
import { ColorButton } from '../Button/ColorButton';

function Content() {
  return (
    <div className="content-wrapper">
        <div className='opis'>
        <p>Witamy na naszej <br />stronie z przepisami</p>
        <span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

</span>
        <div className='button'>

        <ColorButton title="Dodaj przepis"/>
        <ColorButton title="Zaloguj się" color={true}/>
        </div>
        </div>
        <img src={cake} alt={'ciasto'} />
    </div>
  );
}

export default Content;

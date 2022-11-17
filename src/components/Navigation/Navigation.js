import { Button } from '../Button';
import { ColorButton } from '../Button/ColorButton';
import './Navigation.css';
import logo from './../../logo.svg';

function Navigation() {
  return (
    <div className="navigation-wrapper">
        <div className='logo'>
          <img src={logo} alt='logo'/>
          <div>Domowe przepisy</div>
        </div>
        <div className='buttons'>
					<Button title={'Logowanie'}/>
          <Button title={'Rejestracja'}/>
					<ColorButton title={'Dodaj przepis'}/>
        </div>
    </div>
  );
}

export default Navigation;

import { Button } from '../Button';
import './Navigation.css';

function Navigation() {
  return (
    <div className="navigation-wrapper">
        <div className='buttons'>
					<Button title={'Logowanie'}/>
					<Button title={'Rejestracja'}/>
        </div>
    </div>
  );
}

export default Navigation;

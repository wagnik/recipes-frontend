import { ColorButton } from '../Button/ColorButton';
import styles from './RegForm.module.scss';
import React, { useState } from 'react';

function RegForm(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleChange2 = (event) => {
    setEmail(event.target.value);
  };
  const handleChange3 = (event) => {
    setPassword(event.target.value);
  };

  const addUser = async (name, email, password) => {
    await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then(() => setRegister(true));
  };

  return (
    <div className={styles.wrapper}>
      Name: <input value={name} onChange={handleChange} />
      email: <input value={email} type={'email'} onChange={handleChange2} />
      password: <input value={password} onChange={handleChange3} />
      <div className={styles.button}>
        <ColorButton
          title={props.buttonName}
          onClick={async () => {
            await addUser(name, email, password);
          }}
        />
      </div>
      {register && (
        <div className={styles.register}>Użytkownik został zarejestrowany</div>
      )}
    </div>
  );
}

export default RegForm;

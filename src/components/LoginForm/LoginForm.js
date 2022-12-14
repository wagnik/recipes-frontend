import { ColorButton } from '../Button/ColorButton';
import styles from './LoginForm.module.scss';
import React, { useState } from 'react';

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});

  const handleChange2 = (event) => {
    setEmail(event.target.value);
  };
  const handleChange3 = (event) => {
    setPassword(event.target.value);
  };

  const loginUser = async (email, password) => {
    await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((user) => setUser(user))
      .then(() => setLogin(true));
  };

  return (
    <div>
      <div className={styles.wrapper}>
        email: <input value={email} type={'email'} onChange={handleChange2} />
        password: <input value={password} onChange={handleChange3} />
        <div className={styles.button}>
          <ColorButton
            title={props.buttonName}
            onClick={async () => {
              await loginUser(email, password);
            }}
          />
        </div>
      </div>
      {login && (
        <div className={styles.login}>{`Witaj, ${user.user.name}`}</div>
      )}
    </div>
  );
}

export default LoginForm;

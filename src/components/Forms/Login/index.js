import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/userService';
import { ErrorMessage, HasAccount, Header, Input } from '../components';
import { ColorButton } from '../../Buttons';
import {
  PATH,
  TRANSLATION,
  SUCCESS_MESSAGE,
  PLACEHOLDER,
} from '../../constants';

import styles from './login.module.scss';
import emailIcon from '../../../statics/icons/email.svg';
import unlockIcon from '../../../statics/icons/unlock.svg';

function Login(props) {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [missingSubmitFields, setMissingSubmitFields] = useState({
    email: false,
    password: false,
  });
  const [message, setMessage] = useState('');

  const { email, password } = values;

  const handleChange = (fieldName) => (event) => {
    setValues({
      ...values,
      [fieldName]: event.target.value,
    });
  };

  const handleClick = async () => {
    if (!email || !password) {
      return setMissingSubmitFields({
        ...values,
        email: !email && true,
        password: !password && true,
      });
    }

    const result = await loginUser(email, password);

    setMessage(result.message);
    props.setMessage(result.message);

    if (SUCCESS_MESSAGE.hasOwnProperty(result.message)) {
      props.setRefreshAuth((old) => old + 1);
      navigate(PATH.main);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header title={TRANSLATION.login} />
      <Input
        type={'email'}
        iconSrc={emailIcon}
        value={email}
        placeholder={PLACEHOLDER.email}
        handleChange={handleChange('email')}
        submitClicked={missingSubmitFields.email}
      />
      <Input
        type={'password'}
        iconSrc={unlockIcon}
        value={password}
        placeholder={PLACEHOLDER.password}
        handleChange={handleChange('password')}
        submitClicked={missingSubmitFields.password}
      />
      <ColorButton
        title={props.buttonName}
        form={true}
        onClick={(e) => handleClick(e)}
      />
      <HasAccount noAccount={true} link={PATH.register} />
      <ErrorMessage message={message} />
    </div>
  );
}

export default Login;

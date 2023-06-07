import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../../services/userService';
import {
  PATH,
  TRANSLATION,
  SUCCESS_MESSAGE,
  PLACEHOLDER,
} from '../../constants';

import { ErrorMessage, HasAccount, Header, Input } from '../components';
import { ColorButton } from '../../Buttons';

import styles from './styles.module.scss';
import emailIcon from '../../../statics/icons/email.svg';
import unlockIcon from '../../../statics/icons/unlock.svg';
import userIcon from '../../../statics/icons/user.svg';
import cancelIcon from '../../../statics/icons/cancel.svg';

function Registration(props) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [missingSubmitFields, setMissingSubmitFields] = useState({
    email: false,
    name: false,
    password: false,
  });
  const [message, setMessage] = useState('');

  const { name, email, password } = values;

  const handleChange = (fieldName) => (event) => {
    setValues({
      ...values,
      [fieldName]: event.target.value,
    });
  };

  const handleClick = async () => {
    if (!email || !password || !name) {
      return setMissingSubmitFields({
        ...values,
        email: !email && true,
        name: !name && true,
        password: !password && true,
      });
    }
    const result = await registerUser(name, email, password);

    setMessage(result.message);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <Header title={TRANSLATION.register} />
        <Input
          type={'name'}
          iconSrc={userIcon}
          value={name}
          placeholder={PLACEHOLDER.name}
          handleChange={handleChange('name')}
          submitClicked={missingSubmitFields.name}
        />
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
          isRegistration={true}
        />
        <ColorButton
          title={props.buttonName}
          form={true}
          onClick={handleClick}
        />
        <HasAccount noAccout={false} link={PATH.login} />
        {SUCCESS_MESSAGE.hasOwnProperty(message) && (
          <div className={styles.message}>
            {SUCCESS_MESSAGE[message]}
            <br></br>
            <Link to={PATH.login} className={styles.link}>
              {TRANSLATION.login}
            </Link>
            {' lub '}
            <Link to={PATH.main} className={styles.link}>
              {TRANSLATION.backMainPage}
            </Link>
            <img
              src={cancelIcon}
              className={styles.icon}
              alt={TRANSLATION.cancel}
              onClick={() => setMessage('')}
            />
          </div>
        )}
        <ErrorMessage message={message} />
      </div>
    </div>
  );
}

export default Registration;

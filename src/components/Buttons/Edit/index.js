import React from 'react';
import { Link } from 'react-router-dom';
import { PATH, TRANSLATION } from '../../constants';

import styles from './styles.module.scss';
import editIcon from '../../../statics/icons/edit.svg';

function EditButton(props) {
  return (
    <Link
      to={`${PATH.edit}${props.recipe._id}`}
      state={{ previousLocation: props.location }}
      onClick={props.onClick}
    >
      <img
        className={styles.icon}
        src={editIcon}
        alt={TRANSLATION.edit}
        title={TRANSLATION.edit}
      />
    </Link>
  );
}

export default EditButton;

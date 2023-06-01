import React from 'react';
import { Link } from 'react-router-dom';
import { PATH, TRANSLATION } from '../../../constants';
import editIcon from '../../../statics/images/edit.svg';
import styles from './styles.module.scss';

function EditButton(props) {
  return (
    <Link
      to={`${PATH.EDIT}${props.recipe._id}`}
      state={{ previousLocation: props.location }}
    >
      <img
        className={styles.editIcon}
        src={editIcon}
        alt={TRANSLATION.EDIT}
        title={TRANSLATION.EDIT}
      />
    </Link>
  );
}

export default EditButton;

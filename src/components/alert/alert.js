import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import slideTransition from '../../transitions/slide.module.css';
import styles from './alert.module.css';

const Alert = ({ message }) => (
  <CSSTransition timeout={250} classNames={slideTransition}>
    <div className={styles.alert}>
      <p className={styles.alertText}>{message}</p>
    </div>
  </CSSTransition>
);
Alert.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Alert;

import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import slideTransition from '../../transitions/slideLogo.module.css';
import styles from './logo.module.css';

const Logo = ({ title, isMounted }) => (
  <CSSTransition in={isMounted} timeout={500} classNames={slideTransition}>
    <h1 className={styles.phonebook}>{title}</h1>
  </CSSTransition>
);
Logo.propTypes = {
  title: PropTypes.string.isRequired,
  isMounted: PropTypes.bool.isRequired,
};
export default Logo;

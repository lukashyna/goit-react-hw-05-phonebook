import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import ContactListItem from './contactListItem';
import styles from './contactList.module.css';
import slideTransition from '../../transitions/slide.module.css';

const ContactList = ({ contacts, removeContact }) => (
  <TransitionGroup component="ul" className={styles.contactList}>
    {contacts.map(contact => (
      <CSSTransition key={contact.id} timeout={250} unmountOnExit classNames={slideTransition}>
        <li className={styles.contactListItem} key={contact.id}>
          <ContactListItem removeContact={() => removeContact(contact.id)} contact={contact} />
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
  removeContact: PropTypes.func.isRequired,
};

export default ContactList;

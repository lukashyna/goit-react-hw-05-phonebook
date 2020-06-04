import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/contactForm/contactForm';
import ContactFilter from './components/contactFilter/contactFilter';
import ContactList from './components/contactList/contactList';
import styles from './app.module.css';
import Alert from './components/alert/alert';
import Logo from './components/logo/logo';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    isAlert: false,
    alertMessage: '',
    isMounted: false,
  };

  componentDidMount() {
    this.setState({
      isMounted: true,
    });
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    const uniqueName = this.state.contacts.some(
      contactName => contactName.name.toLowerCase() === contact.name.toLowerCase(),
    );

    if (uniqueName) {
      this.setState({
        isAlert: true,
        alertMessage: `${name} is already in contacts.`,
      });
      setTimeout(() => this.closeAlert(), 3000);
    } else {
      this.setState(state => ({
        contacts: [...state.contacts, contact],
      }));
    }
  };

  removeContact = id => {
    const filteredContacts = this.filterContact();

    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));

    if (filteredContacts.length === 1) {
      this.resetFilter();
    }
  };

  changeFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  resetFilter = () => {
    this.setState({
      filter: '',
    });
  };

  filterContact = () => {
    return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()));
  };

  closeAlert = () => {
    this.setState({
      isAlert: false,
      alertMessage: '',
    });
  };

  render() {
    const { contacts, filter, isAlert, alertMessage, isMounted } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.contactForm}>
          <Logo title="Phonebook" isMounted={isMounted} />
          <ContactForm onAddContact={this.addContact} />
        </div>
        <div>
          {contacts.length > 0 && (
            <div>
              {contacts.length >= 2 && <ContactFilter changeFilter={this.changeFilter} value={filter} />}
              <ContactList contacts={this.filterContact()} removeContact={this.removeContact} />
            </div>
          )}
          {isAlert && <Alert message={alertMessage} isAlert={isAlert} />}
        </div>
      </div>
    );
  }
}

import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import Form from 'components/SectionForm';
import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import styles from './app.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  onSubmmitAddContact = ({ name, number }, reset) => {
    const { contacts } = this.state;
    const validContacts = contacts.map(({ name }) => name.toLowerCase());
    const nameToLowerCase = name.toLowerCase();

    if (validContacts.includes(nameToLowerCase)) {
      return alert(`${name} is already in contacs.`);
    } else {
      const newContact = {
        name,
        number,
        id: nanoid(),
      };
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
      reset();
    }
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onFilteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContacts = contactsId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactsId),
    }));
  };

  render() {
    const { filter } = this.state;
    const onfilteredContacts = this.onFilteredContacts();
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <Form onSubmit={this.onSubmmitAddContact} />
        <h2 className={styles.title}>Contacts</h2>
        <div className={styles.contactListContainer}>
          <Filter InputValue={filter} onChange={this.handleChangeFilter} />
          <ContactList
            contacts={onfilteredContacts}
            onDeleteContacts={this.deleteContacts}
          />
        </div>
      </div>
    );
  }
}

import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import Form from 'components/SectionForm';
import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import styles from './app.module.css';

const ListItem = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [...ListItem],
    filter: '',
  };

  onSubmmitAddContact = ({ name, number }) => {
    const { contacts } = this.state;
    const validContacts = contacts.map(({ name }) => name.toLowerCase());
    const nameToLowerCase = name.toLowerCase();

    if (validContacts.includes(nameToLowerCase)) {
      return alert(`${name} is already in contacs.`);
    }
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
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

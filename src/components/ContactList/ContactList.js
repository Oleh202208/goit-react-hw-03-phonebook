import ContactItem from '../ContactItem/ContactItem';
import PropTypes from 'prop-types';

import styles from '../ContactList/ContactList.module.css';

const ContactList = ({ contacts, onDeleteContacts }) => {
  return (
    <ul className={styles.list}>
      {contacts.map(({ name, number, id }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          onClick={onDeleteContacts}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContacts: PropTypes.func.isRequired,
};

export default ContactList;

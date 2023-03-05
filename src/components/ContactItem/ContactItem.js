import PropTypes from 'prop-types';
import styles from '../ContactItem/ContactItem.module.css';

const ContactItem = ({ name, number, id, onClick }) => {
  return (
    <li className={styles.item}>
      <span>
        {name}: {number}
      </span>
      <button
        className={styles.buttonDelete}
        type="button"
        onClick={() => onClick(id)}
      >
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactItem;

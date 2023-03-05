import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ InputValue, onChange }) => {
  return (
    <label className={styles.label}>
      Find contacts by name
      <input type="text" value={InputValue} onChange={onChange} />
    </label>
  );
};

Filter.propTypes = {
  inputValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Filter;

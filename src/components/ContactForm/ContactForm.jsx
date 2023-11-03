import React, { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';


export const ContactForm = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name,value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      name,
      number,
    };
    onSubmit(data);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };
    return (
      <form className={css.form}
       onSubmit={handleSubmit}>
        <label className={css.label} >
          <p className={css.nameLabel}>Name</p>
          <input className={css.input}
            onChange={handleChange}
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            title="Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            required
          />
        </label>
        <label className={css.label}>
         <p className={css.nameLabel}>Number</p>
          <input className={css.input}
            onChange={handleChange}
            type="tel"
            name="number"
            value={number}
            placeholder="Enter your number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            required
          />
        </label>
        <button className={css.btnFormAdd} type="submit">Add contacts</button>
      </form>
    );
  }

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;

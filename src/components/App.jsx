import { useState } from 'react';

import { Section } from './Section/Section';

import ContactForm from './ContactForm/ContactForm';

import ContactList from './ContactList/ContactList';

import { Filter } from './Filter/Filter';

import initialContacts from './data/contacts.json';

import { nanoid } from 'nanoid';

import useLocalStorage from './hooks/useLocalStorage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastifyOptions } from './toastifyOptions/toastifyOptions';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    const isDuplicate = contacts.some(contact =>
      contact.name.toLowerCase().trim() === newContact.name.toLowerCase().trim()
    );
  
    if (isDuplicate) {
      toast.error(
        `${newContact.name}: is already in contacts`,
        toastifyOptions
      );
      return;
    }
  
    setContacts(contacts => [{ ...newContact, id: nanoid() }, ...contacts]);
  };

  const onChangeFilter = value => {
    setFilter(value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );

    if (normalizedFilter && !filteredContacts.length) {
      toast.warn(`No contacts matching your request`, toastifyOptions);
    }

    return filteredContacts;
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        {contacts.length > 0 ? (
          <Filter value={filter} onChangeFilter={onChangeFilter} />
        ) : (
          <div>
            There are no contacts in your phonebook. Please add your first
            contact!
          </div>
        )}
        {contacts.length > 0 && (
          <ContactList
            contacts={getVisibleContacts()}
            onDeleteContact={deleteContact}
          />
        )}
      </Section>
      <ToastContainer />
    </>
  );
};

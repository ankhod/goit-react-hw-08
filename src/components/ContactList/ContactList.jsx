import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { selectFilteredContacts } from '../../redux/contacts/selectors';
import toast from 'react-hot-toast';
import css from './ContactList.module.css';
import { useState } from 'react';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleDelete = contactId => {
    dispatch(deleteContact(contactId))
      .unwrap()
      .then(() => {
        toast.success('Contact deleted successfully!');
        setContactToDelete(null);
      })
      .catch(() => toast.error('Failed to delete contact!'));
  };

  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.item}>
          {name}: {number}
          <button onClick={() => setContactToDelete(id)} className={css.button}>
            Delete
          </button>
          {contactToDelete === id && (
            <div className={css.modal}>
              <p>Are you sure you want to delete this contact?</p>
              <button
                onClick={() => handleDelete(id)}
                className={css.confirmButton}
              >
                Yes
              </button>
              <button
                onClick={() => setContactToDelete(null)}
                className={css.cancelButton}
              >
                No
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

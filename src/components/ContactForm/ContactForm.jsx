import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import css from './ContactForm.module.css';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    dispatch(addContact({ name, number }))
      .unwrap()
      .then(() => {
        toast.success('Contact added successfully!');
        form.reset();
      })
      .catch(() => toast.error('Failed to add contact!'));
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.label}>
        Name
        <input type="text" name="name" required />
      </label>
      <label className={css.label}>
        Number
        <input type="tel" name="number" required />
      </label>
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
}

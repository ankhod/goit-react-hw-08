import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.userMenu}>
      <p>Welcome, {user.name}</p>
      <button onClick={() => dispatch(logout())} className={css.button}>
        Logout
      </button>
    </div>
  );
}

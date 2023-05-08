import { Navigate } from 'react-router-dom';
import { BASE_ALIAS } from '../../utils/constants';

export default function ProtectedRoute({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to={`${BASE_ALIAS.MESTO_FRONT}/signin`} />;
}

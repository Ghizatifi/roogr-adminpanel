import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { checkIsLoggedin } from '../../store/slices/auth';

/** Route vers laquelle rediriger un utilisateur déjà connecté (ex: après login). */
export const POST_LOGIN_REDIRECT = '/charts';

interface LogoutGuardsProps {
  children: React.ReactNode;
}

/**
 * Affiche la page (ex: login) uniquement si l'utilisateur n'est pas connecté.
 * Si connecté, redirige vers POST_LOGIN_REDIRECT (sans garder la page login dans l'historique).
 */
export default function LogoutGuards({ children }: LogoutGuardsProps) {
  const isLoggedIn = useSelector(checkIsLoggedin);
  const location = useLocation();

  if (isLoggedIn) {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
    const to = from && from !== '/auth/login' ? from : POST_LOGIN_REDIRECT;
    return <Navigate to={to} replace />;
  }

  return <>{children}</>;
}

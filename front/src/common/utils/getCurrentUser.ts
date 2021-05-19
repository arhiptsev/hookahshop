import { CurrentUser } from '../../types/user';

export function getCurrentUser(): CurrentUser | null {
  const userJson = localStorage.getItem('currentUser');
  if (typeof userJson === 'string') {
    const user = JSON.parse(userJson);
    return user;
  }
  return null;
}

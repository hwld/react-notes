import { auth } from 'services/firebaseConfig';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

const useCurrentUserId = () => {
  const [user, loading, error] = useAuthState(auth);
  const userId = user ? user.uid : null;

  return { userId, loading, error };
};

const login = () => {
  return auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(result => {
      if (result.user) {
        return result.user.uid;
      }

      return null;
    });
};

const logout = () => {
  return auth.signOut();
};

export { useCurrentUserId, login, logout };
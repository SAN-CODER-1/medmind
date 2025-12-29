import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../config/firebase';

const useIsLoggedIn = (): boolean | undefined => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
}, []);


  return isLoggedIn;
};

export default useIsLoggedIn;

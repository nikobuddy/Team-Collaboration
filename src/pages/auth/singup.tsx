// SignUp.tsx
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import React, { useState } from 'react';
import { auth } from '../firebase/firebase';

const SignInComponent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // `result.user` will be of type `User`
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {user && <p>Welcome, {user.displayName}</p>}
    </div>
  );
};

export default SignInComponent;

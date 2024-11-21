import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  loading: boolean; // Ensure loading is part of the context type
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAdmin: false, // Default to non-admin
  loading: true,  // Initial loading state
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // Manage the admin state
  const [loading, setLoading] = useState(true);  // Manage the loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(true); // Set loading to true during role fetch

      if (user) {
        try {
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data();

          // Determine if the user is an admin (assuming a `role` field in Firestore)
          setIsAdmin(userData?.role === "admin");
        } catch (error) {
          console.error("Failed to fetch user role:", error);
          setIsAdmin(false); // Default to non-admin on error
        }
      } else {
        setIsAdmin(false); // Non-admin if no user is logged in
      }

      setLoading(false); // Set loading to false after role fetch
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, loading }}>
      {!loading ? children : <p>Loading...</p>} {/* Optional loading state */}
    </AuthContext.Provider>
  );
};
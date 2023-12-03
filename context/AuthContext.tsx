// Description: This file contains the AuthContext which is used to store the user's authentication state.
"use client";
import React from "react";
import { app } from "@/firebase/config";
import { onAuthStateChanged, getAuth } from "firebase/auth";
const auth = getAuth(app);
import Loading from "@/app/loading";

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<{
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
  } | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Subscribe to user on mount
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

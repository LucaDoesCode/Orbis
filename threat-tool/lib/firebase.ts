import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useState, useEffect } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrKWx3rA_djSrWR6lZ2qTaCwizGA9_vqA",
  authDomain: "threat-assessment-tool.firebaseapp.com",
  projectId: "threat-assessment-tool",
  storageBucket: "threat-assessment-tool.firebasestorage.app",
  messagingSenderId: "946303761928",
  appId: "1:946303761928:web:084c640192fc6a246adbbd",
  measurementId: "G-ZCMVQWB078",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firestore
export const db = getFirestore(app)
export const auth = getAuth(app)

// Custom hook for auth state management
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log("Setting up auth state listener");
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log("Auth state changed:", user ? {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          metadata: user.metadata
        } : "No user");
        setUser(user);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("Auth state error:", error);
        setError(error);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      console.log("Cleaning up auth state listener");
      unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
  };
}

import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
import app from "../configs/firebase.config";
import { Cookies } from "react-cookie";
import UserService from "../services/user.service";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
const cookies = new Cookies();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth(app);

  const getUser = () => {
    const userInfo = cookies.get("user") || null;
    return userInfo;
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const updateUserProfile = (displayName, photoURL, email) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
      email,
    });
  };

  const authInfo = {
    user,
    createUser,
    login,
    logout,
    signUpWithGoogle,
    signUpWithGithub,
    signUpWithFacebook,
    updateUserProfile,
    getUser,
    isLoading,
  };

  //check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(user);
      if (currentUser) {
        setIsLoading(false);
        setUser(currentUser);
        const { email } = currentUser;
        const data = UserService.signJwt({ email });
        if (data.token) {
          cookies.set("user", response.data);
        } else {
          cookies.remove("user");
        }
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;

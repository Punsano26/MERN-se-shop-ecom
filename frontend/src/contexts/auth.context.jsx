import { createContext, useEffect, useState } from "react";
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
import Swal from "sweetalert2"; // เพิ่มสำหรับแจ้งเตือน error

const cookies = new Cookies();
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // เริ่มต้นเป็น true เพื่อรอ sync
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currenUser) => {
      setUser(currenUser);
      if (currenUser) {
        setUser(currenUser);
        setIsLoading(false);
        const { email } = currenUser;
        const { data } = await UserService.signJwt(email);
        console.log(data);
        if (data) {
          cookies.set("user", data);
        }
      } else {
        cookies.remove("user");
      }
      setIsLoading(false);
    });

    return () => {
      return unsubscribe;
    };
  }, [auth]);

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

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
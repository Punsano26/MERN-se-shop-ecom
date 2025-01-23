import React, { useContext } from "react";
import GoogleWordmark from "./icons/GoogleIcon";
import { DiGithubFull } from "react-icons/di";
import { CiFacebook } from "react-icons/ci";
import { AuthContext } from "../contexts/auth.context";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";

const SocialLogin = ({ name }) => {
  const { signUpWithGoogle, signUpWithGithub, signUpWithFacebook } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const googleSignUp = () => {
    signUpWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          icon: "success",
          title: "Register with Google Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById(name).close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const githubSignUp = () => {
    signUpWithGithub()
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          icon: "success",
          title: "Register with GitHub Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById(name).close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const facebookSignUp = () => {
    signUpWithFacebook()
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          icon: "success",
          title: "Register with Facebook Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById(name).close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button
        className="btn btn-ghost btn-circle hover:bg-red"
        onClick={googleSignUp}
      >
        <GoogleWordmark className="w-6 h-6" />
      </button>
      <button
        className="btn btn-ghost btn-circle hover:bg-red"
        onClick={githubSignUp}
      >
        <DiGithubFull className="w-6 h-6" />
      </button>
      <button
        className="btn btn-ghost btn-circle hover:bg-red"
        onClick={facebookSignUp}
      >
        <CiFacebook className="w-6 h-6" />
      </button>
    </>
  );
};

export default SocialLogin;

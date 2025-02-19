import React, { useContext } from "react";
import GoogleWordmark from "./icons/GoogleIcon";
import { DiGithubFull } from "react-icons/di";
import { CiFacebook } from "react-icons/ci";
import { AuthContext } from "../contexts/auth.context";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import UserService from "../services/user.service";

const SocialLogin = ({ name }) => {
  const { signUpWithGoogle, signUpWithGithub, signUpWithFacebook } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const googleSignUp = () => {
    signUpWithGoogle()
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        await UserService.addUser(user.email);
        Swal.fire({
          icon: "success",
          title: "Google Sign-Up Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Google Sign-Up Failed",
          text: error.message,
        });
      });
  };

  const githubSignUp = () => {
    signUpWithGithub()
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        await UserService.addUser(user.email);
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
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        await UserService.addUser(user.email);
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
      <div>
        <button
          className="btn btn-ghost btn-circle hover:bg-red"
          onClick={googleSignUp}
        >
          <GoogleWordmark className="w-8 h-8" />
        </button>
        <button
          className="btn btn-ghost btn-circle hover:bg-red"
          onClick={githubSignUp}
        >
          <DiGithubFull className="w-8 h-8" />
        </button>
        <button
          className="btn btn-ghost btn-circle hover:bg-red"
          onClick={facebookSignUp}
        >
          <CiFacebook className="w-8 h-8" />
        </button>
      </div>
    </>
  );
};

export default SocialLogin;

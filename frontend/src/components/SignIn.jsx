import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import GoogleWordmark from "./icons/GoogleIcon";
import { DiGithubFull } from "react-icons/di";
import { CiFacebook } from "react-icons/ci";
import { AuthContext } from "../contexts/auth.context";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import UserService from "../services/user.service";

const SignIn = () => {
  const { login, signUpWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    login(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        await UserService.addUser(user.email);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const googleSignUp = () => {
    signUpWithGoogle()
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        await UserService.addUser(user.email);
        Swal.fire({
          icon: "success",
          title: "Register white google Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("login").close();
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
  return (
    <div>
      <div className="modal-action mt-0 flex flex-col justify-center items-center">
        <h3 className="font-bold text-lg">Please Login</h3>
        <form method="card-body " onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </label>
          </div>
          <div className="form-control">
            {" "}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                className="input input-bordered"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </label>
            <label className="label">
              <a className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value={"Log in"}
              className="btn bg-red ml-1 text-white"
            />
          </div>
          <p className="text-center my-2">
            Don&apos;t have an account?
            <a href="/signup" className="underline text-md ml-1">
              Sign Up Now
            </a>
          </p>
        </form>
        <div className="text-center space-x-3 mb-5">
           <button
                        onClick={googleSignUp}
                        className="btn btn-ghost btn-circle hover:bg-red-50 transition duration-300"
                      >
                        <GoogleWordmark className="w-8 h-8" />
                      </button>
      
          <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
            <DiGithubFull className="w-6 h-6" />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
            <CiFacebook className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContexts";
import { motion } from "framer-motion";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin } = useAppContext();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        action=""
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm text-center">
          Welcome back! Please sign in to continue
        </p>

        {state !== "Login" && (
          <div className="border pl-4 px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img width={30} src={assets.profile_icon} alt="" />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="outline-none text-sm"
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img width={18} src={assets.email_icon} alt="" />
          <input
            type="email"
            placeholder="Email Id"
            required
            className="outline-none text-sm"
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img width={10} src={assets.lock_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            required
            className="outline-none text-sm"
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot Password?
        </p>
        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Dont't have an account?{" "}
            <span
              onClick={() => {
                setState("Sing up");
              }}
              className="text-blue-600 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => {
            setShowLogin(false);
          }}
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;

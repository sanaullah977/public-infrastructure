import useAuth from "../../Hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router";

import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
// import { signInWithPopup } from 'firebase/auth';
// import {  signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '../../firebase/firebase.config'
import { PiGearFineDuotone } from "react-icons/pi";
import { saveOrUpdateUser } from "../../Utiliti/User";
import Swal from "sweetalert2";

const LogIn = () => {
  const { signInUser, signInGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // if (loading) return <PiGearFineDuotone size={70} className="animate-spin m-auto" />;
  if (user) return <Navigate to={from} replace={true} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const { user } = await signInUser(email, password);

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      navigate(from, { replace: true });
      Swal.fire({
        title: "Well Done!",
        icon: "success",
        draggable: true,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  console.log(handleSubmit);

  const handleGoogleSignIn = async () => {
    try {
      //    const result = await signInWithPopup( GoogleAuthProvider)
      // const user = result.user
      const { user } = await signInGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });
      navigate(from, { replace: true });
      Swal.fire({
        title: "Well Done!",
        icon: "success",
        draggable: true,
      });
    } catch (err) {
      console.log(err);
      // setLoading(false)
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen 
                bg-white dark:bg-slate-950 
                transition-colors duration-300">

  <div className="flex flex-col max-w-md w-full p-6 sm:p-10 rounded-2xl
                  bg-gray-100 dark:bg-slate-900
                  text-gray-900 dark:text-gray-100
                  shadow-xl transition-colors duration-300">

    {/* Header */}
    <div className="mb-8 text-center">
      <h1 className="my-3 text-4xl font-bold">
        Log In
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Sign in to access your account
      </p>
    </div>

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      noValidate=""
      className="space-y-6"
    >

      <div className="space-y-4">

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 text-sm">
            Email address
          </label>

          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Enter Your Email Here"
            className="w-full px-3 py-2 border rounded-md
                       border-gray-300 dark:border-slate-700
                       bg-gray-200 dark:bg-slate-800
                       text-gray-900 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       transition-colors"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-2 text-sm">
            Password
          </label>

          <input
            type="password"
            name="password"
            autoComplete="current-password"
            id="password"
            required
            placeholder="*******"
            className="w-full px-3 py-2 border rounded-md
                       border-gray-300 dark:border-slate-700
                       bg-gray-200 dark:bg-slate-800
                       text-gray-900 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       transition-colors"
          />
        </div>

      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="flex justify-center items-center gap-2
                     bg-orange-500 hover:bg-orange-600
                     w-full rounded-md py-3
                     text-white font-medium
                     transition-all duration-200"
        >
          {loading && (
            <PiGearFineDuotone size={20} className="animate-spin" />
          )}
          Continue
        </button>
      </div>

    </form>

    {/* Forgot Password */}
    <div className="space-y-1 mt-4">
      <button className="text-xs text-gray-500 dark:text-gray-400
                         hover:text-orange-500 hover:underline">
        Forgot password?
      </button>
    </div>

    {/* Divider */}
    <div className="flex items-center pt-6 space-x-3">
      <div className="flex-1 h-px bg-gray-300 dark:bg-slate-700"></div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Login with social accounts
      </p>
      <div className="flex-1 h-px bg-gray-300 dark:bg-slate-700"></div>
    </div>

    {/* Google Sign In */}
    <div
      onClick={handleGoogleSignIn}
      className="flex justify-center items-center gap-3
                 border border-gray-300 dark:border-slate-700
                 bg-white dark:bg-slate-800
                 hover:bg-gray-50 dark:hover:bg-slate-700
                 rounded-md m-3 p-3
                 cursor-pointer transition-colors"
    >
      <FcGoogle size={26} />
      <p className="text-gray-700 dark:text-gray-200">
        Continue with Google
      </p>
    </div>

    {/* Register Link */}
    <p className="px-6 text-sm text-center text-gray-500 dark:text-gray-400">
      Don&apos;t have an account yet?{" "}
      <Link
        state={from}
        to="/register"
        className="text-gray-700 dark:text-gray-200
                   hover:text-orange-500 hover:underline"
      >
        Sign up
      </Link>
      .
    </p>

  </div>
</div>
  );
};

export default LogIn;

// import React from 'react'
// import sing from '../../assets/singin.jpg.png'
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
// import GoogleLogin from '../../Component/Login/googleLogin';
// import Swal from 'sweetalert2';
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
// import { signInWithPopup } from 'firebase/auth';
import { PiGearFineDuotone } from "react-icons/pi";
import { imageUpload, saveOrUpdateUser } from "../../Utiliti/User";
import Swal from "sweetalert2";

const Register = () => {
  const { registerUser, updateUserProfile, signInGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);

      const result = await registerUser(email, password);

      await saveOrUpdateUser({ name, email, image: imageURL });

      await updateUserProfile(name, imageURL);

      navigate(from, { replace: true });
      Swal.fire({
        title: "Well Done!",
        icon: "success",
        draggable: true,
      });

      console.log(result);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInGoogle();
      console.log(user);

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
      <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Welcome to Civic Build
      </p>
    </div>

    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate=""
      className="space-y-6"
    >
      <div className="space-y-4">

        {/* Name */}
        <div>
          <label className="block mb-2 text-sm">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Your Name Here"
            className="w-full px-3 py-2 border rounded-md
                       border-gray-300 dark:border-slate-700
                       bg-gray-200 dark:bg-slate-800
                       text-gray-900 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       transition-colors"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-sm font-medium 
                            text-gray-700 dark:text-gray-300">
            Profile Image
          </label>

          <input
            name="image"
            type="file"
            accept="image/*"
            className="block w-full text-sm
                       text-gray-500 dark:text-gray-400
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-orange-50 dark:file:bg-orange-500
                       file:text-orange-700 dark:file:text-orange-300
                       hover:file:bg-orange-100 dark:hover:file:bg-orange-800
                       bg-gray-100 dark:bg-slate-800
                       border border-dashed border-orange-300 dark:border-orange-700
                       rounded-md cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-orange-400
                       py-2 transition-colors"
            {...register("image")}
          />

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG or JPEG (max 2MB)
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email Here"
            className="w-full px-3 py-2 border rounded-md
                       border-gray-300 dark:border-slate-700
                       bg-gray-200 dark:bg-slate-800
                       text-gray-900 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       transition-colors"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            autoComplete="new-password"
            id="password"
            placeholder="*******"
            className="w-full px-3 py-2 border rounded-md
                       border-gray-300 dark:border-slate-700
                       bg-gray-200 dark:bg-slate-800
                       text-gray-900 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       transition-colors"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

      </div>

      {/* Submit Button */}
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

    </form>

    {/* Divider */}
    <div className="flex items-center pt-6 space-x-3">
      <div className="flex-1 h-px bg-gray-300 dark:bg-slate-700"></div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Signup with social accounts
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

    {/* Login Link */}
    <p className="px-6 text-sm text-center text-gray-500 dark:text-gray-400">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-gray-700 dark:text-gray-200
                   hover:text-orange-500 hover:underline"
      >
        Login
      </Link>
      .
    </p>

  </div>
</div>
  );
};

export default Register;

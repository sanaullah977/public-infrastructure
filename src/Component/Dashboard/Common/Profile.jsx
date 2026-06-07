import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import coverImg from "../../../assets/profileIcon.jpg.png";
import Swal from "sweetalert2";
import { updatePassword } from "firebase/auth";
import { auth } from "../../../Component/firebase/firebase.init";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    setIsUpdating(true);
    try {
      await updateUserProfile(name, photo);
      Swal.fire({
        title: "Success!",
        text: "Your profile has been updated.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setIsProfileModalOpen(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to update profile.",
        icon: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match.",
        icon: "error",
      });
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire({
        title: "Error!",
        text: "Password must be at least 6 characters.",
        icon: "error",
      });
      return;
    }

    const isPasswordProvider = user?.providerData?.some(
      (p) => p.providerId === "password"
    );

    if (!isPasswordProvider) {
      Swal.fire({
        title: "Action Blocked",
        text: "Password changes are only available for accounts registered with email and password. Google sign-in accounts cannot change password directly.",
        icon: "warning",
      });
      setIsPasswordModalOpen(false);
      return;
    }

    setIsUpdating(true);
    try {
      await updatePassword(auth.currentUser, newPassword);
      Swal.fire({
        title: "Success!",
        text: "Your password has been changed.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setIsPasswordModalOpen(false);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/requires-recent-login") {
        Swal.fire({
          title: "Re-authentication Required",
          text: "For security reasons, please log out and log back in to change your password.",
          icon: "info",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to change password.",
          icon: "error",
        });
      }
    } finally {
      setIsUpdating(false);
    }
  };

  if (isRoleLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-slate-950">
        <div className="flex w-52 flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center h-screen
                bg-white dark:bg-slate-950
                transition-colors duration-300"
    >
      <div
        className="bg-white dark:bg-slate-900
                  shadow-xl rounded-2xl
                  md:w-4/5 lg:w-3/5
                  transition-colors duration-300"
      >
        {/* Cover Image */}
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-56 object-cover"
        />

        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          {/* Profile Image */}
          <div className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24
                     border-4 border-white dark:border-slate-900
                     shadow-md"
            />
          </div>

          {/* Role Badge */}
          <p
            className="p-2 px-4 text-xs text-white
                    bg-orange-500 rounded-full mt-2"
          >
            {role}
          </p>

          {/* User ID */}
          <p
            className="mt-3 text-xl font-medium
                    text-gray-800 dark:text-gray-200
                    transition-colors"
          >
            User Id: {user?.uid}
          </p>

          {/* Info Section */}
          <div
            className="w-full p-4 mt-4 rounded-lg
                      bg-gray-100 dark:bg-slate-800
                      transition-colors"
          >
            <div
              className="flex flex-wrap items-center justify-between
                        text-sm text-gray-600 dark:text-gray-300
                        gap-4"
            >
              {/* Name */}
              <p className="flex flex-col">
                Name
                <span className="font-bold text-gray-700 dark:text-gray-100">
                  {user?.displayName || "N/A"}
                </span>
              </p>

              {/* Email */}
              <p className="flex flex-col">
                Email
                <span className="font-bold text-gray-700 dark:text-gray-100">
                  {user?.email || "N/A"}
                </span>
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="bg-orange-500 hover:bg-orange-600
                         px-10 py-2 rounded-lg
                         text-white cursor-pointer
                         transition-all duration-200"
                >
                  Update Profile
                </button>

                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="bg-orange-500 hover:bg-orange-600
                         px-7 py-2 rounded-lg
                         text-white cursor-pointer
                         transition-all duration-200"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-orange-200 dark:border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl mx-4 transition-colors">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Update Profile</h3>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName || ""}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo URL</label>
                <input
                  type="url"
                  name="photo"
                  defaultValue={user?.photoURL || ""}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-orange-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold disabled:opacity-50"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-orange-200 dark:border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl mx-4 transition-colors">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Change Password</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  placeholder="Minimum 6 characters"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Re-enter password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-orange-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold disabled:opacity-50"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

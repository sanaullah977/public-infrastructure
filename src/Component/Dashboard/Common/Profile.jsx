import useAuth from "../../../Hooks/useAuth"
import useRole from "../../../Hooks/useRole"
import coverImg from "../../../assets/profileIcon.jpg.png"


const Profile = () => {
  const { user } = useAuth()
  const [role, isRoleLoading] = useRole()
//  await updateUserProfile(name, imageURL);
  console.log(role, isRoleLoading)
  return (
  <div className="flex justify-center items-center h-screen
                bg-white dark:bg-slate-950
                transition-colors duration-300">

  <div className="bg-white dark:bg-slate-900
                  shadow-xl rounded-2xl
                  md:w-4/5 lg:w-3/5
                  transition-colors duration-300">

    {/* Cover Image */}
    <img
      alt="cover photo"
      src={coverImg}
      className="w-full mb-4 rounded-t-lg h-56 object-cover"
    />

    <div className="flex flex-col items-center justify-center p-4 -mt-16">

      {/* Profile Image */}
      <a href="#" className="relative block">
        <img
          alt="profile"
          src={user?.photoURL}
          className="mx-auto object-cover rounded-full h-24 w-24
                     border-4 border-white dark:border-slate-900
                     shadow-md"
        />
      </a>

      {/* Role Badge */}
      <p className="p-2 px-4 text-xs text-white
                    bg-orange-500 rounded-full mt-2">
        {role}
      </p>

      {/* User ID */}
      <p className="mt-3 text-xl font-medium
                    text-gray-800 dark:text-gray-200
                    transition-colors">
        User Id: {user?.uid}
      </p>

      {/* Info Section */}
      <div className="w-full p-4 mt-4 rounded-lg
                      bg-gray-100 dark:bg-slate-800
                      transition-colors">

        <div className="flex flex-wrap items-center justify-between
                        text-sm text-gray-600 dark:text-gray-300
                        gap-4">

          {/* Name */}
          <p className="flex flex-col">
            Name
            <span className="font-bold text-gray-700 dark:text-gray-100">
              {user?.displayName}
            </span>
          </p>

          {/* Email */}
          <p className="flex flex-col">
            Email
            <span className="font-bold text-gray-700 dark:text-gray-100">
              {user?.email}
            </span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <button
              className="bg-orange-500 hover:bg-orange-600
                         px-10 py-2 rounded-lg
                         text-white cursor-pointer
                         transition-all duration-200"
            >
              Update Profile
            </button>

            <button
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
</div>
  )
}

export default Profile

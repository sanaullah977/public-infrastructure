import { useState } from 'react'
import UpdateUserRoleModal from '../Model/UpdateUserRoleModal'


const UserDataRow = ({ user, refetch }) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  return (
    <tr className="transition-colors duration-300">

  <td className="px-5 py-5 
                 border-b border-gray-200 dark:border-slate-700
                 bg-white dark:bg-slate-900 
                 text-sm transition-colors">
    <p className="text-gray-900 dark:text-gray-200 transition-colors">
      {user?.email}
    </p>
  </td>

  <td className="px-5 py-5 
                 border-b border-gray-200 dark:border-slate-700
                 bg-white dark:bg-slate-900 
                 text-sm transition-colors">
    <p className="text-gray-900 dark:text-gray-200 transition-colors">
      {user?.role}
    </p>
  </td>

  <td className="px-5 py-5 
                 border-b border-gray-200 dark:border-slate-700
                 bg-white dark:bg-slate-900 
                 text-sm transition-colors">

    <span
      onClick={() => setIsOpen(true)}
      className="relative cursor-pointer inline-block px-3 py-1 font-semibold 
                 text-green-900 dark:text-green-300 leading-tight"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 
                   bg-green-200 dark:bg-green-900
                   opacity-50 rounded-full
                   transition-colors"
      ></span>

      <span className="relative">
        Update Role
      </span>
    </span>

    {/* Modal */}
    <UpdateUserRoleModal
      user={user}
      refetch={refetch}
      isOpen={isOpen}
      closeModal={closeModal}
    />

  </td>
</tr>
  )
}

export default UserDataRow
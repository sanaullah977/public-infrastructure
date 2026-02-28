import toast from 'react-hot-toast'
import useAxiosSecure from '../../Hooks/useAxiosSecure'


const StaffeRequestsDataRow = ({ req, refetch }) => {
  const axiosSecure = useAxiosSecure()

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch('/update-role', {
        email: req?.email,
        role: 'staffe',
      })
      toast.success('Role Updated!')
      refetch()
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message)
    }
  }
  return (
 <tr className="transition-colors duration-300">

  <td className="px-5 py-5 
                 border-b border-gray-200 dark:border-slate-700
                 bg-white dark:bg-slate-900 
                 text-sm transition-colors">

    <p className="text-gray-900 dark:text-gray-200 transition-colors">
      {req?.email}
    </p>

  </td>

  <td className="px-5 py-5 
                 border-b border-gray-200 dark:border-slate-700
                 bg-white dark:bg-slate-900 
                 text-sm transition-colors">

    <span
      onClick={handleRoleUpdate}
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
        Make Staffe
      </span>
    </span>

  </td>

</tr>
  )
}

export default StaffeRequestsDataRow
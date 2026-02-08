import { useQuery } from '@tanstack/react-query'



import useAuth from '../../../Hooks/useAuth'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import LoadingSpinner from '../Common/LoadingSpinner'
import StaffeRequestsDataRow from '../../TableRows/StaffeRequestsDataRow'
// import { data } from 'react-router'

const StaffeRequests = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['staffe-requests', user?.email],
    // enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure(`/staffe-requests`)
      return result.data
    },
  })
  // console.log(requests)

  if (isLoading) return <LoadingSpinner />
  // if (data) return isLoading(false)
  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-8'>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Email
                  </th>

                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <StaffeRequestsDataRow
                    refetch={refetch}
                    key={req._id}
                    req={req}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffeRequests
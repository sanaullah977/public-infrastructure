import { Navigate, useLocation } from 'react-router'

import useAuth from '../Hooks/useAuth'
import { ColorRing } from 'react-loader-spinner'

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

   if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRouter
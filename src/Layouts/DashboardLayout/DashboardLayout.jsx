import { Outlet } from 'react-router'
import Sidebar from '../../Component/Dashboard/Sidebar/Sidebar'
import ClinteMenu from '../../Component/Dashboard/Sidebar/Menu/ClinteMenu'
import AdminMenu from '../../Component/Dashboard/Sidebar/Menu/AdminMenu'
import StaffeMenu from '../../Component/Dashboard/Sidebar/Menu/StaffeMenu'


const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex bg-white'>
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64'>
        <div className='p-5'>
          {/* Outlet for dynamic contents */}
          <Outlet />
          
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
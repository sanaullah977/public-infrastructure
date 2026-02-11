import { FaUserCog, FaUserTag } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsFingerprint } from 'react-icons/bs'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={BsFingerprint} label='Payment History' address='/payment-history' />
      <MenuItem
        icon={FaUserTag}
        label='Staffe Requests'
        address='staffe-requests'
      />
    </>
  )
}

export default AdminMenu
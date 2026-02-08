import { ColorRing } from 'react-loader-spinner'


const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <ColorRing size={100} color='lime' />
    </div>
  )
}

export default LoadingSpinner
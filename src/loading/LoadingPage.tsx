import Lottie from 'lottie-react'
import LoadingAnimation from './LoadingAnimation.json'
const LoadingPage = () => {
  return (
    <div className=' flex justify-center items-center h-screen'>

    <Lottie
      animationData={LoadingAnimation}
      loop={true}
      className='w-[500px]'
      />
      </div>
  )
}

export default LoadingPage

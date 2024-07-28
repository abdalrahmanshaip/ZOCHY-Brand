import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
const Auth = () => {
  const { login, register, isAuthenticated, user, logout } = useKindeAuth()
  return (
    <div className='flex sm:gap-1'>
      {!isAuthenticated && (
        <>
          <button
            onClick={() => register()}
            type='button'
            className=' text-black'
          >
            Sign up
          </button>
          <span>/</span>
          <button
            onClick={() => login()}
            type='button'
            className=' text-black'
          >
            Login
          </button>
        </>
      )}
      {isAuthenticated && (
        <div className='flex items-center gap-4'>
          <button
            onClick={() => logout()}
            type='button'
            className=' text-black'
          >
            Logout
          </button>
          <div className='avatar'>
            <div className=' ring-offset-base-100 w-10 rounded-full '>
              <img src={(user?.picture as string) || undefined} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Auth

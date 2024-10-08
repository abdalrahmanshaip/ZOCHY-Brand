import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { Navigate, Outlet } from 'react-router'
import LoadingPage from '../loading/LoadingPage'

const RouteGuard = () => {
  const { isLoading, isAuthenticated, user } = useKindeAuth()

  if (isLoading)
    return (
      <h1>
        <LoadingPage />
      </h1>
    )

  if (
    (!isLoading && !isAuthenticated) ||
    (user?.id !== 'kp_3780c11cb7f3443cbc2089a6582228f8' &&
      user?.id !== 'kp_7ab5b8f8c2054636923333e270eba84f')
  ) {
    return (
      <Navigate
        to='/'
        replace
      />
    )
  } else {
    return <Outlet />
  }
}

export default RouteGuard

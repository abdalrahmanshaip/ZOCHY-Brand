import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Toaster } from 'sonner'
import { Cart, Contact, Dashboard } from './pages'
import RouteGuard from './auth/RouteGuard'
import AdminDashboard from './pages/AdminDashboard'
import { HandleData } from './shared'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path='/' element={<Dashboard />}/>,
      <Route path='/cart' element={<Cart />}/>,
      <Route path='/contact' element={<Contact />}/>,



      // product route
      <Route element={<RouteGuard />}>
        <Route path='/admin-dashboard' element={<AdminDashboard />}/>
      </Route>
    ]) 
  )
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
      <HandleData />
    </>
  )
}
export default App

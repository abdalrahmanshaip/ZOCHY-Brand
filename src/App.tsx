import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Toaster } from 'sonner'
import { Cart, Contact, Dashboard, ProductDetails } from './pages'
import RouteGuard from './auth/RouteGuard'
import AdminDashboard from './pages/AdminDashboard'
import { HandleData } from './shared'
import Checkout from './pages/Checkout'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path='/' element={<Dashboard />}/>,
      <Route path='/product/:id' element={<ProductDetails />}/>,
      <Route path='/cart' element={<Cart />}/>,
      <Route path='/contact' element={<Contact />}/>,
      <Route path='/checkout' element={<Checkout />}/>,



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

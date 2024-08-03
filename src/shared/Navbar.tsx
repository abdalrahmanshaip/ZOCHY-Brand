import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { CiMenuBurger } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../app/store'
import Auth from '../auth/Auth'
import logoImg from '../assets/7B4ECA45-1509-40D2-95C3-68D59A7E628E-removebg-preview.png'
const Navbar = () => {
  const cart = useSelector((state: RootState) => state.ownCart.userCart)
  const { user } = useKindeAuth()
  const pathName = window.location.pathname
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Cart', href: '/cart' },
    { name: 'Contact Us', href: '/contact' },
  ]
  if (
    user?.id === 'kp_3780c11cb7f3443cbc2089a6582228f8' ||
    user?.id === 'kp_7ab5b8f8c2054636923333e270eba84f'
  ) {
    links.push({ name: 'Admin Dashboard', href: '/admin-dashboard' })
  }
  return (
    <header className={`bg-[#D1CCCA] h-[75px]`}>
      <div className='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='md:flex md:items-center md:gap-12'>
            <span className='sr-only'>Home</span>
            <div className='text-center mt-3 sm:w-32 w-20 object-cover'>
              <Link to={'/'}>
                <img
                  src={logoImg}
                  alt='logo image'
                  className=''
                />
              </Link>
            </div>
          </div>

          <div className='hidden md:block'>
            <nav aria-label='Global'>
              <ul className='flex items-center gap-6 text-xl'>
                {links.map((link) => {
                  return (
                    <li
                      key={link.name}
                      className={` ${
                        pathName === link.href ? 'border-b border-black' : ''
                      } 
                      ${
                        link.name === 'Cart' &&
                        `${
                          (cart?.data.length as number) > 0 && 'text-red-500'
                        } `
                      } 
                      relative`}
                    >
                      <Link to={link.href}>{link.name}</Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          <div className='flex items-center gap-4'>
            <Auth />

            <div className='block md:hidden'>
              <details className='dropdown dropdown-end '>
                <summary className={`btn m-1 bg-[#D1CCCA]`}>
                  <CiMenuBurger size={20} />
                </summary>
                <ul
                  tabIndex={0}
                  className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow gap-2'
                >
                  {links.map((link) => {
                    return (
                      <li
                        key={link.name}
                        className={` ${
                          pathName === link.href
                            ? 'bg-black text-white p-1 rounded-xl'
                            : ''
                        }  ${
                          link.name === 'Cart' &&
                          `${
                            (cart?.data.length as number) > 0 && 'text-red-500'
                          } `
                        } `}
                      >
                        <Link to={link.href}>{link.name}</Link>
                      </li>
                    )
                  })}
                </ul>
              </details>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

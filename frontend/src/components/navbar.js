import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/uselogout'
import { useAuthContext } from '../hooks/useAuthContext'

function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header className='site-header'>
      <div className='site-header__inner'>
        <Link to='/' className='brand'>
          <span className='brand__mark'>WB</span>
          <span className='brand__copy'>
            <span className='brand__title'>Workout Buddy</span>
            <span className='brand__subtitle'>Track your gains. Crush your goals.</span>
          </span>

        </Link>
        <nav className='nav-actions' aria-label='Primary navigation'>
          <Link to='/' className='nav-link'>Home</Link>
          {user ? (
            <span className='nav-user' title={user.email}>{user.email}</span>
          ) : (
            <>
              <Link to='/login' className='nav-link'>Login</Link>
              <Link to='/signup' className='nav-link nav-link--primary'>Sign up</Link>
            </>
          )}
          <button
            type='button'
            className='logout-btn'
            onClick={handleClick}
            disabled={!user}
            aria-label='Log out of your account'
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

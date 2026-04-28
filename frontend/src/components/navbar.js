import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
  <header>
    <div className='container'>
     <Link to='/'>
      <h1>💪 Workout Buddy</h1>
    </Link>
    <p className='nav-tagline'>Track your gains. Crush your goals.</p>
    </div>
  </header>
  )
}

export default Navbar

import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Navigation.css'

const Navigation = () => {
  return (
    <header className='nav-header'>
      <nav className='top-nav'>
        <div className='brand-block'>
          <p className='eyebrow'>Web103 Unit 4</p>
          <NavLink to='/' className='brand-link'>
            ThaiHa PC Builder
          </NavLink>
        </div>

        <div className='nav-links'>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'nav-chip active' : 'nav-chip')}
          >
            Create Build
          </NavLink>
          <NavLink
            to='/builds'
            className={({ isActive }) => (isActive ? 'nav-chip active' : 'nav-chip')}
          >
            Saved Builds
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navigation

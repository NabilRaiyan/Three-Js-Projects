import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to='/' className='w-10 h-10 rounded-lg bg-white font-bold 
                                    shadow-md items-center justify-center flex'>
            <p className='blue-gradient_text'>AH</p>
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/' className={({ isActive }) => isActive ? 'text-violet-100' : 'text-black'}>
            Home
        </NavLink>
        <NavLink to='/projects' className={({ isActive }) => isActive ? 'text-violet-100' : 'text-black'}>
            Projects
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => isActive ? 'text-violet-100' : 'text-black'}>
            About
        </NavLink>
        
        <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-violet-100' : 'text-black'}>
            Contacts
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar

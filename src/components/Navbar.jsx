import React from 'react'
import { TbInfoSquareRoundedFilled } from "react-icons/tb";

const Navbar = () => {
  return (
    <nav className = 'flex justify-between bg-blue-950 text-white h-12' >
        <div className = "logo">
            <span className = 'font-bold text-3xl mx-10 inline-flex'>
              <div className= ' p-1'> <TbInfoSquareRoundedFilled /> </div>
              task
            </span>  
        </div>
    </nav>
  )
}

export default Navbar

import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <footer className="bg-white p-4 text-center text-sm">
        <p>{`© 2024 Bytebuddy | Developed with ❤️ by Sai Tejas, Manjunatha & Anishkrishna`}</p>
        <div className="mt-2">
          <NavLink className="text-purple-600 hover:underline" to="/">
            Terms
          </NavLink>
          |{" \n            "}
          <NavLink className="text-purple-600 hover:underline" to="/">
            Privacy Policy
          </NavLink>
        </div>
        </footer>
    </div>
  )
}

export default Footer

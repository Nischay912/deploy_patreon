import React from 'react'

const Footer = () => {
  // step494: lets now give the current year in the footer below.

  // step495: new Date() creates a JavaScript Date object representing the current date and time according to the user’s system clock.
  const currentYear = new Date().getFullYear()

  return (
    // step13: lets copy the styles of navbar here in footer too below ; but make it justify centre to keep it at the centre here below.
    <footer className='bg-black text-white flex items-center justify-center h-16 px-4'>

      {/* step14: can put the &copy; to give a copyright symbol in the footer below. */}

      {/* step496: lets add the current year now in the footer below ; used {} so that : React replaces this with the value of the variable currentYear ; else if {}  not used : It would literally render the text currentYear, not the number 2025. */}

      {/* step497: see the next steps in the useractions.js file now. */}
        <p>Copyright &copy; {currentYear} GetMeAjuice - All Rights Reserved</p>
    </footer>
  )
}

export default Footer

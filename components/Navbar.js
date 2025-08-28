// step84: used here also below as told in step82 in the login folder's page.js file there.
"use client"

// step2: now we type "rafce" and start off
import React from 'react'
// step55: import Link to use it
import Link from 'next/link'

// step83: used here also below as told in step82 in the login folder's page.js file there.
import { useSession , signIn , signOut } from 'next-auth/react'

const Navbar = () => {
  // step85: then we copy the following code from the documentation here below.

  // step86: we are using the useSession hook that returns an object like :
  /*
      {
        data: { user: { name, email, image }, expires: "..." },
        status: "authenticated"
      }
      
      and then here we renamed "data" to "session" , so that now : "session.user.email" can be written instead of "data.user.email" : for convenience.
  */
  const { data: session } = useSession()

  // step87: check if there is a logged in user ; if yes : then the session object will not be null and this if condition runs below , with the user's info in "session.user" now.
  if (session) {
    return (
      <>
      {/* step88: currently we are displaying logged-in user's email here along with a button to signout using the signOut function that we imported in-built in NextAuth. */}
        Signed in as {session.user.email} <br />

        {/* step89: when clicked on this : it clears the login session and useSession now returns { data : null , status : unauthenticated} now : so session becomes null & since this inbuilt state of sessionProvider changes , it re-renders the app as by rule when a state changes react re-renders the whole component/app to update the UI , and so the if block not runs now.   */}

        {/* step90: now create a file named ".env.local" and see the next steps there. */}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    // step7: lets give some colors to the navbar below now.
    
    // step11: make it flexbox for logo and the list items to be in same line and also vertically centre it; also lets add some horizontal paddding to it from the sides and keep them justify between.

    // step12: give some height to the navbar too.
    <nav className='bg-black text-white flex items-center justify-between h-16 px-4'>
        {/* step10: lets make a logo section below now : can use "text-lg" to increase the size of the text of the logo too if wanted. */}

        {/* step52: make it flexbox with all centred to make the gif and logo text to be in the same line there in the navbar. */}
        <div className="logo font-bold text-lg flex justify-center items-center">
          
          {/* step51: lets place the gif here now in the navbar too*/}
          <img src="/juice.gif" alt="" width={44} />
            GetMeAjuice
        </div>
        {/* step9: make it flexbox with some gap to make it look in a horizonatl line in navbar below. */}
        {/*<ul className='flex gap-5'>
            {/* step8: lets make a list inside the navbar now. 
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Sign Up</li>
            <li>Login</li>
        </ul>*/}

        {/* step53: we now commented the list made above in the navbar an instead put a LOGIN button : keep the button using Tailwind Flowbite website. */}

        {/* step54: We use Link tag to go to different page on clicking login button ; as Link tag makes to got to different page without showing the loading button : so they used instead of anchor tags here below : so lets wrap the button in a Link tag below.*/}

        {/* step56: so it will take us to "/login" endpoint : so lets define that route in our "login" folder : SO LETS USE FILE-BASED ROUTING NOW HERE OF NextJs. */}
        <Link href={"/login"}>

        
        <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button> </Link>
    </nav>
  )
}

export default Navbar

"use client"
import React , {useState} from 'react'
import Link from 'next/link'

import { useSession , signIn , signOut} from 'next-auth/react'

// step479: import useRouter to be used now for navigating to a particular page without reloading the website.
import { useRouter } from 'next/navigation'

const Navbar2 = () => {
  const { data: session } = useSession()
  const router = useRouter()
//   const [showdropdown, setshowdropdown] = useState(false)

// step 481:now we define the function to run when user clciks on the signout button there below : make it async as we will be using await inside this function below.
  const handleSignOut = async () => {

    // step482: now lets design the function below ; where we are using await , because signOut is an asynchronous function ; so must be made to await , else the lines below it may run first there making router.push('/login') to direct us to the login page , even before signout happens ; so using await is must here below.
    await signOut({

      // step483: now we make it not to redirect automatically , by mkaing it "false" here below. We'll handle redirect manually now.
      redirect: false, 

      // step484: this written below to callback and redirect to this url i.e. "/login" page when redirected now there.
      callbackUrl: '/login'
    })

    // step485: manually redirect user to /login page after signOut , using the code below.
    router.push('/login')

    // step486: refresh the page on client side to update the session inof immediately there : Without this, some UI elements might still show the user as logged in until a manual reload.
    router.refresh()
  }

//   step118: lets create the state being used to show and hide hide the dropdown there and keep it hidden initially by keeping its value false initially here.
const [showdropdown, setshowdropdown] = useState(false)

//   step109: we now don't want this signOut and signed in as "email" shown there : so comment this below too here.
//   if (session) {
//     return (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     )
//   }

  return (
    // step526: lets give the fixed height given to navbar only for larger devices i.e. in "md" only.
    // step527: also lets make it flex-col in smaller devices and row flex only in larger devices.

    // step528: see the next steps in "app" fodler's default page.js file now.
    <nav className='bg-black text-white flex items-center justify-between md:h-16 px-4 md:flex-row flex-col'>

        {/* styep132: lets make it Link tag instead of "div" that was below and make it take us to the home page "/" when clicked on it thus here below. */}
        <Link href="/" className="logo font-bold text-lg flex justify-center items-center">
          <img src="/juice.gif" alt="" width={44} />

          {/* step539: lets make it larger text size of navbar in smaller devices while keeping the base text size in larger devices "md" here below ; along with margins from top in smaller devices too only and not in larger devices i.e "md" */}

          {/* step540: see the next steps in Dashboard.js file now there. */}
            <span className='text-xl md:text-base my-3 md:my-0'>GetMeAjuice</span>
        </Link>

        {/* step110:lets make a dashboard button now here when the user is signed in i.e. when the session object is not null */}

        {/* step112: lets place the three buttons in a div to make them be together : the dashboard and logout buttons specially when they appear upon sign in there in the navbar. */}

        {/* step121: lets make it as relative position so that the dropdown in next step gets positioned w.r.t to this and not w.r.t to the entire html page , that happens by default if it sparent is static positioned i.e. not has a specific position given : so lets give it a relative non-static position here below. */}

        {/* step538: now lets make this navbar as flex-col in smaller devices here below ; and keep display block i.e.normal width in smaller devices then there below.*/}
        <div className='relative flex flex-col gap-4 md:block'>

            {/* step113: lets also put a dropdown CODE FROM TAILWIND FLOWBITE : to get a dropdown shown when user is logged in i.e. when session object is not null. */}
            {session &&

            // step114: wrap it in a fragment to have multiple elements in it here below.
             <>          

             {/* step115: lets give it horizontal margin "mx" to maintain distance from other buttons there too.*/}

             {/* step119: lets now make it toggle to show or hide the dropdown when clicked on the button , by toggling its value from true to false and vice versa when clicked on it , using the "!" operator below. */}

             
            {/* step120: also keep it in an arrow function , so that when the user clicks it , then only it runs and not upon rendering of the server itself. */}
            <button onClick= {() => {setshowdropdown(!showdropdown)}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer" type="button"
            
            // step133: now we want to make the dropdow to go away after a few secons when clicked away from it : so we use "onBlur" which gets fired when the user clicks away from it.
            onBlur={()=>{
                // step134: so when user clicks away from the dropdown , this onBlur will fire the function written inside it , which due to the setTimeout runs after 100ms and the dropdown vanishes away.

                // step135: see the next steps in "dashboard" folder now.
                setTimeout(() => {
                    setshowdropdown(false);
                }, 100);
            }}

            >

                {/* step116: make the label of button to show the user signed in using the session hook's object we saw earlier below. */}
                Welcome {session.user.email}
                <svg className ="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
            </button>
            {/* <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"> */}

            {/* step117: lets comment out the above line and edit it below using template literals ` ` ; so must be enclosed in { } as its javascript where we use ` ` : and then we added a ternary condition to show the dropdown if the state "showdropdown" is true , else keept it hidden : i.e. display : none*/}
            
            {/* step122: lets make it absolute positioned with respect to its parent dropdown button ; so that it gets positioned at 125px from left w.r.t to that here below. */}
            <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute left-[130px]`}>
                <ul className ="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>

                    {/* step125: so lets redirect it to "/dashboard" when clicked on. */}

                    {/* step126: also we make the "a" tags to "Link" tags to make the webpage not to reload when clicked on them : SEE NEXT STEPS IN LOGIN FOLDER'S PAGE.JS NOW */}
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>

                    {/* step248: We now here make the user to go to its personal page endpoint like "/ben0912gorge" and all here below.*/}
                    
                    {/* step249: As we had set in the route.js file that > the username was having the data before @ due to split used there and in session callback we had set the session.user.name to this username using this code there : session.user.name = dbUser.username : so now whenever user logs in : session is created with the email & then frontend calls useSession we had used to get the data of session ; this is when everytime frontend asks for session data ; session callback of route.js runs and sets the username from database to this session.user.name and which we use to access to that page in the below Link href used there. */}

                    {/* step250: lets make a folder named actions and see next steps there now. */}
                    <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>
                <li>
                    {/* step123: lets make it to use the inbuilt signOut function of NextAuth when clicked on it. */}

                    {/* step487: we now also put the function we made for signout in the dropdown menu ; so that : it also runs the made function by us to redirect to /login page after logout when clicked on it ; as mentioned below. */}
                    <Link onClick={(e)=>{

                      // step488: we write preventDefault because -
                      /*
                        What e.preventDefault() does??

                            - Normally, a <Link> or <a> tag has a default behavior:

                            - Clicking it navigates to the URL in href.

                            - Here, href="#" → normally would jump to the top of the page (# anchor).

                            - e.preventDefault() stops that default navigation.

                            - This allows us to run our custom function (handleSignOut()) instead of letting the browser navigate.

                            - If you remove e.preventDefault(), then:

                            - Clicking the link will jump to # (top of page) immediately.

                            - handleSignOut() will still run, but the page may scroll/jump before logout finishes.

                            - It can look like the logout isn’t working smoothly.

                            - So for clean UX, it’s recommended to keep it when you use <Link href="#"> just as a button.
                      */

                      // step489: see next steps in "page.js" ile of app folder ; the default one now.
                      e.preventDefault()
                      handleSignOut()
                    }} 
                    href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
                </ul>
            </div>
            </> 
            }

            {/* step124: lets remove the dashboard button we made and rather have it direct us to the dashboard page from the dropdown itself. */}

            {/* {session &&
            <Link href={"/dashboard"}>
            <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Dashboard</button> </Link>
            } */}

            {/* step107: we make a Logout button that will be shown there only when the session is not null i.e. when user is logged in ; so put it using the && operator below. */}

            {/* step111: lets now make it call the inbuilt signOut function and make user sign out when clicked on this button below & we always try to make the functions that we want to run upon clickinng and not upon rendering on the screen itself ; so then we put it in an arrow function , like done below too here.*/}
            {session &&
            <button type="button" className="cursor-pointer text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"

            // onClick={() => signOut()}

            // step480: now lets make it to signout without using the inbuilt function used above but rather use a function we will be defining next ; so that : we can handle signout more better way : as in last steps in [username] page.js file ; we had made to show 404 page when user is trying to access some other /mary or so other than its own username /ben0912gorge & also it wont be able to access /ben0912gorge by typing in url ; so when user logs out it shows 404 page as its not being redirected to other page but stays there at /ben0912gorge page : so that is what we will handle in this function to be defined next here.
            onClick={handleSignOut}>Logout</button>
            }

            {/* step108: and similarly , lets show the login button only when user is logged out i.e. session object is null ; so lets do that using the && operator below too. */}
            {!session &&
            <Link href={"/login"}>
            <button type="button" className="cursor-pointer text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button> </Link>
            }
        </div>
    </nav>
  )
}

export default Navbar2

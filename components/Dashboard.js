// step179: we make this as client component so that : we can use browser-only APIs like useState, useEffect , etc here.
"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchUser, updateProfile } from '@/actions/useractions'

// step441: we now want to use the React toast here too : so lets import he required packages like we did in PaymentPage.js file earlier ; here too below.
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce , toast } from 'react-toastify'

const Dashboard = () => {
    // step180: we used the states and sessions below as usual like we saw till now , we did elsewhere too.

    // step391: we now will be using a "update" below too ; what happens here is that -
    /*
        useSession hook has a object that contains :  
        {
            data:session    // the session object (user info, email, name, etc.) ;
            status  // "loading" | "authenticated" | "unauthenticated" ; 
            update  // a function to update the session.
        }

        we stored the data property of session in a "session" varaible below : so session now has all the information of the current logged in user now > session.user = { name: "Nischay", email: "nischay@gmail.com" }

        "update" function allows to update the session on the client side without logging the user out or reloading the page ; EXAMPLE : update({ name: "New Name" }) : This will update session.user.name in memory. The UI will immediately reflect the new info nad session will get refreshed.
    */
    const { data: session , update} = useSession()
    const router = useRouter()

    // step181: a state created with an empty object initially here.
    const [form, setform] = useState({})

    // step182: we now make this useEffect below to run everytime the router or session changes : so that when user logs in logs out and session changes : it will re-render the app and take us to login page using the router and since router changes too : App again re-renders and shows us login page now : thats why we used them in the useEffect's [ ] dependency array here below , and it : redirects user to login page if no user is logged in and the session object is null here : so that non logged in users can't see this dashboard here.
    useEffect(() => {
        // step404: we use the getData function in the useEffect here now ; so that as soon as webpage renders for the first time , it will call the getData function and will pre-fill the input tags there with their current data existing in the database there.
        getData()
        if (!session) {
            router.push('/login')
        }
    }, [router , session])
    
    // step400: now we make a getData function here that will use the fetchUser function we had made in useractions.js file and sends the current session's username there which was stored as "session.user.name" in the NextAuth route.js file there.
    const getData = async () =>{ 
/* STEP407

  1. Error we were getting on console:
     "Cannot read properties of undefined (reading 'user')" 
     happened because at the moment this line ran, 'session' was undefined. 
     In JavaScript, trying to access 'session.user' when 'session' is undefined 
     immediately throws an error.

  2. How optional chaining (?.) helps:
     - The '?.' operator checks if the object before it exists (is not null or undefined) 
       before accessing the next property.
     - 'session?.user' means:
       • If 'session' exists, access 'session.user'.
       • If 'session' is undefined, return undefined instead of throwing an error.

  3. What this line below does now:
     - If session is undefined, or session.user is undefined, the function returns immediately.
     - This prevents the code from crashing and ensures that we only run 
       the fetchUser call once the session is ready.

  So using '?.' makes our code safe while waiting for the NextAuth session to load.
*/
        if (!session?.user) return;


// step408: NOW AFTER ALL THIS NOW WE CAN SEE IN DASHBOARD THE EMAIL , USERNAME , PROFILEPIC AND COVERPIC TO BE PRESENT PRE-FILLED AFTER PRESSING SAVE THERE ON RELOADING TOO AND WHENEVER DASHBOARD LOADS : AS WE HAVE SET IT TO DATABASE NOW AND MAKING IT PRE-EXIST THERE IN INPUT TAG : SO EARLIER PROFILE PIC AND COVER PIC WAS NOT SHOWING AS WE HAD NOT TYPED ANYTHING THERE , BUT NOW WHEN WE TYPE ANY THING THERE AND RELOAD , IT STAYS THERE TOO AS IT GOT ADDED TO DATABASE NOW IN "users" COLLECTION THERE.

// step409: BUT RAZORPAY ID AND SECRET DIDN'T GET ADDED TO DATABASE AND NOR IT REMAINED TO WHAT WE TYPED EARLIER UPON RELOADING ; LETS FIX IT IN NEXT STEPS IN "User.js" FILE NOW.


        // step401: we used await here thats why the function was made "async" so that we get the data fetched of the current user first before proceeding to the next line sof the code here below.

        // step402: so after that we get the user's data as an object in "u" here below.
        let u = await fetchUser(session.user.name)

        // step403: and then we use the setform function and pass the "u" we recieved so that : it will pre-fill the form with these values in the input tags there , with the current logged in user from the database.

        // step404: this was done , so that : the user cam see the existing data in the form there and can later edit it if he/she wants to there.
        setform(u)
    }

    const handleChange = (e) => {

    // step186: now if in the input tag of name = "email" , if we type something like "abc" , then : e.target is that input tag ; e.target.name is "email" and e.target.value is "abc" what we typed.

    // step187: now we copy everything already in "form" using "..." and then overwrite a key if its there OR add it at end if its not there already using the code below i.e. if form was {name : nk} ; it makes the "form" state now to {name : "nk" , email : "abc"} 

    // step188: and we have below [ ] which we tell thats whats in it is the key : so we set key as "email" like above we had and value as what we typed "abc" and thus "form" state gets updated. 

    // step189: and same is done for all input tags there now too similarly there.

    // step190: see the dashboard folder's page.js there now.
        setform({ ...form, [e.target.name]: e.target.value })
    }

    // step394: lets create the handleSubmit function now below here ; which works with the data "e" i.e. clicking on the button to submit the form there.

    // step395: must make it async in order to use await inside it.
    const handleSubmit = async (e) =>{

        // update()
        // step396: using the update function now : It refreshes the session on the client and ensures that any changes to session data (like username/email) are immediately reflected in the session object.

        // step397: now we use the updateProfile function we made in "useractions.js" file and pass the parameters there : we had updateProfile(data , oldUserName) there in the function definition ; and so now we are passing all the inputs user entered as "e" i.e. the form submission object & pass the current session's username there ; we had in session object { user : {name : .... , email : .... , image : ..... , etc.}} in the NextAuth route.js file there ; so we are passing the current user's username stored in session.user.name as the oldUserName to the function there below & then as we had in the UpdateProfile funncton that it may return an error ; so this "a" may contain that error if it comes , else has nothing in it "undefined".

        // step398: we had used "await" as we want the updation to be completed first and then go to the next line and show the alert pop-up there.

        // step406: we have made it "action" and not "onSubmit" in the form as if we write onSubmit then "e" will be the event object that we have in general , but we want to pass all the inputs entered by user as "e" and not the normal event of submitting it is ; as we wanted to pas the inputs entered by user to the function as written in step397 there : THATS WHY WE USED "ACTION" INSTEAD OF "ONSUBMIT" IN THE LAST "STEP405" THERE.
        let a = await updateProfile(e , session.user.name)

        // step399: then we show the following pop-up message to tell that the profile got updated by the updateProfile function above.
        // alert("Profile updated !")

        // step444: now instead of aler we now will show a React Toast when the profile gets updated here below.

        // step445: can put ".success" below in order to show the toast with a "green tick" indicating a success there in the toast everytime user clicks the Save button in the dashboard there : BUT FOR THIS TO WORK WE NEED TO ADD IN THE IMPORT : import { ToastContainer, toast, Bounce } from 'react-toastify'; i.e. : an extra "toast" now must be imported too now for this to work thus here below.

        // step446: see the next steps in the razorpay folder's page.js file there now.
        toast.success('Profile Updated!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    return (

        // step443: must put a react fragment <> .... </> here now to wrap the whole code below as we are using multiple HTML elements below ; but in React a component can return only a single element so we wrap the whole code below in a single React fragment , so it will be the only one being returned now here below & thus won't show anymore error now here below in our code here below.
        <>

        {/* step442: then we now put the container of toast as usual at top in "return" section/block here below. */}

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />

        {/* step183: AI generated the styles and codes below for a form , so lets see it here first. */}

        {/* step541: lets give it some hoizontal padding to solve the issue coming in the smaller devices there , here below. */}

        {/* step542: see the next steps in PaymentPage.js file now there. */}
            <div className='container mx-auto py-5 px-6 '>
                <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>

                {/* step393: now lets run a function on submitting the form below.
                
                // step405: and we have used "action" here and not "onSubmit" below ; because its a server action that we want to run with the server too from the useraction.js ; its not just an event but getting the server involvement too , so use action instead here. */}
                <form className="max-w-2xl mx-auto" action={handleSubmit}>

                    <div className='my-2'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>

                        {/* step184: we have made the input tag to show the state variable form which is an object , uska "name" to be shown here if it exista , else show it empty "" here below. */}

                        {/* step185: now using onChange , so : the handleChange function runs everytime we type something in the input tag. */}
                        <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input for email */}
                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 

                        // CAN ADD DISABLED HERE IN EMAIL AND IN USERNAME INPUT TAG TOO BELOW TO PREVENT THE USER FROM CHANGING USERNAME AND EMAIL BY THEMSELVES.
                        disabled />
                    </div>

                    {/* input forusername */}
                    <div className='my-2'>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        // step463: now lets update disable the username input tag itself ; so that user can't change it ; making all the things we wanted to fix in previous steps in useractions.js to go itself now here/there.

                        // step464: see next steps in [username] folder's page.js file there.
                        disabled
                        />
                    </div>
                    {/* input for profile picture of input type text */}
                    <div className="my-2">
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                        <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* input for cover pic  */}
                    <div className="my-2">
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
                        <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input razorpay id */}
                    <div className="my-2">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Id</label>
                        <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} 

                        // step413: we made the type as "password" here and in secret input tag too , to make it look like a secured key now there.

                        // step414: and so now we save the key id and secret from env local and put there ; we can also keep it still in env OR remove too ; your wish nothing changes by that ; it affects nothing here by doing that there.

                        // step415: see next step in PaymentPage.js file there now.
                        type="password" name='razorpayid' id="razorpayid" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input razorpay secret */}
                    <div className="my-2">
                        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
                        <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="password" name='razorpaysecret' id="razorpaysecret" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* Submit Button  */}
                    <div className="my-6">
                        <button type="submit" className=" cursor-pointer block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none   dark:focus:ring-blue-800 font-medium text-sm">Save</button>
                    </div>
                </form>


            </div>
            </>
    )
}

export default Dashboard
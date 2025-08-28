// "use client"
// import React from 'react'

// // step136: lets import all to use the useRouter below
// import { useRouter } from 'next/navigation'
// import { useSession , signIn , signOut } from 'next-auth/react'

// const page = () => {

//   // step137: now we like we did in login folder's page.js : we here also want to redirect to "/login" webpage as soon as user signs out and session object becomes null : so we copy the code done there in login.js folder too : to redirect to /dashboard there when user logs in : and when user : logs out we want it to come back to '/login' page : so we similar to that : write the code below.

//   // step138: now see the next steps in [username] dynamic route folder there.
//   const {data : session} = useSession()
//   const router = useRouter()
  
//   if(!session){
//     router.push('/login')
//   }

//   return (
//     <div>
//       I am dashboard
//     </div>
//   )
// }

// export default page

// -----------------------------------------------------------------------------------------------------

// step191: we shifted all logic to a component named Dashboard.js there with all these imports and all there : so we commented all the above code and rather write a code below now -

// step193: we import the component from the respective folder here to use it now here.
import Dashboard from '@/components/Dashboard'

const DashboardPage = () => {
  // step192: so now whene user visits "/dashboard" , Next.js will load this app/dashboard/page.js > but our UI and logic now is in Dashboard.js of components folder > so we make this component to return that "DAshboard" component and render it on the webpage there.
    return <Dashboard/>
}

// step194 : this came as boilerplate of "rafce" that we do : so that incase this page.js file is imported somewhere , it will export the DashboardPage function there , that we made above there now.
export default DashboardPage

// step195: see nex steps in .env.local file there

// step505: we used the metadata below to set the title and description of our webpage now here.

// step506: see the next steps in the [username] foler's page.js file now.
export const metadata = {
    title: "Dashboard - Get Me A Juice",
    description: "Fill your details to embark the start of your account in our community and start recieving funds from your Supporters."
}

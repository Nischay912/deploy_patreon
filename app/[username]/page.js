// step103: so we are now using dynamic routes by making the folder named inside [ ] : which makes us now access the parameter passed after localhost:3000/ in URL 

// step104: so now if we go on localhost:3000/nk : params = {username : "nk"} gets extracted by NextJs here as we made file inside [ ] : and then the key in params matches the folder name inside [ ] and now if we go on localhost:3000/nk > we will have username : nk & so we will see "params.username" as "nk" in the code below.
import PaymentPage from '@/components/PaymentPage'
import React from 'react'

// step465: lets import the following hooks to be used now in the next steps here.
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb';
import User from '@/models/User';

// step470: now we are trying to make sure that the suer only sees his /ben0912gorge datapage and not /mary even if mary logged in with her own github id and secret later there.

// step471: getServerSession(authOptions) fetches the current logged-in user’s session on the server & authOptions contains your NextAuth configuration (providers, callbacks, secret).
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

// step283: we had params here in this dynamic route page : as here > NextJs automatically injects params ; which contains the value in URL like "/nischay" then in this [username] dynamic route folder we will automatically will have by NextJs > params = { username : "nischay"}

// WARNINGS WAS COMING SO REPLACED BELOW CODE IN A DIFFERENT SYNTAX HOWEVER LOGIC IS SAME

async function Username({ params }) {

  // step466: lets connect to the database here first.
  await connectDb()

  // step472: get the current session using NextAuth we imported above.
  const session = await getServerSession(authOptions)

  // step473: The line below now : Checks if a user is logged in ; If no session (not logged in), redirect or show not found ; This prevents non-logged-in users from accessing this page.
  if (!session){
     return notFound() 
  }

  // step474: Then we below find the user in the database based on URL username written there as thi sis a dynamic route folder [username] that stores the username we typed after / there in params = {username : <here>}
  const u = await User.findOne({ username: params.username })

  // step467: then we find the document with username equal to the username present in the [username] passe din the URL ; as this is the dynamic folder [username] that has params : {username : <set to what we typed in url>}

  // COMMENTED AS WE USED THE SAME IN "STEP474" LATER THERE TOO.
  // let u = await User.findOne({username : params.username})

  // step468: if no user found ; i.e. if the current user logged in tries to see the data page of other users by trying to edit the username page , then we can make it show "404 Not Found page" using the notFound function used below.

  // step469: so now if i am "ben0912gorge" , i can't type "/mary" as its not in database ; so will show 404 error if we try to got there by typing in the URL there on the website there.
  if(!u){
    return notFound()
  }

  // step475: now we find the logged in user based on their GITHUB ID  ; as when we logged in using github NextAuth saves that id in the session under the object "user" with property "id" having that github id there : 
  /*
  // NOTE: The findOne({githubId}) query worked despite no githubId in schema because:
// 1. MongoDB silently ignores queries for non-existent fields (returns null)
// 2. NextAuth's session.user.id contains the GitHub ID automatically
// 3. Our auth flow likely fell back to email matching internally
// 4. In production, we should explicitly handle GitHub users via email matching; or add githubId to schema if tracking OAuth identities is needed.
  */

// Safer alternative can be here : that doesn't rely on non-existent fields ; so this below can be done to avoid confusion too but for now lets comment this and use githubid one only thats being used below.
// let u = await User.findOne({ email: session.user.email }); 

  const loggedInUser = await User.findOne({githubId : session.user.id})

  // step476: if the logged in user doesn't exists in DB or not matches to logged in usr present in session , we show 404 Not found page below here.
  if (!loggedInUser || loggedInUser.username !== u.username) {
    return notFound()
  }

  // step477: NO NEED OF THIS LINE NOW AS WE CAN DIRECTLY TAKE THE USERNAME FROM THE PARAMS THERE ; USING AWAIT LIKE BELOW MAY MAKE DELAY UN-NECESSARILY WHEN TRYING TO GO ON /ben0912gorge page and all : SO BETTER TO AVOID IT AND NOW PASS username ={params.username} on the line below this below line insetad of username={username} that was earlier there.

  // const { username } = await params;
  // return <PaymentPage username={username} />;
  
  return <PaymentPage username={params.username} />;
}

// step478: see next steps in Navbar2.js file now there.


// const Username = async ({params}) => {
  // return (
    // step139: we now wrap whole code in a react fragment so that we can use multiple divs inside it, as any react component can return only one element , not multiple of them.
    // <>

    {/* step282: now we import that file here where we pasted the code from here to keep it at that one place there. */}

    {/* step284: now we use the syntax : <ComponentName propName={value} /> : to inject a prop to a component thats included here > so we pass the username to the component as there we were using "username" from the "params" here. */}
    // <PaymentPage username = {params.username}/>

{/* COMMENTED OUT DUE TO THE "STEP179" IN PAYMENTPAGE.JS FILE THERE. */}
{/*
    {/* step105: this written just to test that dynamic route is working or not below. 

    {/* step106: see continuation now in Navbar2.js file 
      {/* I am {params.username} 

    {/* step140: lets now put our gif for cover image in the div below named as "cover" className here. 

    {/* step141: lets put a container for the cover gif first with some light color to see how the container there with full width to cover the whole screen 100% of the viewport. 

    {/* step143: lets make it relative so that the profile picture that we will set next , can be positioned w.r.t to this cover image there now. 
    <div className='cover w-full bg-red-50 relative'>

      {/* step142: now lets put object-cover : so that the image covers the container maintaining its aspect ratio ; cropping parts if necessary but covering the container fully : but : object-cover only controls how the image behaves inside its own box. It doesn't set the width or height of the image itself : so we set it too below. 
        <img className = "object-cover w-full h-[350px]" src="/cover.gif" alt="" />

        {/* step144: now lets put our profile picture here positioned absolute and make adjustments to its position w.r.t to the cover image as we had made it relative in last step so that it can be positioned w.r.t to that cover image now here. 

        {/* step146: now lets make it absolute position , so that now it will be positioned w.r.t to the cover banner there now : and lets adjust its position below too. 

        {/* step147: can give "-bottom" class to go below the cover image too in -ve axis there and then: we put the image to be at <some>% distance from the left margin of the screen too , to make it be at centre there.
        <div className='absolute -bottom-20 left-[45%]'>
          {/* step145: adjust its height and width below & also adjust paddings and all along with giving it a glowing shadow to look good using shadow class : we had in CSS syntax here : "box-shadow: offset-x offset-y blur-radius spread-radius color"; , but in TailwindCSS ; we have : shadow-[0_0_20px_5px_rgba(168,85,247,0.6)] i.e. spaces replaced by "_" rest as it is > 

          <img className="rounded-full border-purple-600 p-[5px] bg-black shadow-[0_0_20px_4px_rgba(168,85,247,0.6)]" height={150} width={150} src="/profile.png" alt="" />
        </div>
    </div>

    {/* step146: now we add the text to be written below the profile picture there. 

    {/* step148: make it flexbox and give central positions and all to make it come at centre ; also it by this hides behind the profile picture ; so give some margin from top to come below the profile picture there. 

    {/* step150: make it flex col to make all divs come one below the other here with some gap in between them too here below. 
    <div className='info flex justify-center items-center my-25 flex-col gap-1'>
          {/* step147: access the username from the URL , as this was a dynamic route folder : so has > localhost:3000/nischay > then > params = { username : "nischay" } 
          <div className='font-bold text-lg'>
            @{params.username}
          </div>
          {/* step149: add the other details below too in other divs here. 
          <div className='text-slate-400'>
            Selling Juices to Raise Funds
          </div>
          <div className='text-slate-400'>
            979 members • 82 posts • $14679/release
          </div>

          {/* step151: lets make a div now to be below the cover me made and will allow people to pay here and also show the name of people who paid and supported us. 

          {/* step152: lets make it flexbox to keep the supporters list and making payment in same line and not one below the other here. 

          {/* step157: lets make the elements to take 1/2 width of this parent div below , which itself is taking 80% width here as mentioned below. 

          {/* step158: see next step in layout.js for a fix there and after that come for the next steps back here again. 

          {/* step165: lets make some margin from top for the two containers 
          <div className='payment flex gap-3 w-[80%] mt-10'>

                {/* step154: lets give it 50% width and some bg color in it too ; alos make this container have some border radius too. 

                {/* step155: also give some padding to make the text inside to have some space from the borders of the container box too here. 
                <div className="supporters w-1/2 bg-slate-900 rounded-lg p-10">

                {/* step153: also give some heading at top named supporters here with a list showing the people who made payment and supported us. 
                <h2 className='text-2xl font-bold my-5'>Supporters</h2>

                {/* step166: lets give some horizontal margin to the list appearing there. 
                <ul className='mx-5'>
                  {/* step162: lets design the list below now. 

                  {/* step163: we replicated the list belwo to 10-11 items to see whats happening and saw some ehite background at bottom on scrolling : so WE EDITTED IT IN NEXT STEP IN LAYOUT.JS AND THEN COME BACK HERE AFTER THOSE STEPS THERE. 

                  {/* step176: also lets make it a flexbox so that the gif and message be in same line and not one below the other here ; also put items centre to make the gif and text to be vertically centre aligned in the same line here below. 
                  <li className='my-4 flex gap-2 items-center'>

                    {/* step175: we now add a gif of a person from lord-icons here below : and give some width to it : to make it look smaller and good here. 
                    <img src="avatar.gif" alt="" width={33} />

                    {/* step177: we now place the message in a span to make it be in same line of gif and also can style it later if its inside some element instead of being without an element here ; and also lets bold the money donated here below too. 
                    <span>Suraj donated <span className='font-bold'>$30</span> with a message "I support you bro ❤️"</span>
                  </li>

                  {/* step178: replicate the update <li> that we made above now below too : to see more sample messages like this and see how the UI is looking here now. 
                  <li className='my-4 flex gap-2 items-center'>
                    <img src="avatar.gif" alt="" width={33} />
                    <span>Suraj donated <span className='font-bold'>$30</span> with a message "I support you bro ❤️"</span>
                  </li>
                  <li className='my-4 flex gap-2 items-center'>
                    <img src="avatar.gif" alt="" width={33} />
                    <span>Suraj donated <span className='font-bold'>$30</span> with a message "I support you bro ❤️"</span>
                  </li>
                  <li className='my-4 flex gap-2 items-center'>
                    <img src="avatar.gif" alt="" width={33} />
                    <span>Suraj donated <span className='font-bold'>$30</span> with a message "I support you bro ❤️"</span>
                  </li>
                  <li className='my-4 flex gap-2 items-center'>
                    <img src="avatar.gif" alt="" width={33} />
                    <span>Suraj donated <span className='font-bold'>$30</span> with a message "I support you bro ❤️"</span>
                  </li>

                </ul>
              </div>

              {/* step156: lets give the same class to this div below too as we want it to be similar in shape taking the rest 50% of the parent container which it is in. 
              <div className="makePayment w-1/2 bg-slate-900 rounded-lg p-10">

              {/* step167: lets now write similar heading styles to the left container , in this one too 
                  <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>

                  {/* /step168: then lets place a flexbox with the input tag to enter amount and pay button horizontally placed in it 

                  {/* step173: make it xolumn flexbox to make things come one below the other here. 
                  <div className="flex gap-2 flex-col">

                    {/* step172: lets add input fields for name and message too here below. 
                    <input type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder="Enter your name" />
                    <input type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder="Enter a message" />

                    {/* step169: lets place the input tag below that takes full width as its parent container and give some padding to the text we type in it too here below. 
                      <input type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Amount" />
                      {/* step170: also lets place a button to pay there as well 

                      {/* step174: now lets comment the default pay button we made & place a better button from TAILWIND FLOWBITE website here. 
                      {/* <button className='bg-slate-800 p-3 rounded-lg cursor-pointer hover:'>Pay</button> 
                      <button type="button" className="cursor-pointer text-white bg-gradient-to-br from-purple-800 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay</button>
                  </div>

                  {/* step171: also lets place some buttons for quick payments below and give some gap and keep them as a flexbox in same line ; also give some margin space from the top to these buttons too there. 
                  <div className='flex gap-2 mt-5'>
                    <button className='bg-slate-800 p-3 rounded-lg cursor-pointer'>Pay $10</button>
                    <button className='bg-slate-800 p-3 rounded-lg cursor-pointer'>Pay $50</button>
                    <button className='bg-slate-800 p-3 rounded-lg cursor-pointer'>Pay $100</button>
                  </div>
              </div>
          </div>
    </div>
*/}
    // </>
  // )
// }

export default Username

// step507: now lets set the title dynamically of this webpage based on the parameters passed , using the code below.
export async function generateMetadata({params}){
  return{
    title : `${params.username} - Get Me A Juice`
  }
}

// see step508 in login folder's page.js file now there.


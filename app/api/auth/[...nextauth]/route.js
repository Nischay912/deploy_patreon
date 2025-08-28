// step95: we have made it as "route.js" as its an API ENDPOINT

// step96: so we now copy the code from the documentation of NextAuth below.

// step97: now see the next steps in login folder's path.js file there.
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

// step216: lets import mongoose to be used here now.
import mongoose from "mongoose"

// step217: import the models created now.
import User from "@/models/User"

// step243: import the connectDb file we made to connect to database there.
import connectDb from "@/db/connectDb"

export const authOptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // step198: we now copy the below code after searching callbacks in NextAuth there : We have copied code of SignIn callback here : which allows us to save the data of signed in user to the database ; then we use this signIn callback code below ; in NextAuth, we can define functions that run at certain events (like sign-in, session creation, redirect, etc.) using "callbacks"
  callbacks: {

    // step219: this will be called everytime someone signsIn automatically using nextAuth here.

    // step220: we pass object with certain parameters in it like : "user" object from Github provider ; "account" that gives info about the Github provider ; "profile" info from that Github Provider ; "email" of user ; "credentails" if using usernam/password.
    async signIn({ user, account, profile, email, credentials }) {

      // step199: we deleted the code that was there copied from documentation and write our own code inside here now.

      // step200: we now want to check if the provider is GITHUB i.e. if user is signing in using Github ; then we want to save that user's data to our database too.
      if(account.provider == "github"){

        // step245: lets now connect to the database by the connectDb file that we imported
        await connectDb()


        // step246: SO NOW : now we will be able to see the database of MongoDB getting updated everytime a user logs in.

        
        // step247: now lets go to Navbar2.js now for next steps there.


        // step201: so we connect to the MongoDB database using mongoose by following code below , and passing the mongoDB url here and providing a database named "juice" also in the URL given in connect() here below.

        // step202: to use mongoose install it in terminal by : npm i mongoose

        // step244: we now remove this line as we are using the connectDb file for connecting to database now ; as now the connectDB file has made the connection to be made simpler and clean at one place only instead of being in the callback fucntion thats called for multiple routes everytime there.
        // const client = await mongoose.connect("mongodb://localhost:27017/juice")

        // step203: then we use the below code to check if user is already in the database or not

        // step204: but we will use a different approach here.

        // step205: we create models folder and see the next steps there now.
        // const currentUser = await client.db("users").collection("users").findOne({email : email})

        // step218: now we write the following code below -

        // step221: we now look for the user in databse with the logged in email ; and must put "await" here as findOne is async function and needs time to find so await for it to find and then only proceed to the next line here.
        const currentUser = await User.findOne({email : email})

        // console.log(currentUser) //OPIONAL :WILL REMOVE LATER : IT SONLY FOR DEBUGGING TO SEE THE OBJECT BEING FORMED IN CONSOLE TOO.

        // step222: if user doesn't exist in database , the above code would have returned null and so the if statement runs below.
        if(!currentUser){

          // step223: we now create a new document using the Mongoose model we created in models folder named "User" here below.
          const newUser = await User.create({

            // step224: we extract the part before @ in email for username and creates this new User with these data ; so we are only setting the required fields that was there in the schema of User in the models folder there.
            email : user.email,
            username : user.email.split("@")[0], //put this below the above line else how will you split the "email"
          })

          // step225: we now save the "newUser" document in MongoDB database's collection named "User" that we create d in models folder there.

          // COMMENTED THIS OUT AS TEACHER TOLD WE WILL SAVE IT LATER , NOT BY THIS CODE HERE
          // await newUser.save()

          // step226: update the "user" object now that NextAuth uses.

          // COMMENTED BECAUSE OF STEP 225 
          // user.name = newUser.username

          // console.log(newUser) : was just for debugging
         }

        // step227: else if user already is in database : we set the name as that current user's username here

        // COMMENTED BECAUSE OF STEP 225 and 231
        // else{
        //   user.name = currentUser.username
        // }
       
         // step228: This is required to allow sign-in ; as NextAuth needs this boolean return in callabck used here to allow sign in or not based on true or false we returned here.
         return true;
      }
    },
    // step229: lets now make a session callback as the above signin callback was used to control who can sign in ; but we need session callback to control the info to be sent to frontend after user signs in.

    // step230: the previous if else method above used to set the user.name only when user signs in ; if we changed the username in backend , frontend wouldn't know until user logs in again.

    // step231: so we commented that line from if statement above ; and now use the session callback ; which always fetches the current username from the database ; so no need of if-else in sign-in ; frontend will always see the latest username now.

    // step232: After sign-in, whenever the frontend wants session info, the session callback runs to fetch latest user info from DB : so this session callback runs everytime forntend or backedn wants to know who is logged in.
    async session({ session, user, token }) {

      // step233: this code was copied from the documentation below

      // step234: we look for new user who has email same as the email of the user logged in and having its email in the session object currently.

      // step235: so dbUser will now has the complete document from MongoDB
      const dbUser = await User.findOne({email: session.user.email})
      // step236: now whatever username is in database , we add it to the session  ; In NextAuth, the session object is what your frontend gets when it asks “who is logged in?” ; session object has name , email , etc : so we are setting the session's name to the username , whichwe had set above using the split("@") there.

      // step237: its better than else and all used earlier which we now commented out because : Even if you later change the username in the database, session.user.name will always reflect the latest value. It’s no longer tied to the sign-in event; it’s dynamic.

      // step238: see next step in db folder created new there.

      // NOTE : "if (dbUser)" ensures THAT WE only access ".username" when a user actually exists in the database. That simple check prevents the TypeError and fixes the login redirect issue.
      // if(dbUser){
        session.user.name = dbUser.username
      // }

      return session
    },
 }

})

export { authOptions as GET , authOptions as POST}

// This file is the bridge between your frontend and GitHub’s OAuth API.

// The [...nextauth] part is called a catch-all route — it means any request starting with /api/auth/ will be handled by this file.
// step67: we make this a client component always because : the SessionProvider and all to be used here rely on browser APIs like window and all : that are only available in the browser.
"use client"

// step68: so we will be making a client component now so that we can use it later in a server component later there.

// step69: lets copy the code from the documentation of NextAuth here below and then make some changes in it as done below.
import { SessionProvider } from "next-auth/react"

// step70: we pass {children} which is a React prop which contains whatever we put inside the SessionWrapper wherever we will use it later.
export default function SessionWrapper({children}) {
  return (
    // step71: we return the JSX code where all children gets wrapped in the SessionProvider : so wherever we use SessionWrapper next : whatever is wrapped in it : can know whether the user is logged in or not ; trigger login/logout actions , etc there.

    // step72: since we named this function as SessionWrapper ; so : whatever we put inside the <SessionWrapper> .... </SessionWrapper> where we export this function : there we will be able to use the authentication features provided by SessionProvider.

    // step73: next step in layout.js ffile : see there now.
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
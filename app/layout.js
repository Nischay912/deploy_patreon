import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/Footer";
// step74: lets import the SessionWrapper function we made.
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // step3: set the title and meta description of the page here now.
  title: "Get Me a Juice - Fund your projects with a glass of Juice",
  description: "This website is a crowdfunding platform for creators.",
};

export default function RootLayout({ children }) {
  return (
    // This extra suppress and all came from deepseek due to some tree hydration error and warning that was coming in the console there on the browser.
    <html lang="en" suppressHydrationWarning>

      {/* step164: lets give the background color we gave to Navbar and all below to the "whole body itself now" so that it remains this only always and never and nowhere appears white even by mistake : so we removed it from there and pasted it here now. */}
      <body className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white" suppressHydrationWarning>

      {/* step75: lets wrap the whole components inside the body of every webpage present in layout.js file here : inside SessionWrapper that we imported. */}

      {/* step76: so now whole App will be provided with session using the "SessionProvider" as we saw there in the SessioWrapper.js file that : whatever we will wrap inside the <SessionWrapper> will be sent as {children} to that file & will be provided with sessions , due to <SessionProvider> wrapped to the {children} there. */}

      {/* step77: see the login flder for next steps there now. */}
      <SessionWrapper>

            {/* step5: we include the Navbar and Footer on all the webpages by placing them like this above and below the children respectively ; like done here below. */}
            <Navbar2/>
            {/* step6: we now put a minimum height to the content of the page below : to set it to 100vh of CSS.*/}
            {/* <div className="min-h-screen"> */}

            {/* step14: we now give some height by hit and trial here instead , to make the footer appear at the bottom without making scroll-bar to appear there. */}

            {/* step16: added only the color backgorund part now in the div of the content here ; not the paddings and all from there. */}

            {/* WE ALSO GAVE TEXT-WHITE SO THAT THE TEXT COLOR BY DEFAULT OF THE WEBPAGE BECOMES WHITE IN THIS DARK BACKGROUND HERE BELOW. */}

            {/* step159: we make it take full screen's height now : as it will now take the full screen's height and giev bg color in full without having any gap from the footer there. */}

            {/* COMMENTED THIS FOR STEP164 : READ THERE WHY DONE SO ABOVE THERE. */}
            {/* <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white"> */}
            <div className="min-h-screen">
              
            {/* step15: lets use IBELICK to get background of our choice in TailWind CSS below.*/}
            {/* <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div> */}

              {children}
            </div>
            <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}


  



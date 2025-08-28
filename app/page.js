import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    // step29: it caused error as we were trying to put multiple divs and return multiple divs , but React component returns on parent root element only ; so lets put this all inside a React fragment <> ... </> below ; so now we can use multiple divs inside it now.
    <>
    {/* step1: we start off by clearing the data that was here pre-defined and now will write our own code below. */}
    {/* step2: create a components folder for next steps there. */}
      {/* step17: we now put a header at top here below. */}

      {/* step19: lets give it some background for now to see the height of its container clearly and make it centre of it accordingly : WILL REMOVE IT LATER ; then we give a height to it by hit and trial to set how large we want it , to centre the text at centre of it */}

      {/* step20: then we give both justify and items centre to bring it at centre of container */}

      {/* <div className="text-white flex justify-center bg-amber-100 h-[44vh] items-center"> */}
      {/* step21: and finally remove the background color after we have used it below. */}

      {/* step23: lets make it colm flexbox to keep things one below the other in this div */}

      {/* step27: lets give some gap between the elements present column wise in the flexbox here. */}


      {/* step529: lets give it osme padding in smaller devices and keep the padding 0 in md larger screens like they were too initially here below.*/}

      {/* step530: also lets make the font smaller in small devices & for larger device "md" ; lets keep it as the default base text size only here below. */}
      <div className="text-white flex justify-center  h-[44vh] items-center flex-col gap-4 md:px-0 px-5 md:text-base text-xs">
        {/* step18: lets make it larger and bold too. */}

        {/* step31: we now save our GIFs in public folder and then use it here below. */}

        {/* step32: make it flexbox to keep the gif in same line and centre it too and can give som egaps too.*/}

        {/* step531: lets make the size of text here also small in smaller devices and large in larger devices "md" here below. */}
        <div className="font-bold md:text-5xl flex justify-center items-center gap-2 text-3xl">
        Get Me a Juice <img src="/juice.gif" alt="" width={88} />
        </div>
        {/* step22: we now set a paragraph below the header we wrote above here. */}

        {/* step532: make both the below paragraphs centre aligned in smaller devices now here ; while keeping ti left only still in the larger "md" devices here. */}
        <p className="text-center md:text-left">A crowdfunding platform for creators.</p> 
        <p className="text-center md:text-left">Buy your favourite Juice here and support the creators. Start now!</p>
        {/* step24: now we add two buttons below from TAILWIND FLOWBITE WEBSITE THAT HAS PRE DESIGNED BUTTON CODES. */}
        {/* step25: pasted the arrow code using CHATGPT */}

        {/* step26: wrap the buttons in a div too : so that flexbox can be applied to them too : as flex properties not applies to non-html elements. */}
        <div>

          {/* step490: now leyts use Link to redirect the webpage to /about when clicked on Read more & when clicked on Start Here ; then we redirect it to /login page now. */}
          <Link href = {"/login"}>
            <button type="button" className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here &#10148;</button>
          </Link>

          {/* step491: now lets make the /about page in about folder's page.js file now : so go see there , the enxt steps now there. */}
          <Link href = {"/about"}>
            <button type="button" className="cursor-pointer text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More &#10148;</button>
          </Link>
        </div>
      </div>
      {/* step28: lets now try to make a horizontal line seperator here. */}

      {/* step30: lets style it to make it a seperator for our section now.  */}
      <div className="bg-white h-1 opacity-15"></div>

      {/* step33: now in the section below the seperator line , lets build the following things now. */}

      {/* step34: make text white to suit the background. */}

      {/* step41: lets give it container class , so that : Sets a max-width that changes responsively depending on the screen size & applied mx auto to mkae sure its aligned to the centre with equal horizontal margins from both the sides there to it.*/}

      {/* step47: we also lets give padding from top and bottom by hit and trial whatever suits here below & we apply it in the div that we made below the seperator too same like this there too. */}

      {/* step533: lets make it to have some padding in smaller devices here below. */}
      <div className="text-white container mx-auto pb-32 pt-14 px-10">

        {/* step39: lets make the heading of this section a bit larger and bolder ; and also make it horizontal using text-centre and give some margin to it from the top too ; to keep some gap from the top seperator line there.*/}

        {/* step46: lets make the margin we gave as "mb" as we want to have some margin given between this section & the bottom dividers and footers here. */}

        {/* WE LATER MADE THESE H2 , NOT H1 : AS IT WAS NOT MAIN HEADING : SO IT WON'T AFFECT THE LAYOUT OF OUR APP , BUT AS PER "SEO PERSPECTIVE" : WE WILL GET A BETTER SCORE IF THESE THINGS ARE KEPT IN MIND. */}
        <h2 className="text-3xl font-bold text-center mb-14">Buy Juice for your Creator</h2>

        {/* step36: lets make it a flexbox to keep each div.item inside to be in a horizontal line and lets put some gap between the items too below & so keep justify around each div.item too below. */}

        <div className="flex gap-5 justify-around flex-col md:flex-row">

          {/* step38: lets give some space between the image and <p> inside vertically */}
          <div className="item space-y-3 flex flex-col items-center justify-center">

            {/* step35: add some classes to put the gif in a circular box there with some padding to make the image come in centre of the circle */}
              <img src="/connection.gif" alt="" width={88} className="bg-slate-400 rounded-full p-2 text-black"/>
            {/* step37: lets make the below text bolder */}

            {/* step534: in all these font-bold below , we also add "text-centre" to look good in smaller devices too. */}
              <p className="font-bold text-center">Support Creators</p>
              <p className="text-center">Help your favorite creators grow by funding their work directly.</p>
          </div>

          {/* step40: lets add two more of the same item made above below */}
          <div className="item space-y-3 flex flex-col items-center justify-center">
              <img src="/coin.gif" alt="" width={88} className="bg-slate-400 rounded-full p-2 text-black"/>
              <p className="font-bold text-center">Fund yourself</p>
              <p className="text-center">Turn your passion into income with the support of your community.</p>
          </div>

          {/* step43: lets make it column flexbox and centre everything to make the text come one below the other centrally aligned there : AND MAKE THE CHANGES IN ALL THE THREE ITEMS HERE ABOVE TOO. */}
          <div className="item space-y-3 flex flex-col items-center justify-center">
              <img src="/independence.gif" alt="" width={88} className="bg-slate-400 rounded-full p-2 text-black"/>
              <p className="font-bold text-center">Empower Creativity</p>
              {/* step42: can add one more paragraph below the gif we placed there below & make it text centred to look cleaner.*/}
              <p className="text-center">Give creators the independence to focus on what they love doing.</p>
          </div>
        </div>
      </div>

      {/* step45: also lets add the seperator we made here between the two sections made here below. */}
      <div className="bg-white h-1 opacity-15"></div>

      {/* step44: lets copy the div made above below to make a similar section to it here below too. */}

      {/* step49: now lets make it a flex box with center properties to make the youtube video and everything come at the center in it */}

      {/* step50: next steps in Navbar.js : so go there now. */}
      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn More About Us</h2>

        {/* step48: now we go on youtube and click share & embed the youtube video here below. */}

        {/* step535: lets add responsiveness to this youtube embed here below. */}
        <div className = "w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          
          {/* step536: also then we remove the width and height below and give it w-full and h-fit now here below. */}

          {/* step537: see next step in Navbar2.js now there. */}

            {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/MnkgMu22-zU?si=wKGWjBLErJ78zqdm" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}

            <iframe className="w-full h-full border-0" src="https://www.youtube.com/embed/-hwds71xiFE?si=vezqp9xUBVOUA0Df" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>

      </>
  );
}

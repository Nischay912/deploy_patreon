"use client"
{/* step274: we must make it a client component as we now will do the things to be done on the client side here in this file. */}
import React , {useEffect, useState} from 'react'
// step177: import the Script to be used here below instead of <script> because : Prevents script execution before the page is ready. Works properly in server-client environment of Next.js .

// step178: and after that : replace all <script> by capital "S" in them now belwo in our copied code from the documnetation there below.

// step279: we now take the whole code of [username] folder and place it here in this file only for all the frontend to be here only : so copy the whole code of there and paste here below.
import Script from 'next/script'
import { fetchUser, fetchPayments, initiate, fetchAllPaymentsCount , fetchTotalAmount} from '@/actions/useractions'
import { useSession } from 'next-auth/react'

// step428: import the toast packages form the documentation too below.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

// step430: lets import this package from next/navigation now below.
import { useSearchParams } from 'next/navigation'

// step436: we import useRouter hook to be used here now in the next steps here below.
import { useRouter } from 'next/navigation'

// step285: we now access the username property from the "username" of params as only username is being used here in the next step 186 , mentioned there.
const PaymentPage = ({username}) => {

    // step305: lets now make the "paymentform" using the useState snippet here below : which will be a form to accept the name , message and amount user writes in the input tags there before paying it there.

    // step306: as usual we make the form as an empty object initially
    const [paymentform, setpaymentform] = useState({name:"" , message:"" , amount: ""})

    // step347: lets create a state to have the currentUser data in it.
    const [currentUser, setcurrentUser] = useState({})

    // step360: now create the useStateSnippet for the setPayments being used in the previous steps that we saw there below.

    // step361: we had used ".find" in the fetchPaymnet function of useractions.js : so we will recieve an array ; so initialize to an empty array below and not to an empty object here below.
    const [Payments, setPayments] = useState([])

    // step514: now lets add a new state that stores the count of payment done , here below.

    // step515: initial value set to 0 menaing 0 count initially and will update accordingly using the setpaymentCount function here below.
    const [paymentCount, setpaymentCount] = useState(0)

    // step523: now createa state to store the sum of total payment done so far , here below.
    const [totalAmount, setTotalAmount] = useState(0)

    // step431: now lets use the imported package below like we do usually always there , here below.
    const searchParams = useSearchParams()

    // step437: now lets the hook we importe dhere below first.
    const router = useRouter()

    // step308: we now lets define the handleChange function here below.

    /* step309: so the handling form happens like below here -

        "e" is the event object : Every time a user types in an input, React automatically passes an event object "e" to the function ; example : "e.target" means the <input> element where we typed in ; then : e.target.name gets the "name" we had set in the input tag there ; like "name" , "message" , "amount" ; and what we types in the respective input tag becomes the value of the input tag i.e. if we typed nischay in input tag ; "e.target.value" is "nischay" ; then we have "...paymentform" to copy the existing values of the state , so that we dont lose the existing fields while updating them ; and then "[e.target.name]: e.target.value" means : it will keep updating the respective field like : {name : "Nischay" , message : "" , amount : ""} it becomes and if we change value typed in input tag , it will update in the form too using the "setpaymentform" function here.

        Thus each time user types in input tag ; it runs the handleChange function and keeps updating the paymentform here.
    */

    // step366: now we have to run getData for which we will use useEffect here below.
    useEffect(() =>{

        // step367: so now the function below will run at the first time when the website renders , because we have used [ ] below in the useeffect here & so it will load all datas using the getdata function , when the website is laoded for the first time here/there.
        getData()
    } , [])

    // step432: now we make another useEffect below.
    useEffect(()=>{

        // step433: searchParams lets us to read the query parameters from the URL ; so like we made a URL to be redirected too containing "?paymentdone=true" ; that is what we are checking below , that if its directed to it after successful payment , then we show the toast below ; copied from the documentation website there as "Toast Emitter" used to show the toast written below there.
        if(searchParams.get("paymentdone") == "true"){
            toast('Thanks for your donation❤️!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // since in step429 we use Bounce , so use here too below.
                transition: Bounce,
            });
            // step438: we now make the webpage to be redirected to the /ben0912gorge page i.e. the username page based on the logged in user as soon as toast comes after the payment is done using the "router.push" method below.
            router.push(`/${username}`)
        }
        // step434: so we make the useEffect to run only when the searchParams changes (as it contains the query parameters in the URL , written after the "?" there) : and then only it would have changed the query parameter to "?paymentdone=true" , after we have done successful payment and been redirected to the page : localhost:3000/paymentdone=true ; so when the searchParams changes , then only like done here ; we will make this useEffect to run and show the toast above.

        // step435: It will Show toast only if paymentdone=true in the URL query parameters
    // Note:
    // 1. searchParams only contains values **after the '?'** in the URL.
    //    Example: /dashboard?paymentdone=true → searchParams.get("paymentdone") === "true"
    // 2. Navigating to a different path like /dashboard/ben0912gorge **does NOT change searchParams**
    //    because there is no query string in that URL.
    // 3. Therefore, the toast will NOT show unless the URL explicitly has ?paymentdone=true
    // } , [searchParams])

    // step439: commneted above one and made now to [ ] : This is useful when we want something to happen exactly once, like showing a toast after payment, and then redirecting the user ; putting searchParams was risky as just by putting that ?paymentdone=true manually in URL would run this too as searchParams chanegs , so better to have [ ] so that it will show the toast only once when the paymentdone=true comes by itself there and then redirects user back to /ben0912gorge ; so that no one gets to know too that ?paymentdone=true is ther ein the URL as due to the useRouter they will be redirected to /ben0912gorge page without reloading the webpage there after the payment is done ; this wa sth ebenefit of using the useRoute that we used there above.
    } , [searchParams])

    // step440: see the next steps in "Dashboard.js" file there now.

    const handleChange = (e) =>{
        setpaymentform({ ...paymentform , [e.target.name] : e.target.value })
        // can put this just for seeing in the console there on the browser.
        // console.log("Current form state:", { ...paymentform, [e.target.name]: e.target.value })
    }

    // step346: now we make a getData function to get data of the payments done to display on the webpage there & lets make it async as we want to use "await" in it.
    const getData = async () =>{

        // step348: lets create this fetchUser in the useractions file now in the next steps there.

        // step362: so "u" will now hold an object with the matched document data in it from the database.
        let u = await fetchUser(username)

        // step363: this will now re-render the UI everytime the "u" user object changes ; so currentUser state is now the current user's data object now.
        setcurrentUser(u) 
        // step359: now we use the fetchPayments function and pass the username into it from here.
        let dbpayments = await fetchPayments(username)

        // step364: now we had dbpayments as the array of payments that was sorted based on amount in decreasing order in the useractions.js ka function there.

        // step365: so we update the dbPayments array to it everytime a payment is done and since the state changes UI keeps re-rendering and new updated payments list will be used to show the users who have paid there on the website there.
        setPayments(dbpayments)
        // console.log(u , dbpayments)

        // step516: now we use the same function created in useractions.js in the previous steps here : to fetch all the paymenst done for that username here below.
        let count = await fetchAllPaymentsCount(username)

        // step517: and then after getting all the payments from the database under that username from the function above ; we set that count value to the state we made in the previous steps here below.
        setpaymentCount(count)

        // step524: same reason as the above steps 516,517 : we do for total sum too here below now-
        let total = await fetchTotalAmount(username)
        setTotalAmount(total)
    }

// step288: we will now make a function to replace the script we commneted out in the previous step there.

// step301: make it async function to use await inside this function below.
const pay = async (amount) =>{

    // step289: now we copy-paste the var options from the documentation there and will modify things in it too there below.

    // step300: lets get the order id using the initiate function impoerted in the next step above.

    // step302: now here we passed the parameters that was needed there in the "initiate" function there.

    // step303: "session?.user.name" is equivalent to : "session && session.user && session.user.name" : If session or session.user is undefined or null, it won’t throw an error — it will just return undefined. So, we have put this here so that it safely gets the name of the logged-in user, if available.

    // step310: later error was coming so we remove session?.user.name below and put username instead there below ; so that the username that came from the dynamic URL is passed here like "ben0912gorge" passed here below.
    // let a = await initiate(amount , session?.user.name , paymentform)
    let a = await initiate(amount , username , paymentform)

    // step304: this now can be used to access the orderId from the "x" object we had returned from the "initiate" function there.
    let orderId = a.id;

// step316: we now can click on the pay buttons below to pay 10 50 100 written ther eusing razor pay , but for that you need to enter a dummy card number fom internet OR in upi id type : "test@razorpay"

// step317: we can see the transactions on razorpay dashboard website there.

// step318: now we will come to "http://localhost:3000/undefined/api/razorpay" and will show an error as we haven't specified yet to redirect back to which page there after payment.

// step319: its because we have not defined the "callback url defined below in step294 below there."

// step320: so lets make it and see the next steps there in razorpay's route.js file there.

    var options = {

        // step311: we saw error in authentication because to use the environment variables in our client side components like this : we need to put "NEXT_PUBLIC" before KEY_ID ; however leave it as KEY_ID only in the useraction.js file as it was server component not client like this one as we have used "use client" in this file here.

        // step312: we now edit also in env file , so see next step there now.

        // step420: we now replace below line also to get the razorpayid from the currentuser we made as it has key and secret too , that we can see if we do console.log(currentUser) just to check : REMOVE IT LATER ELSE IT WILL SHOW THE KEY AND SECRET ON THE BROWSER AND THEN ANYONE WILL BE ABLE TO SEE IT THEN THERE.

        // step421: so we commented the below line and use the currentUser object for it now instead here below.

        // "key": process.env.NEXT_PUBLIC_KEY_ID, // step290: we access the KEY ID from env folder here now.
        "key" : currentUser.razorpayid,

        "amount": amount, // step291: access the amount paid from the parameter ; and we will ensure its passed as string here as the "50000" initially here on documentation was in paise and in string i.e. " " too there.
        "currency": "INR",
        "name": "Get Me A Juice", //step292: your business name
        "description": "Text Transcation",
        "image": "https://example.com/your_logo",
        "order_id": orderId, // step293: pass the order id from the parameter passed in the function above here.

        // step294: enter the route you want to be the callback_url here : see the env folder for next step and then come back here again.
        "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,

        // step296: rest things lets keep as it is here from the documentation

        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    }

    // step297: now we paste the last block of code from the documentation too below now.
    var rzp1 = new Razorpay(options);
    rzp1.open();
}

  return (
      // step275: use react fragment below so that the code to copied next from documentation having multiple scripts elements in it : and all in it can be returned in a single component using this here now below.
      <>

    {/* step427: we now use React toast : install it using "npm i --save react-toastify" and put the below toast container from its documentation website below. */}
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
        theme="dark"

        // step429: import BOUNCE IN THE TOP LINES OF IMPORT THERE ABOVE TOO in order to add this line below copied from the documentation as it needs to import Bounce first and then use it below here.
        transition={Bounce}
    />

    {/* step276: copy the code from the razorpay documentation for the client side given there , here below & cover it it {` `} as its a javascript in JSX format here below because : JSX doesn’t allow raw JavaScript inside <Script> tags directly.*/}
    <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

    {/* step287: We now comment out the code below as we will create our own version of it now here in the next steps here. */}

        {/*<Script>
    {`
      var options = {
          "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
          "amount": "50000", // Amount is in currency subunits. 
          "currency": "INR",
          "name": "Acme Corp", // your business name
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": "order_9A33XWu170gUtm", // This is a sample Order ID. Pass the \`id\` obtained in the response of Step 1
          "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
          "prefill": { // We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
              "name": "Gaurav Kumar", // your customer's name
              "email": "gaurav.kumar@example.com",
              "contact": "+919876543210" // Provide the customer's phone number for better conversion rates 
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
      };

      // step277: create Razorpay instance
      var rzp1 = new Razorpay(options);

      // step278: open Razorpay checkout when button clicked
      document.getElementById('rzp-button1').onclick = function(e){
          rzp1.open();
          e.preventDefault();
      }
    `}
  </Script> */}

{/* step280: paste the code from [username] now here below. */}

{/* step281: see the next steps in [username] folder there now*/}

    <div className='cover w-full bg-red-50 relative'>

{/* step417: now lets bring the profile picture and coverpicture dynamically by whatever we enter there in the dashboard ; as its getting saved on clciking save and also being added to the database. */}

{/* step418: so lets instead of "cover.gif" and "profile.png" ; lets use the currenUser object that has all the data of the currentUser which we can see by doing : console.log(currentUser) > so we'll use it now for putting the profile picture and cover page here below. */}
        {/* <img className="object-cover w-full h-[350px]" src="/cover.gif" alt="" /> */}

        {/* step547: lets now give the height we have given only on larger screens , else we keep it h-48 i.e. some smaller height only here below. */}
        <img className="object-cover w-full h-48 md:h-[350px]" src={currentUser.coverpic} alt="" />
        
        {/*
        <div className='absolute -bottom-20 left-[45%] size-32 overflow-hidden'>
        
        {/* step419: similarly write the url of image in the dashboard and save it and use it dynamically here below. */}

            {/* <img className="rounded-full border-purple-600 p-[5px] bg-black shadow-[0_0_20px_4px_rgba(168,85,247,0.6)]" height={150} width={150} src="/profile.png" alt="" /> 
            <img className="rounded-full border-purple-600 p-[5px] bg-black shadow-[0_0_20px_4px_rgba(168,85,247,0.6)] object-cover size-32" height={128} width={128} src={currentUser.profilepic} alt="" />
        </div>
        */}

        {/* WE COMMENTED THE ABOVE ONE LATER AS WAS NOT LOOKING GOOD AND RATHER GAVE CHATGPT TO GIVE BTTER OF THIS BY MAKING THE DIV AS ROUNDED AND GIVING SHADOW TO CONTAINER NOW AND NOT PROFILE PICTURE AS IT THEN WAS LOOKING BETTER ; SO WE COMMNTED TH EABOVE CODE AND PASTED THE CHATGPT CODE HERE BELOW NOW. */}


        {/* step548: lets now give it some other positioning of "left" in smaller devices to meka it be centred by hit and trial in smaller devices too and in larger devices we already had made it , so now just make that md and set the "left" position for the smaller sevices now here below by hit and trial here. */}
        <div className="absolute -bottom-20 left-[34%] md:left-[45%] w-32 h-32 rounded-full overflow-hidden shadow-[0_0_30px_10px_rgba(168,85,247,0.6)] flex items-center justify-center">
            <img 
                className="rounded-full border-purple-600 p-[5px] bg-black object-cover w-full h-full" 
                src={currentUser.profilepic} 
                alt="Profile" 
            />
        </div>


    </div>

    <div className='info flex justify-center items-center my-25 flex-col gap-1'>
        <div className='font-bold text-lg'>

            {/* step286: we now passed the username from params here , so access it now using username directly instead of params.username here below*/}
            {/* @{params.username} */}

            @{username}
        </div>
        <div className='text-slate-400'>
            {/* Selling Juices to Raise Funds */}

            {/* step455: now we will display the following below the profile picture there.  */}
            Buy "{username}" a juice🧃 and support here!
        </div>
        <div className='text-slate-400'>
            {/* 979 members • 82 posts • $14679/release */}

            {/* step456: and now display the number of payments made and the total sum of payments recievd till now too here below. */}

            {/* step457: for the number of payments made we simply show the length of payments array containing all the done payments here below. */}

            {/* step458: then for sum of all paymnets we use the "reduce" method here below.
                ; so , when we write : "payments.reduce((a, b) => a + b.amount, 0)" ; it means -

                    "a" is the total summed value so far ; and let "0" passed after ',' be the initial value of that "a" here below.

                    so everytime it does : new "a" = old "a" + payments array ka amount item > and everytime it takes the amount from next item of paymenst array and continues so on... to sum the amount from all the items in the payments array there so far.

                    So, "b" is the current element of the array & everytime keeps moving to the next item of the array ; so that the amount of all the payments items can be summed in displayed thus there.
            */}

            {/* step459: see next steps in "useractions.js" file now there. */}
            {/* {Payments.length} payments recieved so far • ₹{Payments.reduce((a, b) => a + b.amount, 0)}💰 collected! */}

            {/* step518: now we replace the above line by below line as payments length has been set to 10 to show top 10 supporters , so will always show 10 only there ; thats why we use the state we created earlier to show the number of payments done to that user till noe thus here below there. */}

            {/* step519: see the next steps now in useractions.js file there now. */}
            {/* {paymentCount} payments recieved so far • ₹{Payments.reduce((a, b) => a + b.amount, 0)}💰 collected! */}

            {/* step525: same as replaced above ; by same logic also replace the total sum of payments stored from database in the state named "totalAmount" now , here below. */}
            {paymentCount} payments recieved so far • ₹{totalAmount}💰 collected!

        </div>

{/* step543: lets add flex xol in smaller devices for this and keep it row flex only for the smaller devices here below here. */}
        <div className='payment flex gap-3 w-[80%] mt-10 md:flex-row flex-col'>
            {/* step544: also lets give it a full width in smaller devices here below and keep the w-1/2 given below only for larger devices i.e. "md" here below. */}
            <div className="supporters md:w-1/2 bg-slate-900 rounded-lg p-10 w-full">
                <h2 className='text-2xl font-bold my-5'>Top 10 Supporters</h2>
                <ul className='mx-5'>
                    {/* step416: now if payments array initially when has no payments ; we'll display there the message below. */}
                    {Payments.length == 0 && <li>No payments yet</li>}

                    {/* step368: we now use the map function below to make the messages to be displayed : map function loops through each element in the array of objects that was Payments which we created above earlier : containing name , amount , message , to_user , etc. things there in it. */}

                    {/* step369: then we pass 2 parameters of map which is the iterator "p" and index "i" ; so "p" will be each payment object in the array of objects "Payments" that we made like : { name: "Suraj", amount: 30, message: "I support you bro ❤️" } and the "i" will be 0,1,2... the index of each of those object in that array.*/}
                    {Payments.map((p,i)=> (

                    // step370: we now by rule know that we need to pass key inside each element of map ; so we pass the index "i" as the key as we know it will be unique for every item map renders one by one.
                    <li key={i} className='my-4 flex gap-2 items-center'>
                        <img src="avatar.gif" alt="" width={33} />

                        {/* step371: then we commented the manual message we wrote earlier there and sisplayed and now use the items/fields inside the object "p" > { name: "Suraj", amount: 30, message: "I support you bro ❤️" } to show the things there in the Suppporters section there : and that too gets displayed in descending order based on amount as earlier we had already sorted the Payments array of object in descending order , we saw earlier in step356 i the useractions.js file there. */}

                        {/* step372: so we display the items of "p" object here below like "p.name" , "p.amount" , etc, : here below. */}

                        {/* step373: see the useractions.js page for a small important correction there for the messages being displayed. */}

                        <span>{p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message "{p.message}"</span>
                        {/* <span>Suraj donated <span className='font-bold'>₹30</span> with a message "I support you bro ❤️"</span> */}
                    </li>
                    ))}
                </ul>
            </div>
            
            {/* step545: lets give the same width conditions here too below. */}
            <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg p-10">
                <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                <div className="flex gap-2 flex-col">

                    {/* step307: now lets make the input tags to have the value equal to the form's value there ; and also lets call a handleForm on changing / typing in these input tags here below. */}
                    <input onChange={handleChange} name="name" value={paymentform.name} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder="Enter your name" />
                    <input onChange={handleChange} name="message" value={paymentform.message} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder="Enter a message" />
                    <input onChange={handleChange} name="amount" value={paymentform.amount} type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Amount" />

                    {/* step375: now lets make the Pay button to be functional below. */}

                    {/* step376: so we make it to call the pay function with the amount user entered in the form it fills in the input tags there. */}

                    {/* step377: so lets make the string that we ususally enter in form's input tags and convert it to an integer first so that we can multiply by 100 (as we can't multiply 100 to a string obviously , no sense) : to convert to rupees as by default razorpay takes the payment passed as paise and not rupees there. */}

                    {/* step378: Always in these case we use arrow function because : using an arrow function ensures the function is not executed immediately; it only runs when the click happens. */}

                    {/* step379: see the next steps in useraction.js file now. */}

                    <button 
                    onClick={()=> pay(Number.parseInt(paymentform.amount)*100)} 
                    type="button" 

                    // step422: lets make the button disabled until name and message have been filled in the input tag's form above there.
                    // disabled = {paymentform.name.length === 0 || paymentform.message.length === 0}

                    // step423:
                    /*
                        // Using optional chaining (?.) instead of dot (.) below for safety:
                        // 1. paymentform?.name?.length checks if paymentform exists first.
                        // 2. If paymentform is null or undefined, it won't throw an error.
                        // 3. Without ?. if paymentform is null, paymentform.name would crash with:
                        //      "Cannot read property 'name' of null"
                        // 4. So ?. makes it safe to read nested properties even when data is not yet loaded.
                    */

                    // step424: we also make it disbaled till amount entered is > 0 to prevent entering -ve or 0 amount and paying : we used Number which converts to a number type because : paymentform.amount comes from an input field, which is always a string, e.g., "50" ; so must be converted to Number first to do comparisons like <= with another number 0 below.

                    // isNaN was added later : to disable the button even when the user types an invalid number or letters in the amount input tag there.
                    disabled = {paymentform?.name?.length === 0 || paymentform?.message?.length === 0 || Number(paymentform?.amount) <= 0 || isNaN(paymentform?.amount)}

                    // step425: now lets add classes for button to be displayed when its disabled : we have added a lighter color when its disabled & also made cursor not allowed to make the button not clickable if cursor brought over it : GETS ENABLED ONLY WHEN : BOTH NAME AND MESSAGE HAS BEEN TYPED THERE.
                    className="cursor-pointer text-white bg-gradient-to-br from-purple-800 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-gradient-to-br disabled:from-purple-400 disabled:to-blue-400 disabled:text-gray-100 disabled:cursor-not-allowed">
                        Pay
                    </button>
                </div>

                {/* step546: let add flex column in smaller devices else default flex ro win larger devices i.e "md" here. */}

                <div className='flex gap-2 mt-5 md:flex-row flex-col'>

                    {/* step298: we now make the $ to ₹ by pressing : CTRL + SHIFT + $ sybmol i.e. CTRL + SHIFT +4 there on the keyboard here. */}

                    {/* step299: we now make the buttons to call the function pay with the amount and order id parameters passed in it below ; make it arrow function so that it works only when clicked on the buttons and not as soon as the webiste renders : REMEMBER THIS HERE BELOW. */}

                    {/* keep in paise as razorpay takes amount in paise by rule : so for 10 put 1000 and so on here below. */}
                    <button 

                    // step426: we now make the below buttons also disabled with the css in them too to show a lighter color when disbaled with cursor not allowed when trying to hover and click on them , UNTIL NAME AND MESSAGE HAS BEEN WRITTEN THERE IN THE FORM ABOVE , TO PRVEENT ANY ERROR TO OCCUR THERE.

                    // isNaN was added later to all these button's disabled option below too : to disable the button even when the user types an invalid number or letters in the amount input tag there.
                    disabled = {paymentform?.name?.length === 0 || paymentform?.message?.length === 0 || isNaN(paymentform?.amount)}

                    className='bg-slate-800 p-3 rounded-lg cursor-pointer disabled:bg-slate-500 disabled:cursor-not-allowed text-white' onClick={() => {pay(1000)}} >
                        Pay ₹10
                    </button>
                    <button
                    disabled = {paymentform?.name?.length === 0 || paymentform?.message?.length === 0 || isNaN(paymentform?.amount)}
                    className='bg-slate-800 p-3 rounded-lg cursor-pointer disabled:bg-slate-500 disabled:cursor-not-allowed text-white' onClick={() => {pay(5000)}} >
                        Pay ₹50
                    </button>
                    <button
                    disabled = {paymentform?.name?.length === 0 || paymentform?.message?.length === 0 || isNaN(paymentform?.amount)} 
                    className='bg-slate-800 p-3 rounded-lg cursor-pointer disabled:bg-slate-500 disabled:cursor-not-allowed text-white' onClick={() => {pay(10000)}} >
                        Pay ₹100
                    </button>
                </div>
            </div>
        </div>
    </div>


    </>
  )
}

export default PaymentPage

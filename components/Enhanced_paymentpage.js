"use client"
import React , {useEffect, useState} from 'react'
import Script from 'next/script'
import { fetchUser, fetchPayments, initiate, fetchAllPaymentsCount , fetchTotalAmount} from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const PaymentPage = ({username}) => {
    const [paymentform, setpaymentform] = useState({name:"" , message:"" , amount: ""})
    const [currentUser, setcurrentUser] = useState({})
    const [Payments, setPayments] = useState([])
    const [paymentCount, setpaymentCount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() =>{
        getData()
    }, [])

    useEffect(()=>{
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
                transition: Bounce,
            });
            router.push(`/${username}`)
        }
    }, [searchParams])

    const handleChange = (e) =>{
        setpaymentform({ ...paymentform , [e.target.name] : e.target.value })
    }

    const getData = async () =>{
        let u = await fetchUser(username)
        setcurrentUser(u) 
        let dbpayments = await fetchPayments(username)
        setPayments(dbpayments)
        let count = await fetchAllPaymentsCount(username)
        setpaymentCount(count)
        let total = await fetchTotalAmount(username)
        setTotalAmount(total)
    }

    const pay = async (amount) =>{
        let a = await initiate(amount , username , paymentform)
        let orderId = a.id;

        var options = {
            "key" : currentUser.razorpayid,
            "amount": amount,
            "currency": "INR",
            "name": "Get Me A Juice",
            "description": "Text Transcation",
            "image": "https://example.com/your_logo",
            "order_id": orderId,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

  return (
    <>
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
        transition={Bounce}
    />

    <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

    {/* ---------- COVER IMAGE + PROFILE PIC ---------- */}
    <div className='cover w-full bg-red-50 relative'>
        <img 
            // 👇 RESPONSIVENESS: 
            // "h-48" for mobile (small height)
            // "sm:h-64" for small screens and up
            // "md:h-[350px]" for medium screens and above
            // -> ensures the cover scales properly across devices
            className="object-cover w-full h-48 sm:h-64 md:h-[350px]" 
            src={currentUser.coverpic || '/cover-placeholder.jpg'} 
            alt="Cover" 
        />
        
        <div 
            // 👇 RESPONSIVENESS: 
            // "w-28 h-28" for small screens (smaller profile pic)
            // "sm:w-32 sm:h-32" for small screens and above (slightly bigger)
            // -> keeps profile pic proportional and centered
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-[0_0_20px_5px_rgba(168,85,247,0.6)] flex items-center justify-center bg-white">
            <img 
                className="rounded-full border-2 border-purple-600 p-1 object-cover w-full h-full" 
                src={currentUser.profilepic || '/profile-placeholder.png'} 
                alt="Profile" 
            />
        </div>
    </div>

    {/* ---------- USER INFO ---------- */}
    <div 
        // 👇 RESPONSIVENESS:
        // "my-20" spacing, "px-4" for padding on mobile
        // text-center ensures centered layout across all screens
        className='info flex justify-center items-center my-20 flex-col gap-1 px-4 text-center'>
        <div 
            // 👇 RESPONSIVENESS: 
            // "text-lg" for small screens
            // "md:text-xl" for medium screens and above
            className='font-bold text-lg md:text-xl'>
            @{username}
        </div>
        <div 
            // 👇 RESPONSIVENESS:
            // "text-sm" for small screens
            // "md:text-base" for medium+ screens (larger readable text)
            className='text-slate-400 text-sm md:text-base'>
            Buy &quot;{username}&quot; a juice🧃 and support here!
        </div>
        <div className='text-slate-400 text-sm md:text-base'>
            {paymentCount} payments received • ₹{totalAmount} collected! 💰
        </div>
    </div>

    {/* ---------- PAYMENT SECTION (LEFT: supporters, RIGHT: payment form) ---------- */}
    <div 
        // 👇 RESPONSIVENESS:
        // flex-col on mobile (stacked supporters & payment form)
        // md:flex-row on medium+ screens (side by side layout)
        // px increases with screen size for better spacing:
        //   - px-4 (mobile), sm:px-6, md:px-8, lg:px-10
        // max-w-6xl -> keeps content centered & not too wide
        className='payment flex flex-col md:flex-row gap-5 w-full px-4 sm:px-6 md:px-8 lg:px-10 mt-8 mb-10 max-w-6xl mx-auto'>
        
        {/* ---------- SUPPORTERS LIST ---------- */}
        <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg p-6 sm:p-8">
            <h2 
                // 👇 RESPONSIVENESS:
                // "text-xl" on small
                // "sm:text-2xl" on larger screens
                className='text-xl sm:text-2xl font-bold mb-4'>
                Top Supporters
            </h2>
            <ul className='space-y-3'>
                {Payments.length == 0 && (
                    <li className='text-center py-4 text-gray-400'>No payments yet. Be the first supporter!</li>
                )}

                {Payments.map((p,i)=> (
                <li key={i} className='flex gap-3 items-start'>
                    <div className='flex-shrink-0'>
                        {/* 👇 RESPONSIVENESS: avatar scales up on sm+ */}
                        <img src="/avatar.gif" alt="" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                    </div>
                    <div 
                        // 👇 RESPONSIVENESS:
                        // "text-sm" for small
                        // "sm:text-base" for larger screens
                        className='text-sm sm:text-base'>
                        <span className='font-medium'>{p.name}</span> donated <span className='font-bold'>₹{p.amount}</span>
                        {p.message && <div className='text-gray-400 mt-1'>&quot;{p.message}&quot;</div>}
                    </div>
                </li>
                ))}
            </ul>
        </div>
        
        {/* ---------- MAKE PAYMENT FORM ---------- */}
        <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg p-6 sm:p-8">
            <h2 className='text-xl sm:text-2xl font-bold mb-4'>Make a Payment</h2>
            <div className="space-y-4">
                <input 
                    onChange={handleChange} 
                    name="name" 
                    value={paymentform.name} 
                    type="text" 
                    className='w-full p-3 rounded-lg bg-slate-800 focus:ring-2 focus:ring-purple-500 focus:outline-none' 
                    placeholder="Your name" 
                />
                <input 
                    onChange={handleChange} 
                    name="message" 
                    value={paymentform.message} 
                    type="text" 
                    className='w-full p-3 rounded-lg bg-slate-800 focus:ring-2 focus:ring-purple-500 focus:outline-none' 
                    placeholder="Your message (optional)" 
                />
                <input 
                    onChange={handleChange} 
                    name="amount" 
                    value={paymentform.amount} 
                    type="number" 
                    className="w-full p-3 rounded-lg bg-slate-800 focus:ring-2 focus:ring-purple-500 focus:outline-none" 
                    placeholder="Amount in ₹" 
                    min="1"
                />

                <button 
                    onClick={()=> pay(Number.parseInt(paymentform.amount)*100)} 
                    type="button" 
                    disabled = {paymentform?.name?.length === 0 || Number(paymentform?.amount) <= 0 || isNaN(paymentform?.amount)}
                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    Pay ₹{paymentform.amount || '0'}
                </button>
            </div>

            {/* ---------- QUICK PAYMENT BUTTONS ---------- */}
            <div className='mt-6'>
                <h3 className='text-sm font-medium text-gray-400 mb-3'>Quick payment options:</h3>
                <div 
                    // 👇 RESPONSIVENESS:
                    // grid layout always
                    // "grid-cols-3" keeps buttons evenly spread
                    // spacing handled by "gap-2"
                    className='grid grid-cols-3 gap-2'>
                    
                    <button 
                        disabled = {paymentform?.name?.length === 0 || isNaN(paymentform?.amount)}
                        // 👇 RESPONSIVENESS:
                        // padding increases on sm+ for better button sizing
                        className='py-2 px-3 sm:py-3 sm:px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed' 
                        onClick={() => {pay(1000)}}
                    >
                        ₹10
                    </button>
                    <button
                        disabled = {paymentform?.name?.length === 0 || isNaN(paymentform?.amount)}
                        className='py-2 px-3 sm:py-3 sm:px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                        onClick={() => {pay(5000)}}
                    >
                        ₹50
                    </button>
                    <button
                        disabled = {paymentform?.name?.length === 0 || isNaN(paymentform?.amount)} 
                        className='py-2 px-3 sm:py-3 sm:px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                        onClick={() => {pay(10000)}}
                    >
                        ₹100
                    </button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default PaymentPage

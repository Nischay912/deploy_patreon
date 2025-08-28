// step251: lets make this actions folder as a server component and everything will noe run on server in this file ; not on the browser here.
"use server"

// step252: now we go on the google > razorpay integration > go on the website there : https://razorpay.com/integrations/ ; then we clcik on docs of JavaScript there > integration steps > we will follow them now here .

// step253: How razorpay works > we generate an order on razorpay's server and recieve an order id > then we use that order id to make people to pay using it.

// step254: "npm i razorpay" > do in the terminal

// step255: now we import the razorpay package to be used here.
import Razorpay from "razorpay"

// step256: lets now import the User and Payment model that we had created earlier there.
import User from "@/models/User"
import Payment from "@/models/Payment"

// step257: lets now import the database file we created ; to connect to Db using it here.
import connectDb from "@/db/connectDb"

// step258: lets create a function to help us initiate the orders : which will be async as we have to use await inside it too.

// step259: we pass parameters liek the "amount" user will pay ; then it will pay to whom ; then other things too if needed like paymentform ,etc. 
export const initiate = async(amount , to_username , paymentform) =>{

    // step260: connect to the database using the function we had imported , to fetch users and save their payment info.
    await connectDb()

    // step261: now we copy the code given on razorpay here below and create a razorpay instance that we can use to call razorpay APIs later.

    // step262: we pass the id and secret of our test mode using process.env. : because that is how it searches in the env folder for environment variables named what we wrote here below.

    // step453: now we do the same we did in the last few steps in the razorpay folder's page.js ther e: to fetch the secret from database and use , instead of using it from env file ; just a differneec that we used to_username now as its the same as to_user but was renamed to_username here when passed into the function as seen in the parameters list of th efunction there above here ; however they means the same its just taht to_user of Payments collection has been passed as to_username parameter in the function above used thus here below.

    // step454: after this see the next steps in the "PaymentPage.js" file now there.
    let user = await User.findOne({username : to_username})
    const secret = user.razorpaysecret

    // var instance = new Razorpay({key_id : process.env.KEY_ID , key_secret : process.env.KEY_SECRET })

    // step454: so using the fetched "secret" from database now instead of that from the env folder now here below.

    // step455: and we also did for the id too below to fetch from database instead of using the env folder there too , here below ; however we leave for other places where we used NEXT_PUBLIC_ID as they are meant to be used on browsere thats why NEXT_PUBLIC was used with them there ; but since its meant to be for browser there is no need to fetch from databse for them ; leave them as it is using them from the env folder environment variables only there now ; but only for below cases like done below :  fetch the "id" now from the database instead of using the env folder here/there now , here below.
    var instance = new Razorpay({key_id : user.razorpayid , key_secret : secret})

    // step263: we now create a new razorpay order on razorpay server , with the following key value pairs as mentioned below it here.
    // instance.orders.create({
    //     amount : 50000, //amount here is in paise always so 50000 means 50000 pasie i.e. 500 rupees here.
    //     currency : "INR",
    //     reciept : "receipt#1",
    //     notes:{
    //         key1: "value3",
    //         key2: "value2"
    //     }
        
    // })

    // step264: comment out the above code and now use the parameters we passed in the function like "amount" to create the properties to be there.
    let options = {
        amount : Number.parseInt(amount), //convert to integer as by default everything comes as string mostly.
        currency: "INR",
    }

    // step265: now we create the razorpay order on the razorpay server using the options we created above and await for the order to be created.

    // step266: so now "x" stores the razorpay order object .

    // step267: so now razorpay will create an order object by itself with these in it now -
    /*
        {
        "id": "order_ABC123",  // this is Razorpay's unique order id
        "entity": "order",
        "amount": 50000,
        "currency": "INR",
        "status": "created",
        "created_at": 1691977600
        }
    */
    let x = await instance.orders.create(options)

    // step268: now lets create a payment object to show a pending payment in the database.

    // step269: we had created Payment.js model > where we had made the collection name as "Payment" > mongoose automatically pluralizes it when collection is made > so taht had made a "payments" collection in the database.

    // step270: so now below we use .create to create in a new document in that collection "payments" and await for the documnet to get saved there.
    await Payment.create({

        // step271: then we fill the fields we had created in the Payment.js model with values from razorpay object "x" and other parameters like "amount" and all passed in the function here.
        oid : x.id,

        //WE LATER DID "/100" BELOW TO MAKE IT SEND MONEY IN RUPEES AND NOT PAISE , LIKE RAZORPAY USUALLY SENDS IN PAISE , SO /100 TO CONVERT TO RUPEE AND THEN SEND IN DATABASE AND THUS WILL BE DISPLAYED CORRECTLY TOO THERE.
        amount : amount / 100,
        // we set to "to_user" as we had in Payment.js also "to_user" there too.
        to_user : to_username,
        name : paymentform.name,
        message : paymentform.message
    })

    // step272: then after saving the object to MongoDB , we return the razorpay order object named "x" to whoever called this function i.e to the caller there.
    return x

    // step273: now see the next steps in PaymentPage.js file there.
}

// step349: lets create the fetchuser function to be exported and used in the PaymentPage.js file there.

// step350: username is the parameter we passed from the PaymentPage file here 
export const fetchUser = async(username) => {

    // step351: connect to MongoDB
    await connectDb()

    // step352: we now find the document in the "User" collection in the database which has the "username" field matching the username we passed into the function.
    let u = await User.findOne({username : username})

    if(!u){ return null } //can be done to avoid errors as then running the functions below is meaningless so return null and exit from here only.

    // step353: we then convert the Mongoose document into Javascript object using the below code
    let user = u.toObject({flattenObjectIds : true})
    return user
}

// stp510: we had set the payments page to show only the top 10 supporters there : so it showed top 10 payments there , but doing this makes the totla number of payments done also to be shown 10 there now as it was being shown using the payments.length there ; so instead , we now make another function to fethc the count of the number of payments done so far below.
export const fetchAllPaymentsCount = async(username) => {
    await connectDb()
    // step511: count the number of documents in payments collection having the username equal to the logged in user having its username from session in the variable username ; and also done true will be counted as valid payments there now.
    let count = await Payment.countDocuments({to_user: username, done: true})
    // step512: finally return the payments done as count from this function now.

    // step513: see the next steps in PaymentPage.js file now there.
    return count
}

// step520: same as done for fetching all count , we now fetch all sum of money and not just top 10 supporters money sum there , here below.

// step521: the necessary things to see for below are -
/*

Payment.aggregate([...]) → runs an aggregation pipeline in MongoDB.
await → wait until MongoDB finishes aggregation.
result → will be an array of documents produced by the aggregation.

Inside the aggregation pipeline:
{ $match: { to_user: username, done: true } }

$match → filters documents (like WHERE in SQL).

Conditions:
to_user: username → only payments where the to_user field equals the given username.
done: true → only completed payments.

After this step, only that user’s completed payments remain in the pipeline.

{ $group: { _id: null, total: { $sum: "$amount" } } }

$group → groups documents and performs calculations (like SQL GROUP BY).
_id: null → means “don’t group by any field, just group all matching documents together.”
total: { $sum: "$amount" } → creates a new field total that is the sum of the amount field across all documents.

Example: If amounts = [100, 200, 300], then total = 600.

return result[0]?.totalAmount || 0

After aggregation, result is an array. Example:
[ { _id: null, total: 600 } ]

result[0] → the first (and only) document in the result.
?.total → optional chaining → if result[0] exists, get its total.
|| 0 → if nothing exists (no payments found), return 0 instead of undefined.
*/

// step522: see the next steps in paymentpage.js file there now.
export const fetchTotalAmount = async (username) => {
  await connectDb();
  
  // Use Mongoose's lean() + manual aggregation
  const result = await Payment.aggregate([
    { $match: { to_user: username, done: true } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]).exec(); // .exec() ensures a proper Promise ; .exec() ensures a proper Promise ; which was coming as error in console so done this here.

  // Force plain JavaScript object to be returned now ; Mongoose sometimes returns objects with extra internal properties (getters, metadata). By doing JSON.parse(JSON.stringify(...)), we now strip out all Mongoose magic and keep a clean object
  const plainResult = JSON.parse(JSON.stringify(result));

  // Return 0 if no data, otherwise return the number directly
  return plainResult[0]?.total || 0;
};



// step354: then we make a fucntion to fetch and give us payments in decreasing order as we want to show the largets donators on top on the webpage there ; and it can be exported and used in other files now as we have used "export" below.
export const fetchPayments = async(username) =>{
    // step355: connect to database
    await connectDb()

    // step356: now in the Payment collection there : we have "to_user" containing the username ; so we find the matching documents there and sort based on amount in decreasing order using sort(amount : -1) i.e. highest amount first ; and finally use lean to convert the mongoose documents into plain Javascript objects.

    // step374: we must also write ", done: true" below , so that it filters and finds the payments that are done:true too ; and not show the false payments or invalid payments that wer emarked : done as false there.

    
    // let p = await Payment.find({to_user : username, done: true}).sort({amount : -1}).lean()

    // step498: now we put a limit to show only that much payments on the webpage like , if we want to show only the top 10 payments then we can show them using the limit(10) below ; which will show the top 10 supporters in the list there only.

    // step499: see the next steps now in login folder's page.js there now.

    let p = await Payment.find({to_user : username, done: true}).sort({amount : -1}).limit(10).lean()

    // step357: Sends the final result (p) back to wherever fetchPayments() was called.

    // NOTE : WE DID THIS BELOW INSTEAD OF JUST "return p" AS A WARNING WAS COMING CONTINUOUSLY IN THE CONSOLE ; SO WE DID THIS BELOW BECAUSE : .lean() converts Mongoose documents into plain JS objects, but special fields like _id (ObjectId) and createdAt/updatedAt (Date) are still special types, not plain JSON. JSON.parse(JSON.stringify(...)) converts them into plain strings/JSON-safe values ; so they can safely be passed to Client Components.
    return JSON.parse(JSON.stringify(p));

    // step358: see the next steps again back in PaymentPage.js file there now.
}

// step380: now lets make a function to update the user's data , to change username and all we want.

// step381: make it async as we will be using "await" inside it here.

// step382: we will be taking input as "data" i.e. the new form data submitted ; and also the previous oldusername of the user , to check if the username is being changed or not.
export const updateProfile = async (data , oldusername) =>{

    // step383: connect to database first as usual.
    await connectDb()

    // step384: the below code will convert the data / form's data entered into a plain JavaScript object here below.
    let newData = Object.fromEntries(data)

    // step385: we now check if the username was changed by the user or not.
    if(oldusername !== newData.username){

        // step386: then we look for the User with the oldusername in the User collection of the  database & then : and since findOne is asynchronous , we use "await" here too ; so we here ensured that we find the document in User collection which has username equal to the newdata form's username OR not ; and if its already ther ein database : "u" will not be null ; so the if condition will run and show the error message and return without proceeding to update the data in next lines after after it there below.
        let u = await User.findOne({username : newData.username})
        if(u){

            // step387: if the document with the new username already exists in database "u" will not be null ; so then throw an error below , and return ; so that the function ends and not proceeds further below in the code then here.
            return {error : "Username alreasy exits"}
        }
        // step460: we now here want to allow users to change their usernames if they want , and it to be reflected on the about page and everywhere too ; i.e. we want to allow to change the database too ; so that all the payments be shown there even with the new updated username there.

        // step461: we find the user by their unique unchangeable email & updates their document in the User collection with the new data i.e. the new username enetered by the user there.
        // await User.updateOne({email : newData.email} , newData)
        // await Payment.updateMany({to_user : oldusername} , {to_user : newData.username})

        // step462: but instead of all these hassle lets just disable the username changing option there itself ; so that the user can't change the username only ; so add "disabled" in the next step in Dashboar.js" file there.
    }
    
    // step388: else if the newUsername can be set ; then we update the user's record in the database , by seacrhing for the email with the "email" of the newData : and then updating that document we found matching the email , with the newdata here.

    // step389: so we are not allowing user to change the email here ; as even if user attempts to change email , it wont do as we above in step386 , updated the username only ; so we may add a condn to show message that email can't be changed OR let it be like this and update the document only here , by allowing the user to write their email and then find the doument in "User" collection with that email & update that data with the newData that has the newUsername now in it there.

    // "await" was used below because : await ensures the update completes before the function finishes and before it returns.

    // step390: see the next steps in Dashboard.js file now there.
    await User.updateOne({email : newData.email} , newData)
}
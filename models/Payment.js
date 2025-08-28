// step212: so this model will generate the enteries of payments in our database.

// step213: so we do same things as User model ; just change the schema below.
import mongoose from "mongoose";
const {Schema , model} = mongoose;

const PaymentSchema = new Schema({
    name : {type : String , required:true},
    to_user : {type : String , required:true}, //to tell that payment made to which user
    oid : {type:String , required : true}, //order id
    message : {type:String , required : true}, //message user sent
    amount : {type:Number , required : true}, //amount of money sent
    createdAt: {type: Date , default: Date.now},
    updatedAt: {type: Date , default: Date.now},
    done: {type:Boolean , default: false}, //to indicate if payment was successful or not ; keeping it default to false as if nothing done means not done payment must be some error so done status auto keep "false" in that case.
});

// step214: as done in User model here too need to put these now below.
// const Payment = model("Payment" , PaymentSchema)
// export default mongoose.model.User|| User;

// step215: see next steps in route.js file now.

// SAME AS DONE IN USER.JS FILE TOO HERE ALSO COMMENT THE ABOVE TWO LAST LINES OF CODE AND DO LIKE BELOW SYNTAX AS WE CANT PUT || FOR CHECKING IF IT EXISTS OR NOT IN THE RETURN STATEMENT ITSELF THERE.
const Payment = mongoose.models.Payment || model("Payment", PaymentSchema);
export default Payment
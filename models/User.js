// step206: we first import mongoose to be used here
import mongoose from "mongoose";

// THIS WAS DONE TO : extract only Schema and model from the mongoose object & now we can use "Schema" and "model" directly instead of writing mongoose.Schema or mongoose.model every time.
const {Schema , model} = mongoose;

const userSchema = new Schema({

    // step207: lets define the schemas for our database ; with required : true for mandatory fields & default value sets it to that avlue if nothing provided there.
    email : {type: String , required: true},
    name : {type: String},
    username : {type: String , required: true}, 
    profilepic : {type:String}, //will be a link so keep the type String
    coverpic:{type:String},

    // step411: we didn't have razorpay id and secret of the dashboard form here , thats why it was not pre-filling in dashboard to what we typed and saved earlier on reloading & thats why it was not saving earlier to database on mongoDB too : so lets put them in the schema first obviously to be added there now.

    // step412: see next steps in Dashboard.js file now there.
    razorpayid:{type:String},
    razorpaysecret:{type:String},

    createdAt: {type: Date , default: Date.now},
    updatedAt: {type: Date , default: Date.now},
});

// step208: we create a model now which is : a compiled version of the schema that gives you an interface to read, create, update, delete (CRUD) documents in the collection ; so : Schema → defines structure & Model → lets you use that structure to interact with MongoDB

// step209: "User" will be the collection name and we also pass the schema to be followed in it below i.e userSchema.
// const User = model("User" , userSchema)

// step210: we do this so that : if the model already exists and use it ; else create a new model "User" ; a compiled version of the schema that gives you an interface to read, create, update, delete (CRUD) documents in the collection as : Mongoose doesn’t allow creating the same model twice.
// export default mongoose.model.User|| User;

// step211: now lets create a Payment model in new file in the same folder and see next steps there.

// COMMENTED THE ABOVE TWO CODE LINES AND REPLACED HERE IN THIS WAY ELSE WAS GIVING ERROR AS WE NEED TO DEFINE USER THERE FIRST WITH CHECKING USING || BEFORE ONLY , AND NOT IN EXPORT LINE FOR THAT : CHECK IF MODEL ALREAYD EXISTS , ELSE WE CREATE IT.
const User = mongoose.models.User || model("User", userSchema);
export default User;
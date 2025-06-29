import mongoose from "mongoose";
const {Schema , model} = mongoose;

const UserSchema = new Schema ({
    email:{type:String,required:true},
    name:{type:String},
    username:{type:String ,required:true},
    profilepic:{type:String},
    coverpic:{type:String},
    createdAt:{type:String,required:true},
    updatedAt:{type:String,required:true},
})

const User = model("User" , UserSchema);
export default mongoose.models.User || User ;
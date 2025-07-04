import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  username: { type: String, required: true },
  profilepic: { type: String },
  coverpic: { type: String },
}, { timestamps: true }); // ✅ Auto-manages createdAt, updatedAt

const User = mongoose.models.User || model("User", UserSchema);
export default User;

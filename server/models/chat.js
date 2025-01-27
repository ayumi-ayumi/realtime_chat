import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    message: { type: String },
    username: { type: String, required: true },
    __createdtime__: { type: Number, required: true },
    room: { type: String}
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);
export default Message;
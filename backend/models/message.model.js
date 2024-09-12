import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      Type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      Type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      Type: String,
      required: true,
      default:[],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Message = mongoose.model('Message', messageSchema)

export default Message;
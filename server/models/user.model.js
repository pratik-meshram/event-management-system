import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "vendor", "user"],
      default: "user",
    },

    // Phone (only for user & vendor)
    phone: {
      type: String,
      required: function () {
        return this.role === "vendor" || this.role === "user";
      },
    },

    //  Vendor category
    category: {
      type: String,
      required: function () {
        return this.role === "vendor";
      },
      enum: ["Catering", "Florist", "Decoration", "Lighting"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
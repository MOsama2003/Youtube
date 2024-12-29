import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      index: true,
      required: true,
      lowerCase: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowerCase: true,
      trim: true,
      unique: true,
    },
    fullName: {
      type: String,
      index: true,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is mandatory"],
    },
    refreshToken: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt(this.password, 5);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.userName,
    },
    "ACCESSTOKEN",
    {
      expiresIn: "1d",
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
          _id: this._id,
        },
        "REFRESHTOKEN",
        {
          expiresIn: "10d",
        }
      );
};

const User = mongoose.model("User", userSchema);

export { User };

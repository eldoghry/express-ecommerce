import mongoose, { HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

export enum UserRole {
  user = "user",
  admin = "admin",
}

export enum UserStatus {
  active = "active",
  blocked = "blocked",
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}

interface IUserMethods {
  isPasswordMatched: (plainPassword: string) => Promise<boolean>;
}

// Declare the Schema of the Mongo model
export const userSchema = new mongoose.Schema<
  HydratedDocument<IUser, IUserMethods>
>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  status: {
    type: String,
    enum: UserStatus,
    default: UserStatus.active,
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.user,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (plainPassword: string) {
  return await bcrypt.compare(plainPassword, this.password);
};

// TODO: exclude password

//Export the model
export default mongoose.model("User", userSchema);

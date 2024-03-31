import { Request } from "express";
import { UserRole, UserStatus } from "../models/user.model";

interface IUser {
  id: string;
  role: UserRole;
  status: UserStatus;
}
interface IRequest extends Request {
  user?: IUser;
}

export { IRequest, IUser };

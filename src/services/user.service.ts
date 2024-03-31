import User, { IUser } from "../models/user.model";

const create = async (data: { [key: string]: any }) => {
  return User.create(data);
};

const findOne = async (filter: { [key: string]: any }) => {
  return User.findOne(filter);
};

const findAll = async (filter: { [key: string]: any } = {}) => {
  return User.find(filter);
};

const updateOne = async (id: string, data: Partial<IUser>) => {
  return User.updateOne({ _id: id }, data);
};

const deleteOne = async (_id: string) => {
  return (await User.deleteOne({ _id })).deletedCount === 1;
};

export { create, findOne, findAll, updateOne, deleteOne };

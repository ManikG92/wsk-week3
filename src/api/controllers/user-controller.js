import bcrypt from "bcrypt";
import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from "../models/user-model.js";

const getUser = async (req, res, next) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      const error = new Error(`User with id ${req.params.id} not found`);
      error.status = 404;
      return next(error);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const result = await addUser(req.body);
    if (!result || !result.user_id) {
      const error = new Error("Failed to add user");
      error.status = 400;
      return next(error);
    }
    res.status(201).json({ message: "New user added.", result });
  } catch (error) {
    next(error);
  }
};

const putUser = async (req, res, next) => {
  try {
    if (
      res.locals.user.role !== "admin" &&
      Number(res.locals.user.user_id) !== Number(req.params.id)
    ) {
      const error = new Error("Forbidden: Cannot edit another user");
      error.status = 403;
      return next(error);
    }
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const result = await modifyUser(req.body, req.params.id, res.locals.user);
    if (!result) {
      const error = new Error("User not found or modification failed");
      error.status = 404;
      return next(error);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (
      res.locals.user.role !== "admin" &&
      Number(res.locals.user.user_id) !== Number(req.params.id)
    ) {
      const error = new Error("Forbidden: Cannot delete another user");
      error.status = 403;
      return next(error);
    }
    const result = await removeUser(req.params.id, res.locals.user);
    if (!result) {
      const error = new Error("User not found or deletion failed");
      error.status = 404;
      return next(error);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export { getUser, getUserById, postUser, putUser, deleteUser };

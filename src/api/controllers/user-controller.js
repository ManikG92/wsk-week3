import bcrypt from "bcrypt";
import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from "../models/user-model.js";

const getUser = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const result = await addUser(req.body);
    if (result && result.user_id) {
      res.status(201).json({ message: "New user added.", result });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putUser = async (req, res) => {
  try {
    // Only admin or user themselves can modify
    if (
      res.locals.user.role !== "admin" &&
      Number(res.locals.user.user_id) !== Number(req.params.id)
    ) {
      return res.sendStatus(403);
    }
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const result = await modifyUser(req.body, req.params.id, res.locals.user);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    // Only admin or user themselves can delete
    if (
      res.locals.user.role !== "admin" &&
      Number(res.locals.user.user_id) !== Number(req.params.id)
    ) {
      return res.sendStatus(403);
    }
    const result = await removeUser(req.params.id, res.locals.user);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getUser, getUserById, postUser, putUser, deleteUser };

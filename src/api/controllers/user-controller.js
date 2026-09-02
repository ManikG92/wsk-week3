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
    const result = await modifyUser(req.body, req.params.id);
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
    const result = await removeUser(req.params.id);
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

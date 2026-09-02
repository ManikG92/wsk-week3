import {
  listAllCats,
  findCatById,
  findCatsByUserId,
  addCat,
  modifyCat,
  removeCat,
} from "../models/cat-model.js";

const getCat = async (req, res) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    if (cat) {
      res.json(cat);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCatsByUser = async (req, res) => {
  try {
    const cats = await findCatsByUserId(req.params.id);
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postCat = async (req, res) => {
  try {
    const catData = {
      ...req.body,
      owner: res.locals.user.user_id, // Automatically assign the logged-in user
      filename: req.file ? req.file.filename : null,
    };
    const result = await addCat(catData);
    if (result && result.cat_id) {
      res.status(201).json({ message: "New cat added.", result });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putCat = async (req, res) => {
  try {
    const result = await modifyCat(req.body, req.params.id, res.locals.user);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCat = async (req, res) => {
  try {
    const result = await removeCat(req.params.id, res.locals.user);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getCat, getCatById, getCatsByUser, postCat, putCat, deleteCat };

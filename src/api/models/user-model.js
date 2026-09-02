import promisePool from "../../utils/database.js";

const listAllUsers = async () => {
  const [rows] = await promisePool.query(
    "SELECT user_id, name, username, email, role FROM wsk_users",
  );
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT user_id, name, username, email, role FROM wsk_users WHERE user_id = ?",
    [id],
  );
  if (rows.length === 0) return false;
  return rows[0];
};

// Needed for authentication lookup
const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_users WHERE username = ?",
    [username],
  );
  if (rows.length === 0) return false;
  return rows[0];
};

const addUser = async (user) => {
  const { name, username, email, password, role } = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, password, role || "user"];
  const [result] = await promisePool.execute(sql, params);
  if (result.affectedRows === 0) return false;
  return { user_id: result.insertId };
};

// Users can only update their own record unless admin
const modifyUser = async (user, id, authUser) => {
  let sql;
  let params;
  if (authUser.role === "admin") {
    sql = promisePool.format("UPDATE wsk_users SET ? WHERE user_id = ?", [
      user,
      id,
    ]);
  } else {
    sql = promisePool.format("UPDATE wsk_users SET ? WHERE user_id = ?", [
      user,
      authUser.user_id,
    ]);
  }
  const [result] = await promisePool.execute(sql);
  if (result.affectedRows === 0) return false;
  return { message: "success" };
};

// Cascading delete within transaction; admins can delete any user
const removeUser = async (id, authUser) => {
  const targetId = authUser.role === "admin" ? id : authUser.user_id;
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute("DELETE FROM wsk_cats WHERE owner = ?", [
      targetId,
    ]);
    const [result] = await connection.execute(
      "DELETE FROM wsk_users WHERE user_id = ?",
      [targetId],
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return false;
    }
    await connection.commit();
    return { message: "success" };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export {
  listAllUsers,
  findUserById,
  findUserByUsername,
  addUser,
  modifyUser,
  removeUser,
};

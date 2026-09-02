const userItems = [
  {
    user_id: 3609,
    name: "John Doe",
    username: "johndoe",
    email: "john@metropolia.fi",
    role: "user",
    password: "password",
  },
  {
    user_id: 3610,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@metropolia.fi",
    role: "admin",
    password: "password123",
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const { name, username, email, role, password } = user;
  const newId = userItems.length > 0 ? userItems[0].user_id + 1 : 1;
  const newUser = {
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  };
  userItems.unshift(newUser);
  return { user_id: newId };
};

export { listAllUsers, findUserById, addUser };

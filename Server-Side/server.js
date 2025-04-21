import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs'


const app = express();
const PORT = 5000;
const USERS_FILE = "./users.json";

app.use(cors());
app.use(bodyParser.json());

function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Login route
app.post("/api/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const data = readUsers();
    const users = Array.isArray(data) ? data : data?.users;

    if (!Array.isArray(users)) {
      return res.status(500).json({ message: "Invalid user data structure" });
    }

    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      res.json({ user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error in /api/login:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Sign-up route
app.post("/api/signup", (req, res) => {
  const { email, password, name } = req.body;
  const data = readUsers();

  const users = Array.isArray(data) ? data : data.users;

  if (!Array.isArray(users)) {
    return res.status(500).json({ message: "Invalid users data" });
  }

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ success: false, message: "Email already exists" });
  }

  const newUser = {
    name,
    email,
    password,
    id: Date.now(),
    todoLists: [], // Initialize with an empty array of to-do lists
  };

  users.push(newUser);
  saveUsers(users); // Save full array back to the file

  res.json({
    success: true,
    user: { id: newUser.id, email: newUser.email, name: newUser.name }
  });
});

// Get to-do lists for a user
app.get("/api/todolists/:userId", (req, res) => {
  const { userId } = req.params;
  const users = readUsers();
  const user = users.find((u) => u.id === Number(userId));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user.todoLists || []);
});

// Save updated to-do lists for a user
app.post("/api/todolists/:userId", (req, res) => {
  const { userId } = req.params;
  const updatedLists = req.body;

  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === Number(userId));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex].todoLists = updatedLists;
  saveUsers(users);
  res.json({ success: true });
});

app.post("/api/todolists/:userId", (req, res) => {
  const { userId } = req.params;
  const updatedLists = req.body;

  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === Number(userId));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex].todoLists = updatedLists;
  saveUsers(users);
  res.json({ success: true });
});

app.post("/api/tasks/:userId/:listId", (req, res) => {
  const { userId, listId } = req.params;
  const updatedTasks = req.body;

  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === Number(userId));
  
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  
  const listIndex = users[userIndex]?.todoLists?.findIndex((list) => list.id === Number(listId));

    if (listIndex === -1) {
    return res.status(404).json({ message: "List not found" });
  }

  users[userIndex].todoLists[listIndex].tasks = updatedTasks;
  saveUsers(users);
  res.json({ success: true });
});


app.get("/", (req, res) => {
  try {
    const data = readUsers();
    const users = Array.isArray(data) ? data : data.users;

    if (!Array.isArray(users)) {
      throw new Error("Users data is not a valid array");
    }

    const userList = users.map((user) => JSON.stringify(user)).join("\n");
    res.type("text/plain").send(userList);
  } catch (err) {
    console.error("Error reading users:", err);
    res.status(500).send("Error loading users");
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
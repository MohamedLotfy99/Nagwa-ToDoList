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
    const data = readUsers();         // ← this returns { users: [...] }
    const users = data.users;         // ← get the actual array

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
  const users = readUsers();

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ success: false, message: "Email already exists" });
  }

  const newUser = {
    id: Date.now(),
    email,
    password,
    name
  };

  users.push(newUser);
  saveUsers(users);

  res.json({ success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name } });
});

app.get("/", (req, res) => {
  try {
    const users = readUsers();
    res.json(users);
  } catch (err) {
    console.error("Error reading users:", err);
    res.status(500).json({ message: "Error loading users" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
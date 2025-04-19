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

  };

  users.push(newUser);
  saveUsers(users); // Save full array back to the file

  res.json({
    success: true,
    user: { id: newUser.id, email: newUser.email, name: newUser.name }
  });
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
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({ static: "./build" });
const port = process.env.PORT || 3002;

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const HARDCODED_USER = {
  username: "admin",
  password: "password123",
  id: "usr_001",
  firstName: "Admin",
  lastName: "User",
  email: "admin@example.com",
  role: "admin",
  permissions: ["read", "write", "delete"],
  createdAt: "2024-01-01T00:00:00Z",
};

const JWT_SECRET = "Th!sTH!sIsThEJWTSecretKey";

server.use(jsonServer.bodyParser);

server.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === HARDCODED_USER.username &&
    password === HARDCODED_USER.password
  ) {
    const token = jwt.sign(
      {
        username,
        userId: HARDCODED_USER.id,
        firstName: HARDCODED_USER.firstName,
        lastName: HARDCODED_USER.lastName,
        email: HARDCODED_USER.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: HARDCODED_USER.id,
        username: HARDCODED_USER.username,
        firstName: HARDCODED_USER.firstName,
        lastName: HARDCODED_USER.lastName,
        email: HARDCODED_USER.email,
      },
    });
  } else {
    res.status(401).json({
      error: "Invalid credentials",
    });
  }
});

server.use(middlewares);
server.use(router);
server.listen(port);

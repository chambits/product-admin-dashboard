module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (
      req.body.email === "admin@example.com" &&
      req.body.password === "admin123"
    ) {
      res.json({
        token: "fake-jwt-token",
        user: {
          id: 1,
          email: "admin@example.com",
          name: "Admin User",
        },
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
    return;
  }
  next();
};

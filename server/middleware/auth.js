import jwt from "jsonwebtoken";

const auth = (roles = []) => {
  return (req, res, next) => {
    try {
      let token;

      // ✅ 1. Try header first
      const header = req.headers.authorization;
      if (header && header.startsWith("Bearer ")) {
        token = header.split(" ")[1];
      }

      // ✅ 2. Fallback to cookie
      if (!token && req.cookies?.token) {
        token = req.cookies.token;
      }

      if (!token) {
        return res.status(401).json({ msg: "No token" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // ✅ role check
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: "Invalid token" });
    }
  };
};

export default auth;
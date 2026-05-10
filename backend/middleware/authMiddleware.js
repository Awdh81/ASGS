const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.cookies.token;

    // Also check Authorization header for Bearer token
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized ❌ (Login required)"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    req.userRole = decoded.role || "admin";

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token ❌"
    });
  }
};

module.exports = authMiddleware;
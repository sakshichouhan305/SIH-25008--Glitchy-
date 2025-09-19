const roleMiddleware = (requiredRole) => {
  // add logger
  const log = {
    info: (...args) => console.info(new Date().toISOString(), "[roleMiddleware]", ...args),
    warn: (...args) => console.warn(new Date().toISOString(), "[roleMiddleware]", ...args),
    error: (...args) => console.error(new Date().toISOString(), "[roleMiddleware]", ...args),
  };

  return (req, res, next) => {
    try {
      const userRole = req.user?.role;
      log.info("roleMiddleware check", { requiredRole, userRole, userId: req.user?.id });

      // requiredRole can be a string or an array of strings
      if (Array.isArray(requiredRole)) {
        if (!requiredRole.includes(userRole)) {
          log.warn("roleMiddleware - forbidden (not in allowed roles)", { userId: req.user?.id, userRole });
          return res.status(403).json({ message: "Forbidden" });
        }
      } else {
        if (userRole !== requiredRole) {
          log.warn("roleMiddleware - forbidden (role mismatch)", { userId: req.user?.id, userRole, requiredRole });
          return res.status(403).json({ message: "Forbidden" });
        }
      }

      log.info("roleMiddleware - allowed", { userId: req.user?.id, userRole });
      next();
    } catch (err) {
      log.error("roleMiddleware error", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

export default roleMiddleware;

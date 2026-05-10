const UserActivity = require('../models/UserActivity');

const trackActivity = (action, getDetails = null) => {
  return async (req, res, next) => {
    // Store original send function
    const originalSend = res.send;
    
    // Override send function to capture response
    res.send = function(data) {
      // Track activity after response is sent
      if (req.userId) {
        const activity = new UserActivity({
          userId: req.userId,
          userEmail: req.userEmail,
          userName: req.userEmail, // Use email as name for now
          userRole: req.userRole,
          action: action,
          details: getDetails ? getDetails(req, data) : {},
          ipAddress: req.ip || req.connection.remoteAddress,
          userAgent: req.headers['user-agent']
        });
        activity.save().catch(err => console.error('Error tracking activity:', err));
      }
      
      // Call original send
      originalSend.call(this, data);
    };
    
    next();
  };
};

module.exports = trackActivity;
// middlewares.js
export const setHeaders = (req, res, next) => {
    // Set CORS headers to allow all origins (adjust as needed for your security requirements)
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
    // Handle preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  };
  
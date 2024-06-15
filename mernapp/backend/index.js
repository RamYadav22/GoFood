// Your main file
const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');

// CORS configuration
// CORS configuration middleware
app.use((req, res, next) => {
  // Allow requests from specific origins (replace '*' with your frontend origin)
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");


  

  

  // Allow specific methods (e.g., GET, POST, OPTIONS, etc.)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  // Allow specific headers (e.g., Content-Type, Authorization, etc.)
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Allow credentials (if applicable)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    // Respond with a success status code (200) for preflight requests
    return res.sendStatus(200);
  }

  
 

  // Pass control to the next middleware
  next();
});


// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB and start the server
(async () => {
  try {
    console.log("Entering MongoDB setup");
    await mongoDB();
    console.log("MongoDB setup completed");

    // Route for handling user creation
    app.use('/api', require('./Routes/CreateUser'));
    app.use('/api', require('./Routes/DisplayData'));
    app.use('/api', require('./Routes/OrderData'));
    
    // Default route
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error in main file:', error);
  }
})();

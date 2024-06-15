const mongoose = require('mongoose');

//const mongoURI = 'mongodb+srv://gofood:Ramanand123@cluster0.x74ojhb.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=AtlasApp';
const mongoURI = 'mongodb+srv://gofood:Ramanand123@cluster0.x74ojhb.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'
//const mongoURI = 'mongodb+srv://gofood:Ramanand123@cluster0.x74ojhb.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'
const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 50000, // 50 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });

    // Disable buffering of commands
    mongoose.set('bufferCommands', false);
    mongoose.set('bufferTimeoutMS', 30000);

    // Access the "food_items" collection
    const collection = mongoose.connection.db.collection('food_items');

    // Fetch data from the collection
    const data = await collection.find({}).toArray();

    // Access the "foodCategory" collection
    const foodCategory = mongoose.connection.db.collection('foodCategory');
    
    // Fetch data from the "foodCategory" collection
    const catData = await foodCategory.find({}).toArray();

    // Set global.food_items with the fetched data
    global.food_items = data;
    global.foodCategory = catData;

    return data; // Return the fetched data
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

module.exports = mongoDB;

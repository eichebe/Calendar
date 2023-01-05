const mongodb = require('mongodb');

// Connect to the MongoDB server
mongodb.MongoClient.connect('mongodb://localhost:27017', (error, client) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log('Connected to MongoDB server');

  // Check if the calendar database exists
  client.db('calendar').listCollections().toArray((error, collections) => {
    if (error) {
      console.error(error);
      client.close();
      return;
    }

    // If the database doesn't exist, create it
    if (collections.length === 0) {
      console.log('Creating calendar database');
      client.db('calendar').createCollection('events', (error, result) => {
        if (error) {
          console.error(error);
          client.close();
          return;
        }
        console.log('Calendar database created');
      });
    } else {
      console.log('Calendar database already exists');
    }
  });

  // Start the server
  require('./server')(client);
});
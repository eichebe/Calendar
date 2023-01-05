const http = require('http');
const mongodb = require('mongodb');

// Connect to the MongoDB database
mongodb.MongoClient.connect('mongodb://localhost:27017', (error, client) => {
  if (error) {
    console.error(error);
    return;
  }
  client.db().admin().listDatabases((error, result) => {
    if (error) {
      console.error(error);
      return;
    }

    const databases = result.databases;
    const calendarDbExists = databases.some(db => db.name === 'calendar');
    if (!calendarDbExists) {
      // Create the calendar database if it does not exist
      client.db().createDatabase('calendar', (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log('Calendar database created');
      });
    }
  });
});

  // Create a server using the http module
  const server = http.createServer((request, response) => {
    // Get the request method and URL
    const method = request.method;
    const url = request.url;

    // Set the response headers
    response.setHeader('Content-Type', 'application/json');

    // If the request URL is /events and the method is GET, retrieve a list of events from the database
    if (url === '/events' && method === 'GET') {
      const db = client.db('calendar');
      db.collection('events').find({}).toArray((error, events) => {
        if (error) {
          console.error(error);
          response.end(JSON.stringify({ error: 'An error occurred while retrieving events' }));
          return;
        }

        // Return the list of events in the response
        response.end(JSON.stringify(events));
      });
    }
    // If the request URL is /events and the method is POST, create a new event in the database
    else if (url === '/events' && method === 'POST') {
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
      });
      request.on('end', () => {
        // Parse the request body as JSON
        const event = JSON.parse(body);

        // Insert the new event into the database
        const db = client.db('calendar');
        db.collection('events').insertOne(event, (error, result) => {
          if (error) {
            console.error(error);
            response.end(JSON.stringify({ error: 'An error occurred while adding the event' }));
            return;
          }

          // Return the inserted event in the response
          response.end(JSON.stringify(event));
        });
      });
    } else {
      // Return an error if the request URL or method is not recognized
      response.statusCode = 400;
      response.end(JSON.stringify({ error: 'Invalid request' }));
    }
  });

  // Start the server
  server.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1'; // localhost
const port = 3000;
const externalDirectory = '../Frontend';

const server = http.createServer((req, res) => {
  // Set the response status and headers
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  if (req.url === 'script.js') {
    res.setHeader('Content-Type', 'text/javascript');
    fs.readFile(path.join(externalDirectory, 'script.js'), (error, data) => {
      if (error) {
        res.statusCode = 500;
        res.end('Error reading file');
        return;
      }
      res.end(data);
    });
  } else if (req.url === 'styles.css') {
    res.setHeader('Content-Type', 'text/css');
    fs.readFile(path.join(externalDirectory, 'styles.css'), (error, data) => {
      if (error) {
        res.statusCode = 500;
        res.end('Error reading file');
        return;
      }
      res.end(data);
    });
  } else {
    // Read the contents of the `index.html` file
    fs.readFile(path.join(externalDirectory, 'index.html'), (error, data) => {
      if (error) {
        // If there is an error reading the file, send a 500 Internal Server Error response
        res.statusCode = 500;
        res.end('Error reading file');
        return;
      }
      // If the file is successfully read, send the contents in the response
      res.end(data);
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/calendar', (error, client) => {
  if (error) {
    console.error(error);
    return;
  }

  const db = client.db('calendar');
  const events = db.collection('events');

  const event = {
    title: 'My Event',
    start: new Date(),
    end: new Date(),
  };

  events.insertOne(event, (error) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Event inserted successfully');
    client.close();
  });
});
module.exports = {
  db: db
};
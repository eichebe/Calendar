const http = require('http');
const fs = require('fs');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const hostname = '127.0.0.1'; // localhost
const port = 3000;
const externalDirectory = '../Frontend';

const server = http.createServer((req, res) => {
  // Set the response status and headers
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
const fileType = req.url.split('.')[1]; // get file extension
const fileQuery = { filename: req.url }; // create query to find file in collection

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }

  // Find the file in the database
  const db = client.db(dbName);
  const files = db.collection('files');
  files.findOne(fileQuery, (error, file) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }

    // Send the file contents in the response
    res.setHeader('Content-Type', `text/${fileType}`);
    res.send(file.data);
  });
});
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    console.error(error);
    return;
  }

  const db = client.db(dbName);
  // Now you can perform operations on the database
});

const files = db.collection('files');
const frontendFiles = files.find({ type: 'frontend' }).toArray((error, result) => {
  if (error) {
    console.error(error);
    return;
  }

  // result is an array of frontend files
});
app.get('/frontend/:filename', (req, res) => {
  // Get the filename from the request parameters
  const filename = req.params.filename;

  // Connect to the MongoDB database
  MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }

    // Find the file in the database
    const db = client.db(dbName);
    const files = db.collection('files');
    files.findOne({ filename }, (error, file) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }

      // Send the file contents in the response
      res.setHeader('Content-Type', file.contentType);
      res.send(file.data);
    });
  });
});
async function sendFile(file) {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html'
        },
        body: file
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  
  const indexFile = fs.readFileSync(path.join(externalDirectory, 'index.html'), 'utf8');
  sendFile(indexFile);
  async function sendData(events) {
    try {
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ events })
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  // Read the contents of the `index.html` file
fetch('/frontend/index.html')
.then(response => response.text())
.then(data => {
  // If the file is successfully read, send the contents in the response
  res.end(data);
})
.catch(error => {
  // If there is an error reading the file, send a 500 Internal Server Error response
  res.statusCode = 500;
  res.end('Error reading file');
});
app.post('/frontend/upload', (req, res) => {
    // Get the file data from the request body
    const file = req.body;
  
    // Connect to the MongoDB database
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }
  
      // Save the file in the database
      const db = client.db(dbName);
      const files = db.collection('files');
      files.insertOne(file, (error, result) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
          return;
        }
  
        res.send({ message: 'File uploaded successfully' });
      });
    });
  });
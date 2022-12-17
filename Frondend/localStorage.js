const http = require('http');

// Get the data from local storage
const data = JSON.parse(localStorage.getItem('data'));

// Create the request options
const options = {
  hostname: 'example.com',
  port: 80,
  path: '/api/data',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

// Create the request
const req = http.request(options, res => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', chunk => {
    console.log(`Body: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', error => {
  console.error(`Error: ${error.message}`);
});

// Write the data to the request body
req.write(JSON.stringify(data));
req.end();
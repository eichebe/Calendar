fetch('/Frontend/index.html')
.then(response => response.text())
.then(data => {
  console.log("index send", response);
  res.end(data);
})
.catch(error => {
  // If there is an error reading the file, send a 500 Internal Server Error response
  res.statusCode = 500;
  res.end('Error reading file');
});

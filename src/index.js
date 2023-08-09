#!/usr/bin/env node

require('dotenv').config();

process.env.USER_ID; // "239482"
process.env.USER_KEY; // "foobar"
process.env.NODE_ENV; // "development"

// Actual code
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Construct the file path based on the requested URL
  let filePath = '.' + req.url;
  
  // If the root URL is requested, redirect to index.html
  if (filePath === './') {
    filePath = './index.html';
  }

  // Define valid URL paths and their corresponding HTML file names
  const validPaths = {
    '/': '../dist/index.html',
    '/about': '../dist/about.html',
    '/contact-me': '../dist/contact-me.html'
  };

  // Get the requested URL's corresponding HTML file name
  const fileName = validPaths[req.url] || '404.html';
  
  // Construct the full file path using __dirname to ensure cross-platform compatibility
  filePath = path.join(__dirname, fileName);

  // Read the content of the HTML file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If the file is not found, respond with a 404 status code and message
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404 Not Found');
    } else {
      // If the file is found, respond with a 200 status code and the file content
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

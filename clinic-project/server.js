const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Obtain routes
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
  let mainPath = path.join(__dirname, "/index.html");
  // Verify if file exist
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // If file doens't exist error 400
      fs.readFile(mainPath, (err, content) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("500 Internal Server Error");
          return;
        }

        // Header config
        res.writeHead(200, { "Content-Type": getContentType(mainPath) });

        // Send content
        res.end(content);
      });
      return;
    }

    // Read file's content
    fs.readFile(filePath, (err, content) => {
      if (err) {
        // Error 500 if broke
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
        return;
      }

      // Config header
      res.writeHead(200, { "Content-Type": getContentType(filePath) });

      // Send content
      res.end(content);
    });
  });
});

// File type
function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    default:
      return "text/plain";
  }
}

const port = 3000;

// Init server
server.listen(port, () => {
  console.log(`Web service working`);
});

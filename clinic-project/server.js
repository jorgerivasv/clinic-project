global.Headers = require("node-fetch").Headers;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const http = require("http");
const fs = require("fs");
const path = require("path");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_TOKEN);

const server = http.createServer((req, res) => {
  //Send email endpoint
  if (req.url === "/send-email" && req.method === "POST") {
    // Handle POST req
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const emailData = JSON.parse(body);
      if (
        emailData.name !== null &&
        emailData.name !== "" &&
        emailData.phone !== null &&
        emailData.phone !== "" &&
        emailData.description !== null &&
        emailData.description !== ""
      ) {
        resend.emails
          .send({
            from: `Biodentric <onboarding@resend.com>`,
            to: ["martinrivasvesco@gmail.com"],
            subject: `Contacto de parte del cliente ${emailData.name}`,
            html: `<div><p>El cliente que se contacta tiene por nombre: 
          ${emailData.name}</p>Nro. de teléfono: ${emailData.phone}<p></p><p>Texto de consulta: ${emailData.description}</p></div>`,
          })
          .then(() => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Mail sent successfully" }));
          })
          .catch((error) => {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                message: "Error sending mail",
                error: {
                  error: body,
                  data: [process.env.RESEND_TOKEN, error, resend],
                },
              })
            );
          });
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Error sending mail" }));
      }
    });
    return;
  }

  //Send GMAPS URL
  if (req.url === "/api/gmaps-url" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ href: process.env.GMAP_HREF }));
    return;
  }

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

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Obtener la ruta del archivo solicitado
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
  let errorPath = path.join(__dirname, "/templates/404.html");
  console.log("file path", filePath, "req url", req.url);
  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Si el archivo no existe, responder con un código de estado 404 (No encontrado)
      fs.readFile(errorPath, (err, content) => {
        if (err) {
          // Si ocurre un error al leer el archivo, responder con un código de estado 500 (Error interno del servidor)
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("500 Internal Server Error");
          return;
        }

        // Configurar las cabeceras de respuesta
        res.writeHead(200, { "Content-Type": getContentType(errorPath) });

        // Enviar el contenido del archivo como respuesta
        res.end(content);
      });
      return;
    }

    // Leer el contenido del archivo
    fs.readFile(filePath, (err, content) => {
      if (err) {
        // Si ocurre un error al leer el archivo, responder con un código de estado 500 (Error interno del servidor)
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
        return;
      }

      // Configurar las cabeceras de respuesta
      res.writeHead(200, { "Content-Type": getContentType(filePath) });

      // Enviar el contenido del archivo como respuesta
      res.end(content);
    });
  });
});

// Función para determinar el tipo de contenido basado en la extensión del archivo
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

// Configurar el puerto en el que se ejecutará el servidor
const port = 3000;

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor web funcionando en http://localhost:${port}/`);
});

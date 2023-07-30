const http = require("http");
const fs = require("fs");
const path = require("path");
const { URLROUTES } = require("./acc/routes");

const server = http.createServer((req, res) => {
  // Obtener la ruta del archivo solicitado

  let filePath = path.join(
    __dirname,
    URLROUTES[req.url]?.template ?? URLROUTES[404].template
  );

  console.log(filePath);
  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Si el archivo no existe, redirigir a la página 404
      res.writeHead(302, { Location: "/templates/404.html" });
      res.end();
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
      res.writeHead(200, { "Content-Type": "text/html" });

      // Enviar el contenido del archivo como respuesta
      res.end(content);
    });
  });
});

// Configurar el puerto en el que se ejecutará el servidor
const port = 3000;

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor web funcionando en http://localhost:${port}/`);
});

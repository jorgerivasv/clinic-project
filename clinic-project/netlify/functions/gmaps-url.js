const process = require("process"); // Necesario para variables de entorno

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ href: process.env.GMAP_HREF }),
  };
};

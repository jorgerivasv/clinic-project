// send-email.js
const process = require("process"); // Necesario si estás usando variables de entorno
// Asume que 'resend' es una librería que necesitas, asegúrate de incluir y configurar adecuadamente
const resend = require("resend"); // Asegúrate de tener esta librería disponible o adaptarlo a tu solución de envío de email

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  const emailData = JSON.parse(event.body);

  if (emailData.name && emailData.phone && emailData.description) {
    try {
      await resend.emails.send({
        from: `Biodentric <onboarding@resend.com>`,
        to: ["martinrivasvesco@gmail.com"],
        subject: `Contacto de parte del cliente ${emailData.name}`,
        html: `<div><p>El cliente que se contacta tiene por nombre: 
        ${emailData.name}</p>Nro. de teléfono: ${emailData.phone}<p></p><p>Texto de consulta: ${emailData.description}</p></div>`,
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Mail sent successfully" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error sending mail", error }),
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing information" }),
    };
  }
};

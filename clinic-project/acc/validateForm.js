export default function validateForm() {
  const myForm = document.getElementById("myForm");
  const nombreInput = document.getElementById("nombre");
  const telefonoInput = document.getElementById("telefono");
  const nombreError = document.getElementById("nombreError");
  const telefonoError = document.getElementById("telefonoError");

  myForm.addEventListener("submit", function (e) {
    let isValid = true;

    // Validación del nombre (no puede estar vacío)
    const nombrePattern = /^[a-zA-Z\s]*$/;
    if (
      nombreInput.value.trim() === "" ||
      !nombrePattern.test(nombreInput.value)
    ) {
      nombreError.style.display = "block";
      isValid = false;
    } else {
      nombreError.style.display = "none";
    }

    // Validación del teléfono (debe ser un número)
    const telefonoPattern = /^\d+$/;
    if (!telefonoPattern.test(telefonoInput.value)) {
      telefonoError.style.display = "block";
      isValid = false;
    } else {
      telefonoError.style.display = "none";
    }

    if (!isValid) {
      e.preventDefault(); // Evita que se envíe el formulario si hay errores
    }
    e.preventDefault();
  });
}

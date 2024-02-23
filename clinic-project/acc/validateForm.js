export default function validateForm() {
  const myForm = document.getElementById("myForm");
  const $inputName = document.getElementById("input_name");
  const $inputPhone = document.getElementById("input_phone");
  const $userDescription = document.getElementById("input_description");
  const $errorName = document.getElementById("input_name_error");
  const $errorPhone = document.getElementById("input_phone_error");
  const $errorDescription = document.getElementById("input_description_error");
  const $sendBtn = document.getElementById("send_btn");
  const $sendMessage = document.getElementById("send_message");
  const $sendErrorMessage = document.getElementById("send_error_message");

  myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Validación del nombre (no puede estar vacío)
    const nombrePattern = /^[a-zA-Z\s]*$/;
    if (
      $inputName.value.trim() === "" ||
      !nombrePattern.test($inputName.value)
    ) {
      $errorName.style.display = "block";
      isValid = false;
    } else {
      $errorName.style.display = "none";
    }

    // Validación del teléfono (debe ser un número)
    const telefonoPattern = /^\d+$/;
    if (!telefonoPattern.test($inputPhone.value)) {
      $errorPhone.style.display = "block";
      isValid = false;
    } else {
      $errorPhone.style.display = "none";
    }

    //Validación del textarea
    const descriptionPattern = /^[^<>]+$/;
    if (!descriptionPattern.test($userDescription.value)) {
      $errorDescription.style.display = "block";
      isValid = false;
    } else {
      $errorDescription.style.display = "none";
    }

    if (!isValid) {
      return;
    }

    fetch("/.netlify/functions/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: $inputName.value,
        phone: $inputPhone.value,
        description: $userDescription.value,
      }),
    }).then((response) => {
      if (response.ok) {
        $sendBtn.setAttribute("disabled", true);
        $sendBtn.classList.add("disabled");
        $sendMessage.style.display = "block";
      } else {
        $sendErrorMessage.style.display = "block";
      }
    });
  });
}

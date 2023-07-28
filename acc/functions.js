export default function handleNavClick(buttonId, panelId, navItemsClass) {
  const d = document;
  const $navbarbtn = d.getElementById(buttonId);
  const $panelbtn = d.getElementById(panelId);

  const navAction = () => {
    if ($navbarbtn.classList.contains("is-active")) {
      $navbarbtn.classList.remove("is-active");
      $panelbtn.classList.remove("is-active");
    } else {
      $navbarbtn.classList.add("is-active");
      $panelbtn.classList.add("is-active");
    }
  };

  d.addEventListener("click", (e) => {
    if (
      e.target === $navbarbtn ||
      e.target.classList.contains(navItemsClass) ||
      e.target.classList.contains($navbarbtn.firstElementChild.className)
    ) {
      navAction();
    }
  });
}

export function searchPage(link) {
  fetch(link)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      const $bodyChildren = doc.querySelector("body");
      document.getElementById("content").innerHTML = $bodyChildren.innerHTML;
    })
    .catch((error) => {
      console.error("Error al importar el archivo HTML:", error);
    });
}

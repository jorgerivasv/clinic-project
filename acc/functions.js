import tns from "./tiny-slider.js";

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
      if (link === "/clinic-project/templates/home.html") {
        tns({
          mode: "carousel", // or 'gallery'
          mouseDrag: true,
          navPosition: "bottom",
          autoplay: true,
          autoplayButtonOutput: false,
          loop: true,
          gutter: 0,
          controlsContainer: "#custom_controlsContainer",
          nextButton: "#prev",
          nextButton: "#next", // String selector
          arrowKeys: true, // keyboard support
          lazyload: false,
          lazyloadSelector: ".tns-lazy",
          speed: 700,
          startIndex: 1,
          responsive: {
            0: {
              items: 1,
              edgePadding: 30,
              nav: false,
            },
            768: {
              items: 3,
              edgePadding: 0,
            },
            1024: {
              items: 3,
              edgePadding: 0,
            },
          },
        });
      }
    })
    .catch((error) => {
      console.error("Error al importar el archivo HTML:", error);
    });
}

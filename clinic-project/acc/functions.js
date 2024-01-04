import tns from "./tiny-slider.js";
import bulmaAccordion from "./bulmaAccordion.js";
import validateForm from "./validateForm.js";
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
    if (e.target.classList.contains("navbar-item")) {
      $navbarbtn.classList.remove("is-active");
      $panelbtn.classList.remove("is-active");
    }
  });
}

export function tabHandler() {
  //  Obtain all tab and content
  const tabs = document.querySelectorAll(".tabs li");
  const tabContents = document.querySelectorAll(".tabs-content > div");

  // Add event to all tab
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Close  and hide all
      tabs.forEach((t) => t.classList.remove("is-active"));
      tabContents.forEach((content) =>
        content.classList.remove("active-content")
      );

      // Activate tab
      tab.classList.add("is-active");

      // Show content
      const tabId = tab.getAttribute("data-tab");
      const tabContent = document.getElementById(tabId);
      if (tabContent) {
        tabContent.classList.add("active-content");
      }
    });
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
      window.scrollTo(0, 0);
      const AOS = window.AOS;
      AOS.init();
      if (link === "/templates/home.html") {
        //Init workers info handler
        handleWorkerProfesionalInfo(".card-workers");
        //Init service handler
        handleServiceClick(".card-services");
        //Handle carousel
        tns({
          mode: "carousel", // or 'gallery'
          mouseDrag: true,
          navPosition: "bottom",
          autoplay: true,
          autoplayButtonOutput: false,
          loop: true,
          gutter: 0,
          controlsContainer: "#custom_controlsContainer",
          prevButton: "#prev",
          nextButton: "#next", // String selector
          arrowKeys: true, // keyboard support
          lazyload: false,
          lazyloadSelector: ".tns-lazy",
          speed: 700,
          startIndex: 0,
          swipeAngle: false,
          responsive: {
            0: {
              items: 1,
              edgePadding: 30,
              nav: true,
              controls: false,
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
      if (link === "/templates/lab-dental.html") {
        tabHandler();
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
          startIndex: 0,
          responsive: {
            0: {
              items: 1,
              edgePadding: 30,
              nav: false,
            },
            768: {
              items: 4,
              edgePadding: 0,
            },
            1024: {
              items: 4,
              edgePadding: 0,
            },
          },
        });
      }
      if (link === "/templates/gastro.html") {
        tabHandler();
        bulmaAccordion().attach();
      }
      if (link === "/templates/contact.html") {
        //Init gmaps
        insertGmapScript();
        validateForm();
      }
      if (link === "/templates/aboutus.html") {
        //Init service handler
        handleServiceClick(".card-services");
      }
      if (link === "/templates/dental.html") {
        tabHandler();
        //Init carousel
        tns({
          mode: "carousel", // or 'gallery'
          mouseDrag: true,
          navPosition: "bottom",
          autoplay: true,
          autoplayButtonOutput: false,
          loop: true,
          gutter: 0,
          controlsContainer: "#custom_controlsContainer",
          prevButton: "#prev",
          nextButton: "#next", // String selector
          arrowKeys: true, // keyboard support
          lazyload: false,
          lazyloadSelector: ".tns-lazy",
          speed: 700,
          startIndex: 0,
          swipeAngle: false,
          responsive: {
            0: {
              items: 1,
              edgePadding: 30,
              nav: true,
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

export function handleServiceClick(className) {
  const d = document;
  d.addEventListener("click", (e) => {
    for (const target of e.path || (e.composedPath && e.composedPath())) {
      if (target.matches && target.matches(className)) {
        const $elementName = target.querySelector("p");
        const linkToClick = (href) => {
          const link = d.createElement("a");
          link.setAttribute("href", href);
          link.style.display = "none";
          d.body.appendChild(link);
          link.click();
          link.remove();
        };
        if ($elementName.textContent.toLowerCase() === "clínica dental") {
          linkToClick("/dental");
        } else if (
          $elementName.textContent.toLowerCase() === "laboratorio dental"
        ) {
          linkToClick("/lab-dental");
        } else if (
          $elementName.textContent.toLowerCase() ===
          "laboratorio gastroenterología"
        ) {
          linkToClick("/gastro");
        }
        break;
      }
    }
  });
}

export function handleWorkerProfesionalInfo(className) {
  const d = document;
  const w = window;
  const linkToClick = (href) => {
    const link = document.createElement("a");
    link.setAttribute("href", href);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  const actionSelector = (elementName) => {
    if (elementName.textContent.toLowerCase() === "martin rivas") {
      linkToClick("https://www.instagram.com/dr.m.rivas/");
    }
    if (elementName.textContent.toLowerCase() === "nicole pacheco") {
      linkToClick(
        "https://www.linkedin.com/in/nicole-pacheco-herrera-008090173/"
      );
    }
    if (elementName.textContent.toLowerCase() === "jorge rivas") {
      linkToClick("https://www.linkedin.com/in/jorge-rivas-vesco-253070a1/");
    }
  };
  const clickAction = (e) => {
    for (const target of e.path || (e.composedPath && e.composedPath())) {
      if (target.matches && target.matches(className)) {
        const $elementName = target.querySelector("p");
        actionSelector($elementName);
        break;
      }
    }
  };
  d.addEventListener("click", (e) => clickAction(e));
}

export const insertGmapScript = () => {
  var script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyAYvSJ40lctzBAuaDr39ZbpvJeGPd5L0Wc&callback=initMap";

  // Añadir el script al final del body
  document.body.appendChild(script);
};

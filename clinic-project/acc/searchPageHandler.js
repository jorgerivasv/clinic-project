import bulmaAccordion from "./bulmaAccordion.js";
import {
  handleNavSelector,
  handleServiceClick,
  handleWorkerProfesionalInfo,
  insertGmapScript,
  tabHandler,
} from "./functions.js";
import serviceCarousel from "./serviceCarousel.js";
import tns from "./tiny-slider.js";
import validateForm from "./validateForm.js";

export function searchPage(link) {
  fetch(link)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      const $bodyChildren = doc.querySelector("body");
      document.getElementById("content").innerHTML = $bodyChildren.innerHTML;
      //Everytime scroll to top
      window.scrollTo(0, 0);
      //Handle nav selector
      handleNavSelector("a.navbar-item");
      //Start AOS function
      const AOS = window.AOS;
      AOS.init();
      //Controll all pages
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
        serviceCarousel();
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
        serviceCarousel();
        bulmaAccordion().attach();
      }
      if (link === "/templates/contacto.html") {
        //Init gmaps
        insertGmapScript();
        validateForm();
      }
      if (link === "/templates/aboutus.html") {
        //Init service handler
        handleServiceClick(".card-services");
      }
      if (link === "/templates/clinica-dental.html") {
        tabHandler();
        //Init carousel
        serviceCarousel();
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

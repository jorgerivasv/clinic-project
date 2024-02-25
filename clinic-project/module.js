import bulmaAccordion from "./acc/bulmaAccordion.js";
import handleNavClick, {
  navStickyHandler,
  tabHandler,
} from "./acc/functions.js";
import { searchPage } from "./acc/searchPageHandler.js";
import serviceCarousel from "./acc/serviceCarousel.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  //Init page.js - routing
  const page = window.page;

  page("/", () => {
    searchPage("/templates/home.html");
  });
  page("/clinica-dental", () => searchPage("/templates/clinica-dental.html"));
  page("/laboratorio-dental", () => searchPage("/templates/lab-dental.html"));
  page("/gastro", () => searchPage("/templates/gastro.html"));
  page("/about-us", () => searchPage("/templates/aboutus.html"));
  page("/contact", () => searchPage("/templates/contact.html"));
  page("*", () => searchPage("/templates/404.html"));
  page();

  //Init nav handler
  handleNavClick("navbar-burger-btn", "navbarClinic", "navbar-item");

  //Init sticky nav handler
  navStickyHandler("navbar-complete");

  //If the page was loaded externally charge the main html of the page
  const currentLocation = window.location.pathname;

  if (currentLocation.includes("gastro")) {
    tabHandler();
    serviceCarousel();
    bulmaAccordion().attach();
  } else if (currentLocation.includes("clinica-dental")) {
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
  } else if (currentLocation.includes("laboratorio-dental")) {
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
  } else if (currentLocation.includes("about-us")) {
    //Init service handler
    handleServiceClick(".card-services");
  } else if (currentLocation.includes("contact")) {
    //Init gmaps
    insertGmapScript();
    validateForm();
  }
});

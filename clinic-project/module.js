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

  if (window.location.pathname.includes("gastro")) {
    tabHandler();
    serviceCarousel();
    bulmaAccordion().attach();
  }
});

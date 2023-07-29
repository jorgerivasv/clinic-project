import handleNavClick, { searchPage } from "./acc/functions.js";
import tns from "./acc/tiny-slider.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  //Init page.js - routing
  const page = window.page;

  page("/", () => searchPage("/templates/home.html"));
  page("/dental", () => searchPage("/templates/dental.html"));
  page("/lab-dental", () => searchPage("/templates/lab-dental.html"));
  page("/gastro", () => searchPage("/templates/gastro.html"));
  page("/about-us", () => searchPage("/templates/aboutus.html"));
  page("/contact", () => searchPage("/templates/contact.html"));
  page("*", () => searchPage("/templates/404.html"));
  page();

  //Init nav handler
  handleNavClick("navbar-burger-btn", "navbarClinic", "navbar-item");

  //Init slider
  tns({
    container: ".my-slider",
    loop: true,
    items: 1,
    slideBy: "page",
    nav: false,
    autoplay: true,
    speed: 400,
    autoplayButtonOutput: false,
    mouseDrag: true,
    lazyload: true,
    controlsContainer: "#customize-controls",
    responsive: {
      640: {
        items: 2,
      },

      768: {
        items: 3,
      },
    },
  });
});

import handleNavClick, { searchPage } from "./acc/functions.js";
/* import tns from "./acc/tiny-slider.js"; */

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  //Init page.js - routing
  const page = window.page;

  page("/clinic-project/", () =>
    searchPage("/clinic-project/templates/home.html")
  );
  page("/clinic-project/dental", () =>
    searchPage("/clinic-project/templates/dental.html")
  );
  page("/clinic-project/lab-dental", () =>
    searchPage("/templates/lab-dental.html")
  );
  page("/clinic-project/gastro", () =>
    searchPage("/clinic-project/templates/gastro.html")
  );
  page("/clinic-project/about-us", () =>
    searchPage("/clinic-project/templates/aboutus.html")
  );
  page("/clinic-project/contact", () =>
    searchPage("/clinic-project/templates/contact.html")
  );
  page("*", () => searchPage("/templates/404.html"));
  page();

  //Init nav handler
  handleNavClick("navbar-burger-btn", "navbarClinic", "navbar-item");

  //Init slider
  /* tns({
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
  }); */
});

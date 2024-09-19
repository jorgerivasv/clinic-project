import bulmaAccordion from "./bulmaAccordion.js";
import {
  handleNavSelector,
  handleServiceClick,
  handleWorkerProfesionalInfo,
  insertGmapScript,
  tabHandler,
} from "./functions.js";
import serviceCarousel from "./serviceCarousel.js";
import { sliderGoogleInfo } from "./sliderGoogleInfo.js";
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
        sliderGoogleInfo().then((resp) => {
          if (resp.success) {
            const $carouselContainer = document.getElementById(
              "carousel-google-container"
            );
            if ($carouselContainer) {
              resp.data.forEach((data) => {
                const listElement = document.createElement("li");
                const ratingStars = () => {
                  const rating = data.rating;
                  const emptyStars = rating - 5;
                  const stars = [];
                  for (let i = 0; i < rating; i++) {
                    stars.push(
                      '<img src="/public/star-filled.webp" alt="star-icon"/>'
                    );
                  }
                  for (let i = 0; i < emptyStars; i++) {
                    stars.push(
                      '<img src="/public/star-empty.webp" alt="star-empty-icon"/>'
                    );
                  }
                  return stars.toString().replaceAll(",", "");
                };
                listElement.innerHTML = ` <div class="testimonial-container"><div class="testimonial-card">
                <div class="testimonial-img"><img src="${
                  data.profile_photo_url
                }" alt="profile-picture"></div>
                <div class="testimonial-body has-text-white">
                  <p class="is-size-4 has-text-centered">${data.author_name}</p>
                  <div class="testimonial-stars">${ratingStars()}</div>
                  <p class="is-size-6 has-text-centered"> ${data.text}
                  </p>
                  <div class="testimonial-google-icon"><a href=${
                    data.author_url
                  } target="_blank" rel="noopener noreferrer"><img src="/public/google-icon.webp" alt="google-icon"/></a></div>
                </div>
              </div></div>`;
                $carouselContainer.appendChild(listElement);
              });
            }
          }

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
        });
      }
    })
    .catch((error) => {
      console.error("Error al importar el archivo HTML:", error);
    });
}

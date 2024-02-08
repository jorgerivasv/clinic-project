const serviceCarousel = () => {
  const isMobile = window.matchMedia("(max-width: 480px)").matches;
  const slide = document.querySelector(".carousel-tab-slide");
  const items = document.querySelectorAll(".carousel-tab-item");
  const itemsLenght = isMobile
    ? items.length <= 2
      ? items.length - 1
      : items.length - 1
    : items.length - 3;
  const $carouselContainer = document.querySelector(".carousel-tab-container");
  const carouselWidth = $carouselContainer.offsetWidth;
  const widthElement = isMobile
    ? carouselWidth
    : items.length <= 2
    ? carouselWidth / items.length
    : carouselWidth / 3;
  const $tabOptions = document.querySelectorAll(".tab-options");
  const $tabContents = document.querySelectorAll(".tabs-content > div");

  let index = isMobile ? (items.length <= 2 ? 0 : 1) : 0;

  function tabActivator(tab, tabs, tabContents) {
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
    console.log(tabId, tabContent);
    if (tabContent) {
      tabContent.classList.add("active-content");
    }
  }

  //Rellenar tamaño de cada elemento

  $tabOptions.forEach(
    (option) => (option.style.width = `calc(${widthElement}px - 1rem)`)
  );
  if (items.length >= 3) {
    // Clona el primer y último elemento

    const lastClone = items[items.length - 1].cloneNode(true);
    slide.prepend(lastClone);
  }

  const initialPosition = () => {
    if (isMobile) {
      return -widthElement * 2;
    } else {
      return -widthElement;
    }
  };

  // Ajusta la posición inicial del carrusel
  slide.style.transform = `translateX(${
    items.length <= 2 ? 0 : initialPosition()
  }px)`;

  const moveToSlide = (index) => {
    slide.style.transition = "transform 0.5s ease-in-out";
    slide.style.transform = `translateX(${
      -widthElement * (index === 0 ? 0 : isMobile ? index : index + 1)
    }px)`;
  };

  // Botones y eventos
  const nextButton = document.querySelector("#tab-carousel-next-btn");
  const prevButton = document.querySelector("#tab-carousel-prev-btn");

  if (items.length <= 2 && !isMobile) {
    nextButton.style.display = "none";
    prevButton.style.display = "none";
  }

  nextButton.addEventListener("click", () => {
    console.log("initial index", index, itemsLenght);
    if (index < itemsLenght) {
      index++;
    } else {
      index = 0;
    }
    console.log(index, items[index], $tabOptions, $tabContents);
    if (isMobile) {
      tabActivator(items[index], $tabOptions, $tabContents);
    }

    moveToSlide(index);
  });

  prevButton.addEventListener("click", () => {
    if (index > 0) {
      index--;
    } else {
      index = itemsLenght;
    }

    if (isMobile) {
      tabActivator(items[index], $tabOptions, $tabContents);
    }

    moveToSlide(index);
  });

  // Manejar el redimensionamiento de la ventana
  window.addEventListener("resize", () => {
    width = widthElement;
    moveToSlide(index);
  });
};

export default serviceCarousel;

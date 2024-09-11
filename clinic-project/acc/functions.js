const w = window;
const d = document;
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

export function handleNavSelector(navId) {
  const d = document;
  const w = window;
  const $navBtn = d.querySelectorAll(navId);
  let selectedBtn;
  $navBtn.forEach((item) => {
    if (item.href.split("/")[3] === w.location.pathname.split("/")[1]) {
      selectedBtn = item;
    } else {
      item.classList.remove("is-selected");
    }
  });
  selectedBtn.classList.add("is-selected");
}

export function navStickyHandler(navbarId) {
  w.addEventListener("scroll", () => {
    const header = d.getElementById(navbarId);
    header.classList.toggle("sticky-navbar", w.scrollY > 0);
  });
}

export function tabHandler() {
  //  Obtain all tab and content
  const tabs = document.querySelectorAll(".carousel-tab-item");
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
          linkToClick("/clinica-dental");
        } else if (
          $elementName.textContent.toLowerCase() === "laboratorio dental"
        ) {
          linkToClick("/laboratorio-dental");
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
      linkToClick("https://www.instagram.com/martinrivas.ro/");
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
    2;
  };
  d.addEventListener("click", (e) => clickAction(e));
}

export const insertGmapScript = async () => {
  const requestUrl = await fetch("/.netlify/functions/gmaps-url", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await requestUrl.json();
  var script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src = response.href;

  // Añadir el script al final del body
  document.body.appendChild(script);
};

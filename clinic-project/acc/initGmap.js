export default function initMap() {
  var script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.textContent = `var location = { lat: -33.44258, lng: -70.6128 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: location,
  });
  new google.maps.Marker({
    position: location,
    map: map,
  });`;

  // Añadir el script al final del head
  document.body.appendChild(script);
}

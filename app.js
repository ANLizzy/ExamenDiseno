var map = L.map('mapid').setView([36.7201600, -4.4203400], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let contenedor = document.querySelector("#contenedor") 
let contenedorModal = document.querySelector("#contenedorModal") 
let plantillalista = document.querySelector("#templatelista") 
let plantillamodal = document.querySelector("#templateModal")

fetch('https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json?classId=a44f2eea-e51b-4a7a-a11a-eefc73428d1a&assignmentId=b6d46e1e-b651-43e1-b861-1d6ba465dd82&submissionId=b18aa76c-4982-7a59-46db-7c6aefedac8f')
  .then(response => response.json())
  .then(data => {
    data.forEach(obj => {
      var x = obj.properties.x;
      var y = obj.properties.y;

      let wrap = document.createElement("li");
      let marcador = plantillalista.content.cloneNode(true);
      marcador.querySelector("a").innerText = obj.properties.nombre;
      marcador.querySelector("p").innerText = obj.properties.horario;
      marcador.querySelector("#direccion").innerText = obj.properties.direccion;
      
      let telf = marcador.querySelector("#telefono");

      if(obj.properties.telefono === ""){
        telf.remove();
      }else{
        telf.innerText = obj.properties.telefono;
      }

      wrap.appendChild(marcador);        
      contenedor.appendChild(wrap);  

      let wrap2 = document.createElement("section");
      let modal = plantillamodal.content.cloneNode(true);
      modal.querySelector("h3").innerText = obj.properties.nombre;
      modal.querySelector("#direccion").innerText = obj.properties.direccion;
      modal.querySelector("#horario").innerText = obj.properties.horario;
      modal.querySelector("#telefono").innerText = obj.properties.telefono;

      wrap2.appendChild(modal);        
      contenedorModal.appendChild(wrap2);  

      var marker = L.marker([x, y]).addTo(map);
      var label = '<b>' + obj.properties.nombre + '</b><br/>' + obj.properties.direccion;
      marker.bindPopup(label);
    });
  });

var popup = L.popup();
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .openOn(map);
}
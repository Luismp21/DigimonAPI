var contenido = document.querySelector("#cardDigimon");
var form = document.querySelector("#form");
var terminoBusqueda = document.querySelector("#buscador");
var nivelDigimon = document.querySelector("#niveles");
var logoInicio = document.querySelector(".logo");

window.addEventListener("load", () => {
  form.addEventListener("submit", validarFormulario);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  var terminoBusquedaValue = document.querySelector("#buscador").value;
  var quitarEspaciosTermino = terminoBusquedaValue.trim();
  if (quitarEspaciosTermino.trim() != "") {
    consultarAPI2(quitarEspaciosTermino);
  }
  return;
});

logoInicio.addEventListener("click", reiniciarPagina);

function reiniciarPagina() {
  consultarAPI();
}

function mostrarNivelDigimon() {
  nivelDigimon.addEventListener("change", () => {
    var nivelDigimonValue = nivelDigimon.value;
    if (nivelDigimonValue == "") {
      consultarAPI();
    } else {
      consultarAPI3(nivelDigimonValue);
    }
  });
}

function consultarAPI() {
  var url = "https://digimon-api.vercel.app/api/digimon";
  fetch(url)
    .then((response) => response.json())
    .then((result) => card(result))
}

function consultarAPI2(nombre) {
  var url = `https://digimon-api.vercel.app/api/digimon/name/${nombre}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => card(result))
    .catch(() => mensajeError("Este digimon no existe!!"));

}

function consultarAPI3(level) {
  var url = `https://digimon-api.vercel.app/api/digimon/level/${level}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => card(result));
}

function validarFormulario(e) {
  e.preventDefault();
  if (terminoBusqueda.value == "") {
    mensajeError("Debe rellenar el campo");
  }
  return;
}

function mensajeError(mensaje) {
  var claseError = document.querySelector(".bg-danger");

  if (!claseError) {
    var tituloDigimon = document.querySelector("#tituloDigimon");
    var error = document.createElement("div");
    error.classList.add(
      "bg-danger",
      "mt-4",
      "mx-auto",
      "col-6",
      "py-2",
      "rounded",
      "text-center"
    );
    error.innerHTML = `
      <span class="font-bold">Error! ${mensaje}</span>
    `;
    tituloDigimon.appendChild(error);

    setTimeout(() => {
      error.remove();
    }, 2000);
  }
}

/* Funcion que crea la card con la info */
function card(result) {
  contenido.innerHTML = "";
  for (datos of result) {
    contenido.innerHTML += `
    <div id="cardDigimon" class="col col-3 mb-5 cardDigimon" data-aos="flip-left">
        <div class="card" >
        <img src="${datos.img}" class="card-img-top" alt="img-digimon" />
            <div class="card-body text-center">
                <h5 class="card-title">${datos.name}</h5>
                <p class="card-text">
                ${datos.level}
                </p>
            </div>
        </div>
    </div>
    `;
  }
}

consultarAPI();
mostrarNivelDigimon();

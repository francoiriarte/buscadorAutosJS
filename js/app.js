//VARIABLES

//parámetros
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//contenedor de resultados
const resultado = document.querySelector("#resultado");

const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

//generamos un objeto con los parámetros de búsqueda
let datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

//EVENTOS
document.addEventListener("DOMContentLoaded", () => {
  //muestra los autos cuando cargamos la página
  mostrarAutos(autos);

  //carga las opciones del filtro año
  llenarYearSelect();
});

marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = e.target.value;
  filtrarAuto();
});

minimo.addEventListener("change", () => {
  datosBusqueda.minimo = minimo.value;
  filtrarAuto();
});

maximo.addEventListener("change", () => {
  datosBusqueda.maximo = maximo.value;
  filtrarAuto();
});

puertas.addEventListener("change", () => {
  datosBusqueda.puertas = puertas.value;
  filtrarAuto();
});

transmision.addEventListener("change", () => {
  datosBusqueda.transmision = transmision.value;
  filtrarAuto();
});

color.addEventListener("change", () => {
  datosBusqueda.color = color.value;
  filtrarAuto();
});

//FUNCIONES
function mostrarAutos(autos) {
  limpiarHTML();

  autos.forEach((auto) => {
    const autoHTML = document.createElement("p");
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;

    autoHTML.textContent = `
    ${marca} ${modelo} - Color: ${color} - ${year} - ${puertas} puertas - ${transmision} - $${precio}
    `;

    resultado.appendChild(autoHTML);
  });
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function llenarYearSelect() {
  for (let i = maxYear; i >= minYear; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
}

function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);
  //console.log(resultado);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    sinResultados();
  }
}

function sinResultados() {
  limpiarHTML();

  const sinResultados = document.createElement("div");
  sinResultados.classList.add("alerta", "error");
  sinResultados.textContent = "No se encontraron coincidencias.";

  resultado.appendChild(sinResultados);
}
//FILTROS

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === parseInt(year);
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;

  if (minimo) {
    return auto.precio >= minimo;
  }

  return auto;
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;

  if (maximo) {
    return auto.precio <= maximo;
  }

  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === parseInt(puertas);
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}

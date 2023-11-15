// Modelo de ejemplo
// https://intro-fe-proyecto-final.adaitw.org/

const raiz = document.getElementById("raiz");
const totalPersonajes = document.getElementById("total-personajes");
let pagina = 1;
let total = 0;

//Filtros
const todos = document.getElementById("todos");
const mujeres = document.getElementById("mujeres");
const hombres = document.getElementById("hombres");
const sinGenero = document.getElementById("sinGenero");
const noSeSabe = document.getElementById("noSeSabe");

//Paginado

const paginaActual = document.getElementById("pagina-actual");
const proximaPagina = document.getElementById("next-page");
const prevPagina = document.getElementById("prev-page");
const totalPaginas = document.getElementById("total-paginas");
const primerPagina = document.getElementById("first-page");
const ultimaPagina = document.getElementById("last-page");

//Le estabamos pasando "Página como argumento de manera incorrecta"
const getData = async () => {
  const URL = `https://rickandmortyapi.com/api/character?page=${pagina}`;
  const response = await fetch(URL);
  const json = await response.json();
  total = json.info.pages;
  paginaActual.innerHTML = pagina;
  totalPaginas.innerHTML = total;
  printData(json.results);
  updatePagination();
  data = json;
  return json;
};
getData(pagina);
let data = {};

const printData = (arr) => {
  let card = "";
  totalPersonajes.innerHTML = arr.length;
  arr.forEach((personaje) => {
    let genero = ""
    if ( personaje.gender==="Female"){
        genero = " Mujer"
    }else if ( personaje.gender==="Male"){
      genero = " Hombre"
    }else if ( personaje.gender==="Genderless"){
      genero = "Sin género"
    }else if ( personaje.gender==="unknowk"){
      genero = " Desconocido"
    }

    let especies = ""
    if ( personaje.species==="Human"){
      especies = " Humano"
    }else if ( personaje.species==="Robot"){
     especies = " Robot"
    }
    else if ( personaje.species==="Alien"){
    especies = " Extranjero"
    }
    else if ( personaje.species==="Humanoid"){
      especies = " Humanoide"
    }
    else if ( personaje.species==="Poopybutthole"){
      especies = " culo de caca"
    }

    let estado = ""
    if ( personaje.status==="unknown"){
      estado = " Desconocido"
    }else if ( personaje.status==="Alive"){
      estado = " Vivo"
    }
    else if ( personaje.status==="Dead"){
      estado = " Muerto"
    }

    let origen = personaje.origin.name
    if ( personaje.origin.name==="unknown"){
      origen = " Desconocido"
    } 


    card =
      card +
      `
        <div class="card">
            
            <div class="card-content">

                <div class="card-img-content">
                <img src=${personaje.image} alt="">
                </div>
                <p>Nombre:${personaje.name}</p>
                <p>Genero:${genero}</p>
                <p>Especies:${especies}</p>
                <p>Estado:${estado}</p>
                <p>Origen:${origen}</p>
                <p>Locacion:${personaje.location.name}</p> 
                <div class="contenedor-button">
                  <input type="button" class= "button" value=" Ver más" />
                </div>
            </div>
        </div>
  
    `;
  });
  raiz.innerHTML = card;
};

const pagination = async (prom) => {
  const result = await prom;
  proximaPagina.addEventListener("click", () => {
    pagina += 1;
    getData();
  });

  prevPagina.addEventListener("click", () => {
    pagina -= 1;
    getData();
  });

  primerPagina.addEventListener("click", () => {
    if (pagina >= 2) {
      pagina = 1;
      getData();
    }
  });
  ultimaPagina.addEventListener("click", () => {
    if (pagina < result.info.pages) {
      pagina = result.info.pages;
      getData();
    }
  });
};

const updatePagination = () => {
  if (pagina <= 1) {
    prevPagina.disabled = true;
    primerPagina.disabled = true;
  } else {
    prevPagina.disabled = false;
    primerPagina.disabled = false;
  }

  if (pagina === total) {
    ultimaPagina.disabled = true;
    proximaPagina.disabled = true;
  } else {
    ultimaPagina.disabled = false;
    proximaPagina.disabled = false;
  }
};

//Filtros
mujeres.addEventListener("click", () => {
  const arr = data.results;
  const arrMujeres = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Female") {
      arrMujeres.push(arr[i]);
    }
  }

  printData(arrMujeres);
});

hombres.addEventListener("click", () => {
  const arr = data.results;
  const arrHombres = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Male") {
      arrHombres.push(arr[i]);
    }
  }
  printData(arrHombres);
});
//Primero: Elemento html
//.addEventListener("evento", ()=>{})
sinGenero.addEventListener("click", () => {
  const arr = data.results;
  const arrSinGenero = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Genderless") {
      arrSinGenero.push(arr[i]);
    }
  }
  printData(arrSinGenero);
});

noSeSabe.addEventListener("click", () => {
  const arr = data.results;
  const arrNoSeSabe = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "unknown") {
      arrNoSeSabe.push(arr[i]);
    }
  }
  printData(arrNoSeSabe);
});

todos.addEventListener("click", () => {
  const arr = data.results;
  printData(arr);
});

pagination(getData());



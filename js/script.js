// URL de la API con los campos necesarios
const API_URL = "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,car";

// Contenedor donde se pintarán los países
const countriesList = document.getElementById("countries-list");

// Función principal
const getCountries = async () => {
try {
    const response = await fetch(API_URL);
    if (!response.ok) {
    throw new Error("Error al obtener los datos");
    }

    const countries = await response.json();

    countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
    );

    renderCountries(countries);

} catch (error) {
    console.error(error);
}
};

// Función para mostrar las tarjetas
const renderCountries = (countries) => {
countries.forEach((country) => {
    const card = document.createElement("div");
    card.classList.add("country-card");

    card.innerHTML = `
    <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
    <h3>${country.name.common}</h3>
    `;

    card.addEventListener("click", () => showDetails(country));

    countriesList.appendChild(card);
});
};

const showDetails = (country) => {
const overlay = document.createElement("div");
overlay.classList.add("overlay");


const modal = document.createElement("div");
modal.classList.add("modal");

modal.innerHTML = `
    <button class="close-btn">X</button>
    <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
    <h2>${country.name.common}</h2>
    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "No disponible"}</p>
    <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Se conduce por:</strong> ${country.car?.side === "right" ? "Derecha" : "Izquierda"}</p>
`;

overlay.appendChild(modal);
document.body.appendChild(overlay);

modal.querySelector(".close-btn").addEventListener("click", () => {
    overlay.remove();
});
};

getCountries();

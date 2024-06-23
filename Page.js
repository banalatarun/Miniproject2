const URL = "https://makemytrip-backend-w2d2.onrender.com/cities";
const parent = document.querySelector(".city_container");
const searchInput = document.querySelector("#city");
let citiesData = [];

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    citiesData = data;
    displayCities(citiesData);
  });

const createCard = (cityData) => {
  const { id, city, description, image } = cityData;
  const card = document.createElement("div");
  card.classList.add("city_card");
  card.innerHTML = `
    <a href="city_details.html?id=${id}" class="city_link">
      <img class="city_img" src="${image}" alt="${city}_city" />
      <div class="city_info">
        <h3 class="city_name">${city}</h3>
        <p class="city_no_of_places">${description}</p>
      </div>
    </a>`;
  return card;
};

const displayCities = (cities) => {
  parent.innerHTML = '';
  if (cities.length === 0) {
    parent.innerHTML = '<p class="no_data_found">No data found</p>';
  } else {
    cities.forEach((cityData) => {
      const card = createCard(cityData);
      parent.appendChild(card);
    });
  }
};

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredCities = citiesData.filter((city) =>
    city.city.toLowerCase().includes(searchTerm)
  );
  displayCities(filteredCities);
});
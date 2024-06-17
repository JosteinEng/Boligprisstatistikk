fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    let dataDiv = document.getElementById("data");
    let citySelectorsDiv = document.getElementById("citySelect");
    let cityDivs = [];
    let citySelectors = [];

    for (let city in data) {
      let cityDiv = createCityDiv(city);
      let citySelector = createCitySelector(city);

      citySelectorsDiv.appendChild(citySelector);
      cityDivs.push(cityDiv);
      citySelectors.push(citySelector);

      citySelector.addEventListener("click", function () {
        handleCitySelectorClick(cityDivs, citySelectors, cityDiv, this);
      });

      let cityData = data[city];
      let avgPriceDiv = createAvgPriceDiv(cityData);
      let changePriceDiv = createChangePriceDiv(cityData);

      cityDiv.appendChild(avgPriceDiv);
      cityDiv.appendChild(changePriceDiv);
      dataDiv.appendChild(cityDiv);
    }
  });

function createCityDiv(city) {
  let cityDiv = document.createElement("div");
  cityDiv.id = city;
  cityDiv.className = "city-div city-div-style";

  let dataSection = document.createElement("div");
  dataSection.className = "data-section";
  dataSection.innerHTML = `<h2 class="city-name-h2"><span class="city-name city-name-style">${city}</span></h2>`;

  let imageSection = document.createElement("div");
  imageSection.className = "image-section";
  imageSection.style.display = "none";

  let cityImage = document.createElement("img");
  cityImage.src = `./images/${city}.jpg`;
  cityImage.alt = city;
  cityImage.className = "city-image";
  imageSection.appendChild(cityImage);

  cityDiv.appendChild(dataSection);
  cityDiv.appendChild(imageSection);

  return cityDiv;
}

function createCitySelector(city) {
  let citySelector = document.createElement("div");
  citySelector.textContent = city;
  citySelector.className = "city-button";

  return citySelector;
}

function handleCitySelectorClick(
  cityDivs,
  citySelectors,
  cityDiv,
  citySelector
) {
  if (citySelector.classList.contains("active")) {
    showAllCityDivs(cityDivs);
    removeAllActive(citySelectors);
  } else {
    hideAllCityDivs(cityDivs);
    removeAllActive(citySelectors);
    showCityDiv(cityDiv);
    citySelector.classList.add("active");
  }
}

function showAllCityDivs(cityDivs) {
  cityDivs.forEach((div) => {
    div.style.display = "";
    div.classList.add("city-div-style");
    div.querySelector(".city-name").classList.add("city-name-style");
    div.querySelector(".avg-price-div p").classList.add("avg-price-style");
    div.querySelector(".image-section").style.display = "none";
    div.querySelector(".change-price-div").style.display = "none";
    div.querySelector(".avg-price-div .avg-kvm-price").style.display = "none";
  });
}

function removeAllActive(citySelectors) {
  citySelectors.forEach((selector) => {
    selector.classList.remove("active");
  });
}

function hideAllCityDivs(cityDivs) {
  cityDivs.forEach((div) => {
    div.style.display = "none";
    div.classList.remove("city-div-style");
    div.querySelector(".city-name").classList.remove("city-name-style");
    div.querySelector(".avg-price-div p").classList.remove("avg-price-style");
  });
}

function showCityDiv(cityDiv) {
  cityDiv.style.display = "";
  cityDiv.querySelector(".image-section").style.display = "";
  cityDiv.querySelector(".change-price-div").style.display = "";
  cityDiv.querySelector(".avg-price-div .avg-kvm-price").style.display = "";
}

function createAvgPriceDiv(cityData) {
  let avgPriceDiv = document.createElement("div");
  avgPriceDiv.className = "avg-price-div";

  let avgPriceP = document.createElement("p");
  avgPriceP.textContent = `Gjennomsnittspris: ${cityData["Gjennomsnittspris"]}`;
  avgPriceP.className = "avg-price-style";
  avgPriceDiv.appendChild(avgPriceP);

  let avgKvmPriceP = document.createElement("p");
  avgKvmPriceP.textContent = `Gjennomsnitt kvm. pris: ${cityData["Gjennomsnitt kvm. pris"]}`;
  avgKvmPriceP.className = "avg-kvm-price";
  avgKvmPriceP.style.display = "none";
  avgPriceDiv.appendChild(avgKvmPriceP);

  return avgPriceDiv;
}

function createChangePriceDiv(cityData) {
  let changePriceDiv = document.createElement("div");
  changePriceDiv.className = "change-price-div";
  changePriceDiv.style.display = "none";

  for (let prop in cityData) {
    if (prop !== "Gjennomsnittspris" && prop !== "Gjennomsnitt kvm. pris") {
      let propP = document.createElement("p");
      propP.textContent = `${prop}: ${cityData[prop]}`;
      changePriceDiv.appendChild(propP);
    }
  }

  return changePriceDiv;
}

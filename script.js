const apiKey = "dd5bda8bf5d7863bdcc910cee20a9cfe";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const cloudIcon = document.querySelector(".cloud");

// Function to check weather for a given city
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.ceil(data.main.temp);
    document.querySelector(".humidity").innerHTML = Math.ceil(data.main.humidity);
    document.querySelector(".wind").innerHTML = Math.ceil(data.wind.speed);
    document.querySelector(".condition").innerHTML = data.weather[0].main;

    if (data.weather[0].main === 'Drizzle') {
        cloudIcon.src = "w4.png";
    } else if (data.weather[0].main === 'Clouds') {
        cloudIcon.src = "w6.png";
    } else if (data.weather[0].main === 'Haze' || data.weather[0].main === 'Mist') {
        cloudIcon.src = "w5.png";
    } else if (data.weather[0].main === 'Rain') {
        cloudIcon.src = "w3.png";
    } else {
        cloudIcon.src = "w1.png";
    }
}

// Event listener for search button
searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});


const cities = ["Delhi", "Mumbai", "Bangalore", "Kolkata"];
const condition = document.querySelector(".condition");

// Function to fetch and display live temperature for cities
async function maincity() {
    for (let cityname of cities) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityname}&appid=${apiKey}`);
        const data = await response.json();

        // Update temperatures
        if (cityname.toLowerCase() === "delhi") {
            document.querySelector(".delhi").innerHTML = Math.ceil(data.main.temp);
            updateConditionIcon(data.weather[0].main, '.condition-delhi');
        } else if (cityname.toLowerCase() === "mumbai") {
            document.querySelector(".mumbai").innerHTML = Math.ceil(data.main.temp);
            updateConditionIcon(data.weather[0].main, '.condition-mumbai');
        } else if (cityname.toLowerCase() === "bangalore") {
            document.querySelector(".bangalore").innerHTML = Math.ceil(data.main.temp);
            updateConditionIcon(data.weather[0].main, '.condition-bangalore');
        } else if (cityname.toLowerCase() === "kolkata") {
            document.querySelector(".kolkata").innerHTML = Math.ceil(data.main.temp);
            updateConditionIcon(data.weather[0].main, '.condition-kolkata');
        }
    }
}

// Function to update the condition image based on weather
function updateConditionIcon(weatherCondition, selector) {
    const conditionElement = document.querySelector(selector);

    if (weatherCondition === 'Clouds') {
        conditionElement.src = "c1.png";
    } else if (weatherCondition === 'Drizzle' || weatherCondition === 'Mist') {
        conditionElement.src = "c2.png";
    } else {
        conditionElement.src = "c3.png";
    }
}

// Call maincity to show temperatures on page load
window.onload = maincity;
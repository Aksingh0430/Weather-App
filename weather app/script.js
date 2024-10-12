const apiKey = "a842ee8c224deb2b751343174c377ad7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const factElement = document.getElementById("weather-fact");
const activityElement = document.getElementById("activity-suggestion");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".facts-activities").style.display = "none";
    } else {
        var data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "weather-app-img/images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "weather-app-img/images/clear.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "weather-app-img/images/mist.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "weather-app-img/images/drizzle.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "weather-app-img/images/rain.png";
        }
        
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".facts-activities").style.display = "block";
        document.querySelector(".error").style.display = "none";
        
        displayWeatherFact(data.weather[0].main);
        displayActivitySuggestion(data.weather[0].main, data.main.temp);
    }
}

function displayWeatherFact(weatherCondition) {
    const facts = {
        Clear: "On a clear day, sunlight takes about 8 minutes to reach Earth from the Sun.",
        Clouds: "Clouds can weigh more than a million pounds!",
        Rain: "The fastest falling raindrops reach speeds of 18 mph.",
        Mist: "Mist is made up of tiny water droplets suspended in the air.",
        Drizzle: "Drizzle drops are smaller than raindrops, typically less than 0.5 mm in diameter.",
        default: "Weather affects our mood and behavior in surprising ways!"
    };
    
    factElement.textContent = facts[weatherCondition] || facts.default;
}

function displayActivitySuggestion(weatherCondition, temperature) {
    const activities = {
        Clear: ["Go for a picnic in the park", "Try outdoor photography", "Stargaze at night"],
        Clouds: ["Fly a kite", "Go for a nature walk", "Visit an outdoor museum"],
        Rain: ["Read a book by the window", "Try indoor rock climbing", "Have a movie marathon"],
        Mist: ["Practice yoga outdoors", "Go for a mysterious photo shoot", "Write a spooky story"],
        Drizzle: ["Visit an art gallery", "Try a new coffee shop", "Start an indoor garden"],
        default: ["Learn a new hobby", "Call a friend", "Reorganize your living space"]
    };
    
    const temperatureActivities = temperature > 25 ? 
        ["Go swimming", "Have an ice cream date"] : 
        ["Bake some cookies", "Have a warm tea tasting session"];
    
    const allActivities = [...(activities[weatherCondition] || activities.default), ...temperatureActivities];
    const randomActivity = allActivities[Math.floor(Math.random() * allActivities.length)];
    
    activityElement.textContent = `Suggested activity: ${randomActivity}`;
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
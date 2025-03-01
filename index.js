const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "7e69ce18924cf21adfa64c8b25f4be59";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city){
        try{
            const weatherData = await getweatherData(city);
            displayweatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
     else {
        displayError("Please enter a city");
     }
});

async function getweatherData(city){
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
   const response = await fetch (apiUrl);
   console.log(response);
   if(!response.ok){
    throw new Error ("could not fetch weather data");
   }

   return await response.json();
}

function displayweatherInfo(data){

const {name: city,
       main: {temp, humidity},
       weather: [{description, id}]} = data;

       card.textContent = "";
       card.style.display = "flex";

       const cityDisplay = document.createElement("h1");
       const tempDisplay = document.createElement("p");
       const humidityDisplay = document.createElement("p");
       const descDisplay = document.createElement("p");
       const weatherEmoji = document.createElement("p");
            
       
       cityDisplay.textContent = city;
       tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
       humidityDisplay.textContent = `Humidity: ${humidity}%`; 
       descDisplay.textContent = description;
       weatherEmoji.textContent = getweatherEmoji(id);
       
       
       
       cityDisplay.classList.add("cityDisplay");
       tempDisplay.classList.add("tempDisplay");
       humidityDisplay.classList.add("humidityDisplay");
       descDisplay.classList.add("descDisplay");
       weatherEmoji.classList.add("weatherEmoji");



       card.appendChild(cityDisplay);
       card.appendChild(tempDisplay);
       card.appendChild(humidityDisplay);
       card.appendChild(descDisplay);
       card.appendChild(weatherEmoji);
       
}

function getweatherEmoji(weatherId){

}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
    
}
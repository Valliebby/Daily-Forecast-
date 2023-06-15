
var textInput = document.getElementById("textInput")
var searchButton = document.getElementById("search-button")
var form = document.getElementById("search-input")
var city = document.getElementById("city")
var weatherIcons = document.getElementsByClassName("weather-icon")
var apiKey = `bf2a607ee6e2ff7fc31a92d7b45282d5`

// Search Button functionality and Api call
searchButton.addEventListener("click", function(e){
  e.preventDefault()
  console.log(textInput.value)
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${textInput.value}&units=imperial&appid=bf2a607ee6e2ff7fc31a92d7b45282d5`)
  .then((response)=> {
    return response.json()})
  .then(data => {
  //  Day card functionality.
    document.getElementById('tempMax').innerHTML = Math.round(data.main.temp_max);
    document.getElementById('tempMin').innerHTML = Math.round(data.main.temp_min);
    document.getElementById('feelsLike').innerHTML = Math.round(data.main.feels_like);
    document.getElementById('wind').innerHTML = Math.round(data.wind.speed);
    document.getElementById('humidity').innerHTML = Math.round(data.main.humidity);
    document.getElementById('precip').innerHTML = Math.round(data.main.pressure);
//   Function for icon's.
    // let weatherIcons = ""
    // data.daily.forEach((day, index) => {
    //    if(index == 0){}
    //    weatherIcons[index].src = "https://openweathermap.org/img/wn/"+ data.weather[0].icon+ "@2x.png"
    //    console.log(day)
    // })
    if (data.weather[0].main == "Clouds"){
      weatherIcons.src = "assets/images/clouds.png";
    }else if(data.weather[0].main == "Clear"){
        weatherIcons.src = "assets/images/clear.png";
    }else if(data.weather[0].main == "Rain"){
        weatherIcons.src = "assets/images/rain.png";
    }else if(data.weather[0].main == "Drizzle"){
      weatherIcons.src = "assets/images/drizzle.png";
    }else if(data.weather[0].main == "Mist"){
      weatherIcons.src = "assets/images/mist.png";
    }

    getWeather(data.coord.lat, data.coord.lon);

  })

})
// Functionality for five day cards.
function getWeather(lat, lon) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&units=imperial&appid=bf2a607ee6e2ff7fc31a92d7b45282d5`
    ).then(response=> response.json())
    .then((data) => {
        console.log(data)
      saveData(data.city.name)
        for(let i = 0; i < data.list.length; i += 8){
          let j = (i / 8)+ 1
          console.log(j)
        let day = document.getElementById(j+`day`)
        day.innerText= new Date (data.list[i].dt*1000).toLocaleDateString()
        let temp = document.getElementById(j+`temp`)
        temp.innerText= Math.round(data.list[i].main.temp)
        let weatherIcons = document.querySelector('.weather'+j+'icon')
        weatherIcons.src = "https://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon+ "@2x.png"
        }
// Functionality for hourly weather
        for(let i = 0; i < 8; i ++ ){
          let j = i + 1
          console.log(j)
        let hour = document.getElementById(j+`hour`)
        hour.innerText= new Date (data.list[i].dt*1000).toLocaleTimeString()
        let temp = document.getElementById(j+'hourTemp')
        temp.innerText= Math.round(data.list[i].main.temp)
        let flTemp = document.getElementById(j+`flTemp`)
        flTemp.innerText= Math.round(data.list[i].main.feels_like)
        let hourWind = document.getElementById(j+`hourWind`)
        hourWind.innerText= Math.round(data.list[i].wind.speed)
        let weatherIcons = document.querySelector('.weather-icon'+j)
        console.log(data.list)
        weatherIcons.src = "https://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon+ "@2x.png"
        }
    })
    .catch(error=>{
        console.log(error)
    })
}

function positionError() {
  alert(
    "There was an error getting your location. Please allow us to use your location and refresh the page."
  )
}
// Function saves the search bar input data into local storage.
function saveData(cityName) {
  const savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || []
  if(!savedSearches.includes(cityName)){
    savedSearches.push(cityName)
    window.localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
    renderCity()
  }

}

// var savedSearch = localStorage.getItem("server");
var renderCityContainer = document.createElement("div");
var renderCityC = document.querySelector('.renderCityC');
function renderCity() {
  renderCityContainer.innerHTML = "";
  for(let i = 0; i < savedSearches.length; i++){
    var button = document.createElement("button");
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'cityButton')
    button.setAttribute("data-search", savedSearches[i]);
    button.textContent = savedSearches[i];
    renderCityContainer.append(button);
  }
  renderCityC.append(renderCityContainer);
}

function cityButtons() {
  var cityNames = localStorage.getItem('savedSearches');
  if (cityNames) {
    savedSearches = JSON.parse(cityNames) 
  }
  renderCity()
}
cityButtons()



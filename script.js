var searchEl = document.querySelector("#citySearch");
var searchBtn = document.querySelector("#searchBtn");
var todayEl = document.querySelector(".today");
var forecastEl = document.querySelector(".forecast");
var citySearch = function() {
    if(searchEl.value === "") {userInput = "New York"; console.log(userInput);}
    else {userInput = searchEl.value; console.log(userInput);}
    fetch('https://api.opencagedata.com/geocode/v1/json?q=' + userInput + '&limit=1&key=e3ed4dc63a1744678741122a7c9565b7').then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                var lat = data.results[0].geometry.lat;
                var lon = data.results[0].geometry.lng;
                var city = data.results[0].components.city;
                CurrentWeather(lat, lon, city);
            })

        }
    })
}
var CurrentWeather = function (lat, lon, cityName) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=138a54be64b6e7e61a21ff1552449359').then(function(response) {
        if(response.ok) {
            response.json()
            .then(function(data) {
                var city = cityName;
                var temp = data.current.temp;
                var humidity = data.current.humidity;
                var windSpeed = data.current.wind_speed;
                var uvIndex = data.current.uvi;
                var forecastData = data.daily;
                displayToday(city, temp, humidity, windSpeed, uvIndex);
                forecast(forecastData);
            })
        }
        else {
            console.log("Error!");
        }
    });
}
var displayToday = function(city, temp, humidity, windSpeed, uvIndex) {
    document.querySelector('#todayCity').textContent = city;
    document.querySelector('#todayTemp').textContent = 'Temperature: ' + temp;
    document.querySelector('#todayHumidity').textContent = 'Humidity: ' + humidity + '%';
    document.querySelector('#todayWindSpeed').textContent = 'Wind speed: ' + windSpeed + 'MPH';
    document.querySelector('#todayUV').textContent = 'UV Index: ' + uvIndex;
}
var forecast = function(data) {
    
}
displayToday();
searchBtn.addEventListener("click", citySearch);
citySearch();
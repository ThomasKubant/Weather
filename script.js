var searchEl = document.querySelector("#citySearch");
var searchBtn = document.querySelector("#searchBtn");
var todayEl = document.querySelector(".today");
var forecastEl = document.querySelector(".forecast");
var cityHistory = JSON.parse(localStorage.getItem("history"));
if(cityHistory.length <= 0) {cityHistory = []}
var initialize = function() {
    fetch('https://api.opencagedata.com/geocode/v1/json?q=New+York&limit=1&key=e3ed4dc63a1744678741122a7c9565b7').then(function(response){
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
var citySearch = function() {
    if(searchEl.value === "") {initialize(); return}
    else {userInput = searchEl.value;}
    fetch('https://api.opencagedata.com/geocode/v1/json?q=' + userInput + '&limit=1&key=e3ed4dc63a1744678741122a7c9565b7').then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                var lat = data.results[0].geometry.lat;
                var lon = data.results[0].geometry.lng;
                var city = data.results[0].components.city;
                if(city == null) {
                    city = data.results[0].components.village;
                }
                if(city == null) {
                    city = data.results[0].components.town;
                }
                if(city == null) {
                    city = data.results[0].components.country;
                }
                console.log(city);
                CurrentWeather(lat, lon, city);
                addSearchHistory(city);
            })

        }
    })
}
var citySearchNoAdd = function(city) {
    userInput = city;
    fetch('https://api.opencagedata.com/geocode/v1/json?q=' + userInput + '&limit=1&key=e3ed4dc63a1744678741122a7c9565b7').then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                var lat = data.results[0].geometry.lat;
                var lon = data.results[0].geometry.lng;
                var city = data.results[0].components.city;
                if(city == null) {
                    city = data.results[0].components.village;
                }
                if(city == null) {
                    city = data.results[0].components.town;
                }
                if(city == null) {
                    city = data.results[0].components.country;
                }
                console.log(city);
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
    var temp0 = data[0].temp.day;
    var temp1 = data[1].temp.day;
    var temp2 = data[2].temp.day;
    var temp3 = data[3].temp.day;
    var temp4 = data[4].temp.day;
    var humidity0 = data[0].humidity;
    var humidity1 = data[1].humidity;
    var humidity2 = data[2].humidity;
    var humidity3 = data[3].humidity;
    var humidity4 = data[4].humidity;
    document.getElementById('temp0').textContent = 'Temperature: ' + temp0;
    document.getElementById('temp1').textContent = 'Temperature: ' + temp1;
    document.getElementById('temp2').textContent = 'Temperature: ' + temp2;
    document.getElementById('temp3').textContent = 'Temperature: ' + temp3;
    document.getElementById('temp4').textContent = 'Temperature: ' + temp4;
    document.getElementById('humidity0').textContent = 'Humidity: ' + humidity0 + '%';
    document.getElementById('humidity1').textContent = 'Humidity: ' + humidity1 + '%';
    document.getElementById('humidity2').textContent = 'Humidity: ' + humidity2 + '%';
    document.getElementById('humidity3').textContent = 'Humidity: ' + humidity3 + '%';
    document.getElementById('humidity4').textContent = 'Humidity: ' + humidity4 + '%';
}
var addSearchHistory = function(city) {
    cityHistory.push(city);
    localStorage.setItem('history', JSON.stringify(cityHistory));
    displaySearchHistory();
}
var displaySearchHistory = function() {
    var history = JSON.parse(localStorage.getItem('history'));
    console.log(history);
    document.getElementById('cityList').innerHTML = "";
    do {history.splice(0,1)} while(history.length>10)
    for(i=0;i<history.length;i++) {
        var newCity = document.createElement("LI");
        newCity.className = "card searchItem";
        newCity.innerText = history[i];
        document.getElementById('cityList').appendChild(newCity);
        localStorage.setItem('history', JSON.stringify(cityHistory));
    }
}
var historyClick = function() {
    console.log('7');
}
searchBtn.addEventListener("click", citySearch);
citySearch();
displaySearchHistory();
document.getElementById('cityList').onclick = function(event) {
    var target = event.target;
    var text = target.textContent;
    citySearchNoAdd(text);
    console.log(target);
}
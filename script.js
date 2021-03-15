var searchEl = document.querySelector("#citySearch");
var searchBtn = document.querySelector("#searchBtn");
var todayEl = document.querySelector(".today");
var forecastEl = document.querySelector(".forecast");
var cityHistory = JSON.parse(localStorage.getItem("history"));
if(cityHistory == null) {cityHistory=[]}
var todayDate = dayjs().format("MM/DD/YYYY");
console.log(todayDate);
if(cityHistory.length <= 0) {cityHistory = []}
var initialize = function() {
    var city = JSON.parse(localStorage.getItem("history"));
    if(city == null) {city=[]}
    if (city.length != 0) {
        var search = city[city.length - 1];
    }
    else {search = "New York"}
    console.log(search);

    fetch('https://api.opencagedata.com/geocode/v1/json?q='+search+'&limit=1&key=e3ed4dc63a1744678741122a7c9565b7').then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
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
                console.log(data);
                var city = cityName;
                var temp = data.current.temp;
                var humidity = data.current.humidity;
                var windSpeed = data.current.wind_speed;
                var uvIndex = data.current.uvi;
                var icon = data.current.weather[0].icon;
                document.getElementById('todayIcon').src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
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
    var uvEl = document.querySelector('#todayUV');
    uvEl.innerHTML = 'UV Index: ' + "<span id = 'uvIndex'>" + uvIndex + "</span>";
    var uvNumberEl = document.querySelector('#uvIndex');
    if(uvIndex < 3) {
        uvNumberEl.className = "green";
    }
    else if (uvIndex < 6) {
        uvNumberEl.className = "yellow";
    }
    else if (uvIndex < 9) {
        uvNumberEl.className = "orange";
    }
    else if (uvIndex < 12) {
        uvNumberEl.className = "red";
    }
}    
var forecast = function(data) {
    console.log(data);
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
    var icon0 = data[0].weather[0].icon;
    var icon1 = data[1].weather[0].icon;
    var icon2 = data[2].weather[0].icon;
    var icon3 = data[3].weather[0].icon;
    var icon4 = data[4].weather[0].icon;
    console.log(icon2);
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
    document.getElementById('day1Icon').src = "http://openweathermap.org/img/wn/" + icon0 + "@2x.png";
    document.getElementById('day2Icon').src = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png";
    document.getElementById('day3Icon').src = "http://openweathermap.org/img/wn/" + icon2 + "@2x.png";
    document.getElementById('day4Icon').src = "http://openweathermap.org/img/wn/" + icon3 + "@2x.png";
    document.getElementById('day5Icon').src = "http://openweathermap.org/img/wn/" + icon4 + "@2x.png";
}
var addSearchHistory = function(city) {
    cityHistory.push(city);
    localStorage.setItem('history', JSON.stringify(cityHistory));
    displaySearchHistory();
}
var displaySearchHistory = function() {
    var history = JSON.parse(localStorage.getItem('history'));
    console.log(history);
    if(history == null) {history=[]}
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
initialize();
displaySearchHistory();
document.getElementById('cityList').onclick = function(event) {
    var target = event.target;
    var text = target.textContent;
    citySearchNoAdd(text);
    console.log(target);
}
document.getElementById('todayDate').textContent = todayDate;
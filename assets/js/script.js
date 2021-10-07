var userInputValue = $('#userInput').attr('value');

var {lat} = location;
var {lon} = location;
var apiBaseUrl = 'https://api.openweathermap.org/';

function getCoords(cityName){
    console.log(cityName);
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ef394b3dac59c5d80dbb39281ef08319`;
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        lat = data.coord.lat;
        lon = data.coord.lon;
        console.log(lon) 
        console.log(lat)
        getWeather();
    });
}

function getWeather(){
    var requestUrl = `${apiBaseUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=ef394b3dac59c5d80dbb39281ef08319`
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });
}

$(document).ready(function() {
    $("#userInput").on('keyup', function (event) {
        if (event.keyCode === 13) {
            console.log("Enter key pressed!!!!!");
            var cityName = $("#userInput").val();
            getCoords(cityName)
        }
    });
})
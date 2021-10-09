var userInputValue = $('#userInput').attr('value');
var {lat} = location;
var {lon} = location;
var uvIndex = $("#uvIndex");
var cityList =[];
var apiBaseUrl = 'https://api.openweathermap.org/';

function getCoords(cityName){
    console.log(cityName);
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=ef394b3dac59c5d80dbb39281ef08319`;
    fetch(requestUrl)

    .then(function(response){
        return response.json();
    })

    .then(function(data){
        console.log(data)
        lat = data.coord.lat;
        lon = data.coord.lon;

        $("#cityname").html(data["name"]+moment(data.dt,"X").format("( MM/DD/YYYY )") +"<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'/>");
        $("#temp").text("Temp: " + data["main"].temp + " F");
        $("#wind").text("Wind: " + data["wind"].speed + " mph");
        $("#humidity").text("humidity: " + data["main"].humidity+ " %");

        getWeather();
    });
}

function getWeather(){
    var requestUrl = `${apiBaseUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=ef394b3dac59c5d80dbb39281ef08319`;
    fetch(requestUrl)
    .then(function(response){
        return response.json();
        
    })
    .then(function(data) {
        for(var i=0; i<5; i++){
            $("#date"+i).html(moment(data.daily[i].dt,"X").format("( MM/DD/YYYY )") +"<img src='http://openweathermap.org/img/w/"+data.daily[i].weather[0].icon+".png'/>");
            $("#temp"+i).text("Temp: " + data.daily[i].temp.day + " F");
            $("#wind"+i).text("Wind: " + data.daily[i].wind_speed + " mph");
            $("#humidity"+i).text("humidity: " + data.daily[i].humidity+ " %");
        }
    })
}

function appendCurrentCity(city) {
    
    if(!cityList.includes(city)){
    cityList.push(city);
    localStorage.setItem("previousCities",  JSON.stringify(cityList));
    }

    $('#cityList').empty();
      var cityName= JSON.parse(localStorage.getItem("previousCities"));
      for(var i=0;i<cityName.length;i++){
      $("#cityList").append(`<li class="btn btn-block btn-warning">${cityName[i]} </li>`);
    }
}

$(document).ready(function() {
    $("#userInput").on('keyup', function (event) {
        if (event.keyCode === 13) {
            var cityName = $("#userInput").val();
            getCoords(cityName);
            appendCurrentCity(cityName);
        }
    });
})
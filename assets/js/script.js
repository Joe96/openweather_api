var cityName = "Boston";
var {lat} = location;
var {lon} = location;
var apiBaseUrl = 'https://api.openweathermap.org/'
var searchBtn = $('#searchBtn')

function getCoords(){
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ef394b3dac59c5d80dbb39281ef08319`
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
        console.log(data)
    });
}
searchBtn.on('click',function(event){
    event.preventDefault()
    console.log('yes')
})
getCoords();
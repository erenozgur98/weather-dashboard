var appKey = 'f5a995b6c91b38f43995a9612e396b90';

function firstFetch() {
    var city = $('#input').val();
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + appKey + '&units=imperial')

    .then(function(response) {
        return response.json();
    })
    .then (function(data) {
        console.log(data);
        var cityEl = $('#cityName');
        var tempEl = $('#temperature');
        var humidEl = $('#humidity');
        var windEl = $('#windSpeed');
        var icon = data.weather[0].icon;
        var iconURL = 'http://openweathermap.org/img/w/' + icon + '.png';
        $('#icon').attr('src', iconURL);
        cityEl.text(data.name + moment().format(" M/D/YYYY"));
        tempEl.text(parseInt(data.main.temp) + " F");
        humidEl.text(parseInt(data.main.humidity) + " %");
        windEl.text(data.wind.speed + " MPH");
        var ln = data.coord.lon;
        var lt = data.coord.lat;

        uvIndex(ln, lt);
    })
}

function uvIndex(ln,lt) {
    fetch('https://api.openweathermap.org/data/2.5/uvi?&lat=' + lt + '&lon=' + ln + '&appid=' + appKey)

    .then(function(response) {
        return response.json();
    })
    .then (function(data) {
        console.log(data)
        var uvValue = $('#uvIndex');
        uvValue.text(data.value);
    });
}


$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    firstFetch();
});
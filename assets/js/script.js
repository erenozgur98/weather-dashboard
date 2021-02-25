var appKey = 'f5a995b6c91b38f43995a9612e396b90';
var city = $('#cityEl');
var loadCity = JSON.parse(localStorage.getItem('city'));

if (loadCity !== null) {
    for (var i = 0; i < loadCity.length; i++) {
        var cityButtons = $('<button>');
        cityButtons.text(loadCity[i].toUpperCase());
        cityButtons.attr('class', 'btn col-12 border border-dark rounded m-1');
        $('#list').append(cityButtons);
    }
}

function firstFetch() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city.val() + '&appid=' + appKey + '&units=imperial')

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
        tempEl.text(parseInt(data.main.temp) + " °F");
        humidEl.text(parseInt(data.main.humidity) + " %");
        windEl.text(data.wind.speed + " MPH");
        var lt = data.coord.lat;
        var ln = data.coord.lon;
        uvIndex(lt, ln);

        var savedCity = [];
        if(data.cod === 200) {
            savedCity = JSON.parse(localStorage.getItem('city'));
            if(savedCity === null) {
                savedCity = [];
                savedCity.push(city.val());
                localStorage.setItem('city', JSON.stringify(savedCity));
            } else {
                savedCity.push(city.val());
                localStorage.setItem('city', JSON.stringify(savedCity));
            }
        }
    })
}

function uvIndex(lt, ln) {
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

function forecast() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city.val() + '&appid=' + appKey + '&units=imperial')

    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var day1 = $('#day1');
        day1.text(moment().add(1, 'd').format('MM/DD/YYYY'));
        var temp1 = $('#temperature1');
        temp1.text(data.list[2].main.temp + ' °F');
        var humid1 = $('#humid1');
        humid1.text(data.list[2].main.humidity + ' %');
        var day2 = $('#day2');
        day2.text(moment().add(2, 'd').format('MM/DD/YYYY'));
        var temp2 = $('#temperature2');
        temp2.text(data.list[10].main.temp + ' °F');
        var humid2 = $('#humid2');
        humid2.text(data.list[10].main.humidity + ' %');
        var day3 = $('#day3');
        day3.text(moment().add(3, 'd').format('MM/DD/YYYY'));
        var temp3 = $('#temperature3');
        temp3.text(data.list[18].main.temp + ' °F');
        var humid3 = $('#humid3');
        humid3.text(data.list[18].main.humidity + ' %');
        var day4 = $('#day4');
        day4.text(moment().add(4, 'd').format('MM/DD/YYYY'));
        var temp4 = $('#temperature4');
        temp4.text(data.list[26].main.temp + ' °F');
        var humid4 = $('#humid4');
        humid4.text(data.list[26].main.humidity + ' %');
        var day5 = $('#day5');
        day5.text(moment().add(5, 'd').format('MM/DD/YYYY'));
        var temp5 = $('#temperature5');
        temp5.text(data.list[34].main.temp + ' °F');
        var humid5 = $('#humid5');
        humid5.text(data.list[34].main.humidity + ' %');
    })
}


$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    firstFetch();
    forecast();
});
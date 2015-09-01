"use strict";

function WeatherApp()
{
    var weatherWidget = new WeatherWidget($("#weather-widget")),
        version = "8.1";
    
    function getCurrentWeather()
    {
        $("#weather-widget").fadeIn();
        weatherWidget.update();
    }
    
    this.start = function()
    {
        $("#app>header").append(version);
        $("#getWeather").click(getCurrentWeather);
    }
}

$(function()
{
    window.app = new WeatherApp();
    window.app.start();
});
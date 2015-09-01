"use strict";

function WeatherApp()
{
    var weatherWidget = new WeatherWidget($("#weather-widget"), "YourAPIKey"),
        version = "8.3";
        
    function getLocation()
    {
        if (navigator.geolocation)
        {
            // Use geolocation to get current position
            navigator.geolocation.getCurrentPosition(function(position)
            {
                $("#latitude").val(position.coords.latitude);
                $("#longitude").val(position.coords.longitude);
            },
            function(error)
            {
                $("#controls .error")
                    .text("ERROR: " + error.message)
                    .slideDown();
            });
        }
    }
        
    function getCurrentWeather()
    {
        var lat = $("#latitude").val();
        var lon = $("#longitude").val();
        if (lat && lon)
        {
            $("#weather-widget").fadeIn();
            weatherWidget.update(lat, lon);
        }
    }
    
    this.start = function()
    {
        $("#app>header").append(version);
        $("#getWeather").click(getCurrentWeather);
        getLocation();
    }
}

$(function()
{
    window.app = new WeatherApp();
    window.app.start();
});
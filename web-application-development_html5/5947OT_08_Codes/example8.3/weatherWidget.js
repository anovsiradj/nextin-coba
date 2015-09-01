function WeatherWidget($widget, wuKey)
{
    "use strict";

    this.update = function(lat, lon)
    {
        $(".results", $widget).hide();
        $(".loading", $widget).show();
        getWeatherReport(lat, lon);
    };

    function getWeatherReport(lat, lon)
    {
        var coords = lat + "," + lon;
        $.ajax({
            url: "http://api.wunderground.com/api/" + wuKey + "/conditions/q/" + coords + ".json", 
            dataType : "jsonp"
        })
        .done(function(data) { populateWeather(data); })
        .fail(function(jqXHR, textStatus, errorThrown) { showError(errorThrown); });
    }
    
    function populateWeather(data)
    {
        var observation = data.current_observation;
        
        $(".results header img", $widget).attr("src", observation.icon_url);
        $(".location>span", $widget).text(observation.display_location.full);
        
        $(".conditions>span").each(function(i, e)
        {
            var $span = $(this);
            var field = $span.data("field");
            $(this).text(observation[field]);
        });
        
        // Comply with terms of service
        $(".results footer img", $widget).attr("src", observation.image.url);
        
        $(".loading", $widget).fadeOut(function ()
        {
            $(".results", $widget).fadeIn();
        });
    }
    
    function showError(msg)
    {
        $(".error>span", $widget).text(msg);
        $(".loading", $widget).fadeOut(function ()
        {
            $(".error", $widget).fadeIn();
        });
    }
}

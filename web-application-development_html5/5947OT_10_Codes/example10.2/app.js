"use strict";

function AppCacheApp()
{
    var version = "10.2.01";

    function setStatus(message)
    {
        $("#app footer").text(message);
    }
    
    function checkIfUpdateAvailable()
    {
        window.applicationCache.addEventListener('updateready', function(e)
        {
            setStatus("A newer version is available. Reload the page to update.");
        });
    }
    
    this.start = function()
    {
        $("#app header").append(version);
        setStatus("ready");
        checkIfUpdateAvailable();
    };
}

$(function()
{
    window.app = new AppCacheApp();
    window.app.start();
});
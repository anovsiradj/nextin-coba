"use strict";

function WebWorkerApp()
{
    var version = "9.1";
    
    function executeWorker()
    {
        var name = $("#your-name").val();
        var worker = new Worker("helloWorker.js");
        worker.addEventListener("message", function(event) {
            $("#response").fadeIn()
                .children("span").text(event.data);
        });
        worker.postMessage(name);
    }
    
    this.start = function()
    {
        $("#app header").append(version);
        if (window.Worker)
        {
            $("#submit").click(executeWorker);
        }
        else
        {
            $("#input").hide();
            $("#response").text("Web workers not supported").show();
        }
    };
}

$(function()
{
    window.app = new WebWorkerApp();
    window.app.start();
});
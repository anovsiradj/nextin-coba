"use strict";

function MandebrotApp()
{
    var version = "9.2",
        canvas = $("canvas")[0],
        context = canvas.getContext("2d");

    function setStatus(message)
    {
        $("#app footer").text(message);
    }
    
    function drawMandelbrot(left, top, right, bottom)
    {
        setStatus("Drawing...");
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var generator = new MandelbrotGenerator(canvas.width, canvas.height, left, top, right, bottom);
        generator.draw(imageData);
        context.putImageData(imageData, 0, 0)
        setStatus("Finished.");
    }
    
    this.start = function()
    {
        $("#app header").append(version);
        
        $("button.draw").click(function() {
            var data = $(this).data("settings");
            drawMandelbrot(data[0], data[1], data[2], data[3]);
        });
        
        setStatus("ready");
    };
}

$(function()
{
    window.app = new MandebrotApp();
    window.app.start();
});
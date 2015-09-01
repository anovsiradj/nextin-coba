"use strict";

function MandebrotApp()
{
    var version = "9.3",
        canvas = $("canvas")[0],
        context = canvas.getContext("2d"),
        worker = null;

    function setStatus(message)
    {
        $("#app footer").text(message);
    }
    
    function stopWorker()
    {
        if (worker)
        {
            worker.terminate();
            worker = null;
            setStatus("Stopped.");
        }
    }
    
    function drawMandelbrot(left, top, right, bottom)
    {
        // Make sure we're not already working
        if (worker) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        setStatus("Drawing...");

        var useWorker = $("#use-worker").is(":checked");
        if (useWorker)
        {
            startWorker(left, top, right, bottom);
        }
        else
        {
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            var generator = new MandelbrotGenerator(canvas.width, canvas.height, left, top, right, bottom);
            generator.draw(imageData);
            context.putImageData(imageData, 0, 0)
            setStatus("Finished.");
        }
    }
    
    function startWorker(left, top, right, bottom)
    {
        worker = new Worker("mandelbrotWorker.js");
        worker.addEventListener("message", function(e)
        {
            // Draw the imageData returned from the worker
            context.putImageData(e.data, 0, 0)
            worker = null;
            setStatus("Finished.");
        });
        
        // Start the drawing process
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        worker.postMessage({
            imageData: imageData,
            width: canvas.width,
            height: canvas.height,
            left: left,
            top: top,
            right: right,
            bottom: bottom
        });
    }
    
    this.start = function()
    {
        $("#app header").append(version);
        
        $("button.draw").click(function() {
            var data = $(this).data("settings");
            drawMandelbrot(data[0], data[1], data[2], data[3]);
        });
        $("#stop").click(stopWorker);
        
        if (!window.Worker)
        {
            $("#use-worker").hide().removeAttr("checked");
            $("label[for=use-worker]").text("Web workers not supported by this browser.");
        }
        
        setStatus("ready");
    };
}

$(function()
{
    window.app = new MandebrotApp();
    window.app.start();
});
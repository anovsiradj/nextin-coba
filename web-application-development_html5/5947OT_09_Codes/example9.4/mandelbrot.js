"use strict";

function MandebrotApp()
{
    var version = "9.4",
        canvas = $("canvas")[0],
        context = canvas.getContext("2d"),
        worker = null,
        chunkSize = 10,
        chunkPos = 0,
        settings = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };

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

        settings.left = left;
        settings.top = top;
        settings.right = right;
        settings.bottom = bottom;

        context.clearRect(0, 0, canvas.width, canvas.height);
        setStatus("Drawing...");

        var useWorker = $("#use-worker").is(":checked");
        if (useWorker)
        {
            startWorker();
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
    
    function startWorker()
    {
        worker = new Worker("mandelbrotWorker.js");
        worker.addEventListener("message", function(e)
        {
            if (e.data.type == "log")
            {
                console.log(e.data.message);
            }
            else
            {
                // Draw the imageData returned from the worker
                drawChunk(e.data);
            }
        });
        worker.addEventListener("error", function(e)
        {
            alert("Error in worker: " + e.filename + ", line:" + e.lineno + ", " + e.message);
        });
        
        // Start the drawing process by getting the first chunk
        chunkPos = 0;
        getChunk();
    }
    
    function getChunk()
    {
        // Get a slice of the canvas to draw on
        var imageData = context.getImageData(0, chunkPos, canvas.width, chunkSize);
        // Convert pixels to mandelbrot coordinates
        var scalarY = (settings.bottom - settings.top) / canvas.height
        var mTop = settings.top + chunkPos * scalarY;
        var mBottom = mTop + chunkSize * scalarY;
        
        // Send image data and parameters to the worker to draw the chunk
        worker.postMessage({
            imageData: imageData,
            width: canvas.width,
            height: chunkSize,
            left: settings.left,
            top: mTop,
            right: settings.right,
            bottom: mBottom
        });
    }
    
    function drawChunk(imageData)
    {
        // Draw the computed chunk to the canvas
        context.putImageData(imageData, 0, chunkPos)
        setStatus("Drawing " + parseInt(chunkPos / canvas.height * 100) + "%");
        // Move to next chunk
        chunkPos += chunkSize;
        if (chunkPos < canvas.height)
        {
            // Get the next chunk
            getChunk();
        }
        else
        {
            worker.terminate();
            worker = null;
            setStatus("Finished.");
        }
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
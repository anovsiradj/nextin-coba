"use strict";

function CanvasPadApp()
{
    var version = "4.1",
        canvas2d = new Canvas2D($("#main>canvas")),
        drawing = false,
        points = [],
        actions = [];

    function showCoordinates(point)
    {
        $("#coords").text(point.x + ", " + point.y);
    }

    function onMouseDown(e)
    {
        // This will keep the cursor from changing
        e.preventDefault();
        penDown(e.pageX, e.pageY);
    }
    function penDown(pageX, pageY)
    {
        drawing = true;
        points = [];
        points.push(canvas2d.getCanvasPoint(pageX, pageY));
        actions.push(points);
    }

    function onMouseMove(e)
    {
        penMoved(e.pageX, e.pageY);
    }
    function penMoved(pageX, pageY)
    {
        var canvasPoint = canvas2d.getCanvasPoint(pageX, pageY);
        showCoordinates(canvasPoint);
        
        if (drawing)
        {
            points.push(canvasPoint);
            redraw();
        }
    }

    function onMouseUp(e)
    {
        penUp();
    }
    function penUp()
    {
        if (drawing)
        {
            drawing = false;
        }
    }

    function redraw()
    {
        canvas2d.clear();
        for (var i in actions)
        {
            canvas2d.drawPoints(actions[i]);
        }
    }
    
    this.start = function()
    {
        $("#app header").append(version);

        $("#main>canvas").mousemove(onMouseMove)
            .mousedown(onMouseDown)
            .mouseup(onMouseUp)
            .mouseout(onMouseUp);
    };
}

$(function()
{
    window.app = new CanvasPadApp();
    window.app.start();
});
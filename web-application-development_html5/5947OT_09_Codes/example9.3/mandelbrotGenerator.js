function MandelbrotGenerator(canvasWidth, canvasHeight, left, top, right, bottom)
{
    "use strict";
    var scalarX = (right - left) / canvasWidth,
        scalarY = (bottom - top) / canvasHeight,
        maxIterations = 2000,
        abort = false,
        inSetColor = { r: 0x00, g: 0x00, b: 0x00 },
        colors = [
            { r: 0x00, g: 0x00, b: 0x88 },
            { r: 0x00, g: 0x00, b: 0x99 },
            { r: 0x00, g: 0x00, b: 0xaa },
            { r: 0x00, g: 0x00, b: 0xbb },
            { r: 0x00, g: 0x00, b: 0xcc },
            { r: 0x00, g: 0x00, b: 0xdd },
            { r: 0x00, g: 0x00, b: 0xee },
            { r: 0x00, g: 0x00, b: 0xff },
            { r: 0x00, g: 0x00, b: 0xee },
            { r: 0x00, g: 0x00, b: 0xdd },
            { r: 0x00, g: 0x00, b: 0xcc },
            { r: 0x00, g: 0x00, b: 0xbb },
            { r: 0x00, g: 0x00, b: 0xaa },
            { r: 0x00, g: 0x00, b: 0x99 }
        ];

    this.draw = function(imageData)
    {
        abort = false;
        
        for (var y = 0; y < canvasHeight; y++)
        {
            var my = getMandelbrotY(y);
            for (var x = 0; x < canvasWidth; x++)
            {
                if (abort) return;
                var mx = getMandelbrotX(x);
                var iteration = getIterations(mx, my);
                var color = getColor(iteration);
                setPixel(imageData, x, y, color);
            }
        }
    };
    
    this.stop = function()
    {
        abort = true;
    }

    function getColor(iteration)
    {
        // Check if it's in the mandelbrot set
        if (iteration < 0) return inSetColor;
        // Not in set, get color based on iteration
        return colors[iteration % colors.length];
    }

    function getIterations(x0, y0)
    {
        var x = 0,
            y = 0,
            iteration = 0;

        do
        {
            iteration++;
            if (iteration >= maxIterations) return -1;
            var xtemp = x * x - y * y + x0;
            y = 2 * x * y + y0;
            x = xtemp;
        }
        while (x * x + y * y < 4);

        return iteration;
    }

    function setPixel(imageData, x, y, color)
    {
        var d = imageData.data;
        var index = 4 * (canvasWidth * y + x);
        d[index] = color.r;
        d[index + 1] = color.g;
        d[index + 2] = color.b;
        d[index + 3] = 255; // opacity
    }

    function getMandelbrotX(x)
    {
        // Convert canvas coordinate to mandelbrot
        return scalarX * x + left;
    }

    function getMandelbrotY(y)
    {
        // Convert canvas coordinate to mandelbrot
        return scalarY * y + top;
    }
}

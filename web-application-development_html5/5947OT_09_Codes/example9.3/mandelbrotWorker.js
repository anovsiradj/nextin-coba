"use strict";
importScripts("mandelbrotGenerator.js");

self.addEventListener("message", function(e)
{
    var data = e.data;
    var generator = new MandelbrotGenerator(data.width, data.height, data.left, data.top, data.right, data.bottom);
    generator.draw(data.imageData);
    self.postMessage(data.imageData);
    self.close();
});

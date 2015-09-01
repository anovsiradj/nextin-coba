importScripts("mandelbrotGenerator.js");

var generator;

self.addEventListener("message", function(e)
{
    var data = e.data;
    console.log("Drawing: " + data.left + "," + data.top + "," + data.right + "," + data.bottom);
    generator = new MandelbrotGenerator(data.width, data.height, data.left, data.top, data.right, data.bottom);
    generator.draw(data.imageData);
    self.postMessage(data.imageData);
});

var console = {
    log: function(msg)
    {
        self.postMessage({
            type: "log",
            message: msg
        });
    }
};

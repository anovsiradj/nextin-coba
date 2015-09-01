"use strict";

self.addEventListener("message", function(event) {
    sayHello(event.data);
});

function sayHello(name)
{
    self.postMessage("Hello, " + name);
}

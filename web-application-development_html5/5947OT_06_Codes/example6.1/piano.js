"use strict";

function PianoApp()
{
    var version = "6.1",
        audioManager = new AudioManager("audio");

    function setStatus(message)
    {
        $("#app footer").text(message);
    }
    
    function loadAudio()
    {
        var count = 0,
            loaded = 0,
            error = false;
        
        $(".keyboard .piano-key").each(function()
        {
            count++;
            var noteName = escape($(this).data("note"));
            audioManager.getAudio(noteName,
                function()
                {
                    if (error) return;
                    if (++loaded == count) setStatus("Ready.");
                    else setStatus("Loading " + Math.floor(100 * loaded / count) + "%");
                },
                function(audio)
                {
                    error = true;
                    setStatus("Error loading: " + audio.src);
                }
            );
        });
    }
    
    function initKeyboard()
    {
        var $keys = $(".keyboard .piano-key");
        if ($.isTouchSupported)
        {
            $keys.touchstart(function(e) {
                e.stopPropagation();
                e.preventDefault();
                keyDown($(this));
            })
            .touchend(function() { keyUp($(this)); })
        }
        else
        {
            $keys.mousedown(function() {
                keyDown($(this));
                return false;
            })
            .mouseup(function() { keyUp($(this)); })
            .mouseleave(function() { keyUp($(this)); });
        }
    }
    
    function keyDown($key)
    {
        if (!$key.hasClass("down"))
        {
            $key.addClass("down");
            var noteName = $key.data("note");
            var audio = audioManager.getAudio(escape(noteName));
            audio.currentTime = 0;
            audio.play();
        }
    }
    
    function keyUp($key)
    {
        $key.removeClass("down");
    }
    
    this.start = function()
    {
        $("#app header").append(version);
        setStatus("Loading...");
        
        loadAudio();
        initKeyboard();
    };
}

$(function()
{
    window.app = new PianoApp();
    window.app.start();
});
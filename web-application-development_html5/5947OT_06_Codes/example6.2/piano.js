"use strict";

function PianoApp()
{
    var version = "6.2",
        audioManager = new AudioManager("audio"),
        keyCodesToNotes = {};

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

        // Create mapping of key codes to notes
        $keys.each(function() {
            var $key = $(this);
            var keyCode = keyCodes[$key.data("keycode")];
            keyCodesToNotes[keyCode] = $key.data("note");
        });
    }
    
    function keyDown($key)
    {
        // Make sure it's not already pressed
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
    
    function onKeyDown(e)
    {
        var note = keyCodesToNotes[e.which];
        if (note)
        {
            pressPianoKey(note);
        }
    }
    
    function onKeyUp(e)
    {
        var note = keyCodesToNotes[e.which];
        if (note)
        {
            releasePianoKey(note);
        }
    }
    
    function pressPianoKey(note)
    {
        var $key = getPianoKeyElement(note);
        keyDown($key);
    }
    
    function releasePianoKey(note)
    {
        var $key = getPianoKeyElement(note);
        keyUp($key);
    }

    function getPianoKeyElement(note)
    {
        return $(".keyboard .piano-key[data-note=" + note + "]");
    }
    
    this.start = function()
    {
        $("#app header").append(version);
        setStatus("Loading...");
        
        loadAudio();
        initKeyboard();

        $(document).keydown(onKeyDown)
                   .keyup(onKeyUp);
    };
}

$(function()
{
    window.app = new PianoApp();
    window.app.start();
});
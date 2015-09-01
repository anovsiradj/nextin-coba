"use strict";

function PhotoPadApp()
{
    var version = "5.2",
        canvas = $("#main>canvas")[0],
        context = canvas.getContext("2d"),
        toolbar = new Toolbar($("#toolbar")),
        $img = $("<img>");

    function setStatus(message)
    {
        $("#app footer").text(message);
    }

    function toolbarButtonClicked(action)
    {
        switch (action)
        {
            case "save":
                var url = canvas.toDataURL();
                window.open(url, "PhotoPadImage");
                break;
            case "reset":
                context.drawImage($img[0], 0, 0);
                break;
        }
    }

    function menuItemClicked(option, value)
    {
        if (option == "applyEffect")
        {
            imageEffects[value](canvas);
        }
    }
    
    function onLoadFile($input)
    {
        var file = $input[0].files[0];
        console.log(file);

        if (file.type.match("image.*"))
        {
            var reader = new FileReader();
            reader.onload = function() { loadImage(reader.result); };
            reader.readAsDataURL(file);        
        }
        else
        {
            alert("Not a valid image type: " + file.type);
            setStatus("Error loading image!");
        }
    }
    
    function loadImage(url)
    {
        setStatus("Loading image");
        $img.attr("src", url);
        $img[0].onload = function()
        {
            // Here "this" is the image
            canvas.width = this.width;
            canvas.height = this.height;
            context.drawImage(this, 0, 0);
            setStatus("Choose an effect");
        }
        $img[0].onerror = function()
        {
            setStatus("Error loading image!");
        }
    }
    
    this.start = function()
    {
        $("#app header").append(version);

        toolbar.toolbarButtonClicked = toolbarButtonClicked;
        toolbar.menuItemClicked = menuItemClicked;
        
        // Check if File API available
        if (window.File && window.FileReader)
        {
            $("#load-menu input[type=file]").change(function(e) { onLoadFile($(this)); });
        }
        else
        {
            // File picker not available, load a default image
            loadImage("images/DutchmansBreeches.jpg");
            $("#file-picker input[type=url]").change(function(e) { loadImage($(this).val()); })
                .siblings("input").hide();
        }
        
        setStatus("ready");
    };
}

$(function()
{
    window.app = new PhotoPadApp();
    window.app.start();
});
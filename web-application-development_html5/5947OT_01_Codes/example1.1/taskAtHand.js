﻿"use strict";

function TaskAtHandApp()
{
    var version = "v1.1";

    function setStatus(message)
    {
        $("#app>footer").text(message);
    }

    function addTask()
    {
        var taskName = $("#new-task-name").val();
        if (taskName)
        {
            var $task = $("<li></li>");
            $task.text(taskName);
            $("#task-list").append($task);
            // Reset the field
            $("#new-task-name").val("").focus();
        }
    }
    
    this.start = function()
    {
        $("#new-task-name").keypress(function(e)
        {
            if (e.which == 13) // Enter key
            {
                addTask();
                return false;
            }
        })
        .focus();
        
        $("#app>header").append(version);
        setStatus("ready");
    };
}

$(function()
{
    window.app = new TaskAtHandApp();
    window.app.start();
});
"use strict";

$(function () {
  var taskList = new TaskList();
  taskList.createTask("Setup todo list");
  taskList.createTask("Buy milk");
  taskList.createTask("Read recipe");
  taskList.createTask("Invite guests");
  taskList.tasks[0].done = true;


  $("#createTask").click(function (event) {
    event.preventDefault();
    var task = taskList.createTask("");
    $("#taskList ul").append(task.render());
  });

  $("#taskList").append(taskList.render());

  $("#taskList").on("change", ":checkbox", function () {
    // all related code goes in here
    if ($(this).is(":checked")) {
      $(this)
        .closest('li')
        .slideUp("fast", function () {
          $(this)
            .addClass("finished")
            .appendTo("#taskList ul");
        })
        .slideDown();
    } else {
      $(this)
        .closest('li')
        .slideUp("fast", function () {
          $(this)
            .removeClass("finished")
            .prependTo("#taskList ul");
        })
        .slideDown();
    }
  });
});
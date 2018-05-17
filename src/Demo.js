"use strict";

$(function () {
  TaskList.load('1526560088937700', function (taskList) {
    $('#taskList').html(taskList.render());

    $("#createTask").click(function (event) {
      event.preventDefault();
      var task = taskList.createTask("");
      $("#taskList ul").append(task.render());
    });

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
    $('#saveTasks').click(function (event) {
      taskList.save();
    });
  });

});
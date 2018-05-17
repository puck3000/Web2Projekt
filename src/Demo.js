"use strict";

var taskList;

$(function () {
  if (window.location.hash.length > 16) {
    TaskList.load(window.location.hash.substring(1), function (tl) {
      taskList = tl;
      $('#taskList').html(taskList.render());
    });
  } else {
    taskList = new TaskList();
    taskList.createTask('');
    $('#taskList').html(taskList.render());
  }

  $("#createTask").click(function (event) {
    event.preventDefault();
    var task = taskList.createTask("");
    $("#taskList ul").append(task.render());
  });

  $("#taskList").on("change", ":checkbox", function () {
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

  $('#openList').click(function (event) {
    var listId = prompt("Bitte geben Sie die Tasklisten ID an", "demo");
    if (listId != null) {
      TaskList.load(listId, function (taskList) {
        $('#taskList').html(taskList.render());
      });
    }
  });

  $('#newList').click(function (event) {
    taskList = new TaskList();
    taskList.createTask('');
    $('#taskList').html(taskList.render());

  });

});
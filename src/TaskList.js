"use strict";

function TaskList(title) {
  this.id = null;
  this.tasks = [];
  this.title = title || "";
}

TaskList.prototype.size = function () {
  return this.tasks.length;
};

TaskList.prototype.createTask = function (title) {
  var _task = new Task(title);
  this.tasks.push(_task);
  return _task;
};


TaskList.prototype.render = function () {
  var $tasks = [];
  $.each(this.tasks, function (index, task) {
    $tasks.push(task.render());
  });

  return $('<ul>').append($tasks);
}

/*
 * Loads the given tasklist from the server.
 */
TaskList.load = function (id, callback) {
  var taskList = new TaskList();
  $.getJSON('http://zhaw.herokuapp.com/task_lists/' + id, function (returnedData) {
    taskList.id = returnedData.id;
    $.each(returnedData.tasks, function (index, task) {
      var t = taskList.createTask(task.title);
      t.done = task.done;
    });
    taskList.title = returnedData.title;
    callback(taskList);
  });
}
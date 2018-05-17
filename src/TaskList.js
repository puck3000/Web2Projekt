"use strict";

function TaskList(title) {
  this.id = title;
  this.tasks = [];
  this.title = title || "";
}

TaskList.prototype.size = function () {
  return this.tasks.length;
};

TaskList.prototype.createTask = function (title) {
  var task = new Task(title);
  this.tasks.push(task);
  return task;
};


TaskList.prototype.render = function () {
  var $tasks = [];
  $.each(this.tasks, function (index, task) {
    $tasks.push(task.render());
  });

  return $('<ul>').append($tasks);
};


TaskList.prototype.toJSON = function () {
  var jsonString = {
    id: this.id,
    title: this.title,
    tasks: []
  };
  var i;
  for (i = 0; i < this.tasks.length; i += 1) {
    jsonString.tasks.push({
      title: this.tasks[i].title,
      done: this.tasks[i].done
    });
  }
  return JSON.stringify(jsonString);
};

/*
 * persists the tasklist to the server.
 *
 * for tasklists without id (not yet persisted) the id
 * is written back to the model after it is received from
 * the server.
 */
TaskList.prototype.save = function () {
  var that = this;
  var url = 'http://zhaw.herokuapp.com/task_lists/';
  if (this.id) {
    url += this.id;
  }
  $.post(url, this.toJSON(), function (returnedData) {
    that.id = JSON.parse(returnedData).id;
    window.location.hash = that.id;
  });
};

// TaskList.prototype.shuffle = function () {
//   var tasksArray = this.tasks;
//   var i;
//   for (i = 0; i < this.tasks.length; i += 1) {
//     var checked = tasksArray[i].done;

//     if (checked) {
//       // tasksArray[i].appendTo("#taskList ul")
//     }
//   }
// };

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
    // taskList.shuffle();

  });
};
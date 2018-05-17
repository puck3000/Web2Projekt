"use strict";

function Task(title) {
    this.done = false;
    this.title = title || "";
}


Task.prototype.render = function () {
    var done = this.done;
    var title = this.title;

    var templateStringMarkup = `
        <label>
            <input name="done" type="checkbox" ${done ? 'checked' : ''} >
            <span></span>
        </label>
        <div class="input-field inline">
            <input name="title" type="text" placeholder="new task" value="${title}" >
        </div>
    `;
    var task = $('<li>').append(templateStringMarkup);

    task.data('task', this);

    task.find('input').change(function (event) {
        var taskObject = $(this).closest('li').data("task");
        taskObject.done = $(this).is(":checked");
        taskObject.title = $(this).val();

    });
    return task;
};
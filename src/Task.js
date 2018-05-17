"use strict";

function Task(title) {
    this.done = false;
    this.title = title || "";
}

Task.prototype.render = function () {
    var $markup;
    var $done = $('<input>', {
        name: 'done',
        type: 'checkbox',
        checked: this.done
    });

    var $label = $('<label>').append([$done, '<span>']);

    var $title = $('<input>', {
        name: 'title',
        type: 'text',
        placeholder: "new task"
    }).val(this.title);

    var $textInputWrapper = $('<div>', {
        'class': 'input-field inline'
    }).append($title);

    $markup = $('<li>').append([$label, $textInputWrapper]);

    // TODO: connect object instance to data attribute 'task'
    $markup.data('task', this);
    // TODO: react on change of the checkbox and the input field:
    //       - populate done field from checkbox
    //       - populate title field from input text field
    //       - write new value using console.log
    $markup.find('input').change(function (event) {
        var taskObject = $(this).closest('li').data("task");
        taskObject.done = $done.is(":checked");
        taskObject.title = $title.val();

        console.log(taskObject);

    });
    return $markup;
};
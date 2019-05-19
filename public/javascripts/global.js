$(document).ready(function () {
    listTodos();
    listDoneTodos();
    $('#btnCreateTodo').on('click', createTodo);
    $('#btnListDoneTodos').on('click', btnListDoneTodos);
    $('#btnUpdateTitle').on('click', btnUpdateTitle);
});



function convertTodoIntoHTML(obj) {
    let todo = '';
    todo += '<div id="todo-entry" data-id=\''+obj._id+'\'>';
    todo += '<input class="title" value="' + obj.title + '">';
    todo += '<p class="timeStamp">' + obj.timeStamp + '</p>';
    todo += '<button id="btnDeleteTodo" onclick="deleteTodo(\''+obj._id+'\')">Delete</button>';
    todo += "<button id='btnToggleTodoDone' onclick='toggleTodoDone(" + JSON.stringify({_id : obj._id, done: obj.done}) + ")'>Done?</button>";
    todo += '<button id="btnUpdateTitle" onclick="btnUpdateTitle(\''+obj._id+'\')">Update</button>';
    todo += '</div>';
    return todo;
}

function convertTodoIntoHTMLNotDone(obj) {
    let todo = '';
    todo += '<div id="todo-entry" data-id=\''+obj._id+'\'>';
    todo += '<input class="title" value="' + obj.title + '">';
    todo += '<p class="timeStamp">' + obj.timeStamp + '</p>';
    todo += '<button id="btnDeleteTodo" onclick="deleteTodo(\''+obj._id+'\')">Delete</button>';
    todo += "<button id='btnToggleTodoDone' onclick='toggleTodoDone(" + JSON.stringify({_id : obj._id, done: obj.done}) + ")'>Not Done?</button>";
    todo += '<button id="btnUpdateTitle" onclick="btnUpdateTitle(\''+obj._id+'\')">Update</button>';
    todo += '</div>';
    return todo;
}

function createTodo() {
    console.log("loop");

    event.preventDefault();

    let todo = {
        'title' : $('#createTodo #inputTitle').val(),
    };

    $.ajax({
        type: 'POST',
        data: todo,
        url: '/todos/create',
        dataType: 'JSON'
    }).done(function(response) {
        if (response.msg === 'success') {
            $('#todos').append(convertTodoIntoHTML(response.todo));
        } else {
            window.alert(response.msg);
        }
    });
}

function deleteTodo(id){
    event.preventDefault();

    $.ajax({
        type: 'DELETE',
        url: '/todos/' + id,
    }).done(function(response) {
        if (response.msg === 'success') {
            $('div[data-id="'+id+'"]').remove();
        } else {
            window.alert(response.msg);
        }
    });
}

function btnListDoneTodos() {
    $('#doneTodos').toggle();
}

function toggleTodoDone(obj) {
    console.log(obj);

    $.ajax({
        type: 'POST',
        url: '/todos/' + obj._id + '/toggle-done',
    }).done(function(response) {
        if (response.msg === 'success') {
            // if (obj.done) {
            //     $('#todos').append($('div[data-id="'+obj._id+'"]'));
            // } else {
            //     $('#doneTodos').append($('div[data-id="'+obj._id+'"]'));
            //    // $('div[data-id="'+obj._id+'"]').find('#isdone').text("true");
            // }
            listTodos();
            listDoneTodos();
        } else {
            window.alert(response.msg);
        }
    });

    listTodos();
    listDoneTodos();
}

function listTodos() {
    let todos = '';
    $.getJSON('/todos/not-done', function (data) {
        $.each(data, function () {
            todos += convertTodoIntoHTML(this);
        });

        $('#todos').html(todos);
    });
}

function listDoneTodos() {
    let todos = '';
    $.getJSON('/todos/done', function (data) {
        $.each(data, function () {
            todos += convertTodoIntoHTMLNotDone(this);
        });

        $('#doneTodos').hide();
        $('#doneTodos').html(todos);
    });
}

function btnUpdateTitle(id) {
    let title = $('div[data-id="'+id+'"]').find('input').val();

    $.ajax({
        type: 'POST',
        data: { 'title' : title},
        url: '/todos/' + id,
    }).done(function(response) {
        if (response.msg === 'success') {
            listTodos();
            listDoneTodos();
        } else {
            window.alert(response.msg);
        }
    });
}
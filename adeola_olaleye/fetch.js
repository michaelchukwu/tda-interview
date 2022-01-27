document.addEventListener('DOMContentLoaded', async () => {

    // mark task as done
    const markAsDone = () => {
        // find the closest li element to the button
        element = event.currentTarget;
        element.closest('li')
            .classList.toggle('markDone');
        element.textContent = element.textContent === 'Mark' ? 'Unmark' : 'Mark'
    }

    // make task editable
    const editTask = () => {
        const element = event.currentTarget;
        element.textContent = element.textContent === 'Edit' ? 'Save' : 'Edit'
        // find the closest input element to the button
        let divElement = element.closest('li').querySelector('div');
        divElement.classList.toggle('contentEditable');

        if (divElement.getAttribute('contenteditable') === 'true') {
            // save edit to server
            divElement.setAttribute('contenteditable', 'false');
        } else {
            divElement.setAttribute('contenteditable', 'true');
        }
    }

    // remove task
    const removeTask = (a, b) => {
        console.log(a, b);
        const element = event.currentTarget;
        // find the closest li element to the button and remove it
        element.closest('li').remove();
    }

    const addTask = ( { id, task, isMarked }) => {
        const liNode = document.createElement('li');
        const divNode = document.createElement('div');
        const markNode = document.createElement('button');
        const editNode = document.createElement('button');
        const removeNode = document.createElement('button');

        liNode.className = 'list-group-item d-flex justify-content-between align-items-start';
        divNode.className = 'ms-2 me-auto px-2';
        markNode.className = 'badge btn-success btn btn-sm x-1 markAsDone';
        editNode.className = 'badge btn-warning btn btn-sm mx-1 editTask';
        removeNode.className = 'badge btn-danger btn btn-sm mx-1 removeTask';

        divNode.textContent = task;
        markNode.textContent = 'Mark';
        editNode.textContent = "Edit";
        removeNode.textContent = "Delete";

        liNode.append(divNode);
        liNode.append(markNode);
        liNode.append(editNode);
        liNode.append(removeNode);
        document.querySelector('#tasks').append(liNode);

        //variabe assignments.
        const markAsDoneElement = document.querySelectorAll('.markAsDone');
        const editTaskElement = document.querySelectorAll('.editTask');
        const removeTaskElement = document.querySelectorAll('.removeTask');

        //removing existing event listeners on the action buttons
        markAsDoneElement.forEach(el => el.removeEventListener("click", markAsDone, true));
        editTaskElement.forEach(el => el.removeEventListener("click", editTask, true));
        removeTaskElement.forEach(el => el.removeEventListener("click", removeTask, true));

        // add event listeners to action buttons.
        markAsDoneElement.forEach(el => el.addEventListener("click", markAsDone));
        editTaskElement.forEach(el => el.addEventListener("click", editTask));
        removeTaskElement.forEach(el => el.addEventListener("click", removeTask));


        let tasks = localStorage.getItem('tasks');
        if (!tasks) {
            tasks = [{ id: id ? id : Date.now(), task, isMarked }];
        } else {
            tasks = JSON.parse(tasks);
            tasks.push({ id: id ? id : Date.now(), task, isMarked });
        }
        // add to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    const addTasks = () => {
        event.preventDefault();
        const newTask = document.querySelector('#createTask');
        if (newTask.value.trim() === '') {
            return
        }
        addTask({ task: newTask.value, isMarked: false});
        newTask.value = '';
    }

    // use local storage
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
        tasks.forEach(el => addTask(el));
    }
    // add to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks))

    // add click event to each elements with the class name
    const markAsDoneElements = document.querySelectorAll('.markAsDone');
    markAsDoneElements.forEach(element => element.addEventListener('click', markAsDone, false));

    // add click event to each elements with the class name
    const editTaskElements = document.querySelectorAll('.editTask');
    editTaskElements.forEach(element => element.addEventListener('click', editTask));

    // add click event to each elements with the class name
    const removeTaskElements = document.querySelectorAll('.removeTask');
    removeTaskElements.forEach(element => element.addEventListener('click', removeTask));

    // Add task
    const addTaskButton = document.querySelector('#addTask');
    addTaskButton.addEventListener('click', addTasks);
    localStorage.setItem('tasks', JSON.stringify(tasks))

})
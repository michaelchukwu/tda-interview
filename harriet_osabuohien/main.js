// Get all Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const todoDiv = document.querySelector(".div");
const filterOption = document.querySelector(".filter-todo ");

// Create Event Listeners
document.addEventListener("DOMContentLoader", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTask);
// todoList.addEventListener("click", editTask);
todoList.addEventListener("click", deleteAll);
filterOption.addEventListener("change", filterTodo);

// Add function to add the todo
function item(inputItem) {
  createDiv(inputItem);
}
function addTodo(e) {
  let input = document.createElement("input");
  input.value = "todo";
  input.disabled = true;
  input.classList.add("todo-item");
  input.type = "text";
  // prevents form from submitting
  e.preventDefault();
  // Using Js to create a div and li
  // adds a div element to the todo
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // add an li element
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // adding todo to local storage
  saveLocalTodos(todoInput.value);

  // Completed task button
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = "Completed";
  completedBtn.classList.add("completed-btn");
  todoDiv.appendChild(completedBtn);

  // Remove task button
  const RemoveBtn = document.createElement("button");
  RemoveBtn.innerHTML = "Delete";
  RemoveBtn.classList.add("remove-btn");
  todoDiv.appendChild(RemoveBtn);

  // Edit task button
  const editBtn = document.createElement("button");
  editBtn.innerHTML = "Edit";
  editBtn.classList.add("edit-btn");
  // editBtn.addEventListener("click", editTask);
  todoDiv.appendChild(editBtn);

  // Now Append to list ,the Div created
  todoList.appendChild(todoDiv);
  // to clear the input field after add a task
  todoInput.value = "";

  editBtn.addEventListener("click", function (e) {
    e.preventDefault();
    editTask(input, this);
  });
}

// Creating a function for the delete
function deleteTask(e) {
  const item = e.target;

  // delete the todo
  if (item.classList[0] === "remove-btn") {
    const todo = item.parentElement;
    todo.remove();
  }

  // Checked
  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
// CREATE A FUNCTION FOR THE REMOVE ALL
function deleteAll(e) {
  const item = e.target;
  if (item.classList[0] === "del-btn") {
    const todo = item.parentElement;
    todo.remove();
  }
}

// EDIT FUNCTION
function editTask(input, button) {
  input.disabled = !input.disabled;
  let display = button.parentElement.firstElementChild;
  // button.parentElement.firstElementChild.replaceWith(input);
  if (!input.disabled) {
    input.focus();
    todoInput.value = display.innerText;
    button.innerText = "Update";
  } else {
    display.innerText = todoInput.value;
    button.innerText = "Edit";
    todoInput.value = "";
  }
}
// Created a filter to see 'completed', 'uncompleted' and all
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// SAVING TO LOCAL STORAGE

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// GET TODOS

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // add an li element
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Completed task button
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = "Completed";
    completedBtn.classList.add("completed-btn");
    todoDiv.appendChild(completedBtn);

    // Remove task button
    const RemoveBtn = document.createElement("button");
    RemoveBtn.innerHTML = "Delete";
    RemoveBtn.classList.add("remove-btn");
    todoDiv.appendChild(RemoveBtn);

    // Edit task button
    const EditBtn = document.createElement("button");
    EditBtn.innerHTML = "Edit";
    EditBtn.classList.add("edit-btn");
    EditBtn.addEventListener("click", editTask);
    todoDiv.appendChild(EditBtn);

    // Now Append to list ,the Div we created

    todoList.appendChild(todoDiv);
  });
}

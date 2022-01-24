const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const clearButton = document.querySelector(".clear-tasks");

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
clearButton.addEventListener("click", clearTasks);


function addTodo(event) {

 

  if (!todoInput.value) {
    alert('Please input a to do')
  } else {
    
  const todoDiv = document.createElement('div');
  const newTodo = document.createElement('li');
  todoDiv.classList.add("todo");
    newTodo.innerText = todoInput.value;

    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
  

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add('edit-btn');
    todoDiv.appendChild(editButton);
    todoList.appendChild(todoDiv);
    
  storeTaskInLocalStorage(todoInput.value);

    todoInput.value = "";

  event.preventDefault();
    
  }


 
}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem("tasks") === null){
    tasks = [];
} else{
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
tasks.push(task);

localStorage.setItem("tasks", JSON.stringify(tasks));
}


function deleteCheck(e) {
  const item = e.target;
  //delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    setTimeout(() => {
      todo.classList.add("fallD")
    }, 500)

    todo.addEventListener('transitionend'),
      function () {
        todo.remove();
      }
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed")
  }
  if (item.classList[0] === "edit-btn") {
    const todo = item.parentElement;
    todoInput.value = todo.innerText;
    todo.remove();

  }
}

 
function clearTasks() {
  todoList.innerHTML = ""
}
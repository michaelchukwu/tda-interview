// select elements
const form = document.querySelector('#itemForm');
const itemInput = document.querySelector('#itemInput');
const dateInput = document.querySelector('#date');
const itemList = document.querySelector('#itemList');
const messageDiv = document.querySelector('#message');
const clearButton = document.querySelector('#clearBtn');
const filters = document.querySelectorAll('.nav-item');

// create empty todo list
let todoItems = [];

// filter tasks
const getItemsFilter = function (type) {
  let filterItems = [];
  console.log('type::', type);
  switch (type) {
    case 'todo':
      filterItems = todoItems.filter((item) => !item.isDone);
      break;
    case 'done':
      filterItems = todoItems.filter((item) => item.isDone);
      break;
    default:
      filterItems = todoItems;
  }
  getTasks(filterItems);
};

// update task
const updateItem = function (itemIndex, newValue) {
  console.log(itemIndex);
  const newItem = todoItems[itemIndex];
  newItem.name = newValue;
  todoItems.splice(itemIndex, 1, newItem);
  setTasks(todoItems);
};

// delete task
const removeItem = function (item) {
  const removeIndex = todoItems.indexOf(item);
  todoItems.splice(removeIndex, 1);
};

// delete All tasks
function clearAll() {
  alert('Are you sure you want to delete all tasks?');
  localStorage.clear();
  alert('All tasks has been deleted');
  getTasks();
}

// handle tasks
const handleTask = function (itemData) {
  const items = document.querySelectorAll('.list-group-item');
  items.forEach((item) => {
    if (
      item.querySelector('.title').getAttribute('data-time') == itemData.addedAt
    ) {
      // done
      item.querySelector('[data-done]').addEventListener('click', function (e) {
        e.preventDefault();
        const itemIndex = todoItems.indexOf(itemData);
        const currentItem = todoItems[itemIndex];
        const currentClass = currentItem.isDone
          ? 'fas fa-check-fill'
          : 'fas fa-check';
        currentItem.isDone = currentItem.isDone ? false : true;
        todoItems.splice(itemIndex, 1, currentItem);
        setTasks(todoItems);

        const iconClass = currentItem.isDone
          ? 'fas fa-check-fill'
          : 'fas fa-check';

        this.firstElementChild.classList.replace(currentClass, iconClass);
        const filterType = document.querySelector('#filterType').value;
        getItemsFilter(filterType);
      });

      // edit
      item.querySelector('[data-edit]').addEventListener('click', function (e) {
        e.preventDefault();
        itemInput.value = itemData.name;
        document.querySelector('#citem').value = todoItems.indexOf(itemData);
        return todoItems;
      });

      //delete
      item
        .querySelector('[data-delete]')
        .addEventListener('click', function (e) {
          e.preventDefault();
          if (confirm('Are you sure want to delete?')) {
            itemList.removeChild(item);
            removeItem(item);
            setTasks(todoItems);
            alert('Item has been deleted.');
            return todoItems.filter((item) => item != itemData);
          }
        });
    }
  });
};
// get list of tasks
const getTasks = function (todoItems) {
  itemList.innerHTML = '';
  if (todoItems.length > 0) {
    todoItems.forEach((item) => {
      const iconClass = item.isDone ? 'fas fa-check-fill' : 'fas fa-check';
      itemList.insertAdjacentHTML(
        'beforeend',
        `<li class="list-group-item d-flex justify-content-between align-items-center">
          <span class="title" data-time="${item.addedAt}">${item.name} ${item.date}</span> 
          <span>
              <a href="#" class="btn btn-success" data-done><i class="fas fa-check"></i></a>
              <a href="#" class="btn btn-primary" data-edit><i class="far fa-edit"></i></a>
              <a href="#" class="btn btn-danger" data-delete><i class="fas fa-trash"></i></a>
          </span>
        </li>`
      );
      handleTask(item);
    });
  } else {
    itemList.insertAdjacentHTML(
      'beforeend',
      `<li class="list-group-item d-flex justify-content-between align-items-center">
        No record found.
      </li>`
    );
  }
};

// Calendar
$(document).ready(function () {
  var date_input = $('input[name="date"]');
  var container =
    $('.bootstrap-iso form').length > 0
      ? $('.bootstrap-iso form').parent()
      : 'body';
  var options = {
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);
});

// get localstorage from the page
const getLocalStorage = function () {
  const todoStorage = localStorage.getItem('todoItems');
  if (todoStorage === 'undefined' || todoStorage === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoStorage);
  }
  getTasks(todoItems);
};
// set list in local storage
const setTasks = function (todoItems) {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = itemInput.value.trim();
    const itemDate = dateInput.value.trim();
    if (itemName.length === 0) {
      alert('Please enter a task');
      return;
    } else {
      // update existing task
      const currenItemIndex = document.querySelector('#citem').value;
      if (currenItemIndex) {
        updateItem(currenItemIndex, itemName);
        document.querySelector('#citem').value = '';
        alert('Item has been updated.');
      } else {
        // Add new task
        const itemObj = {
          name: itemName,
          date: itemDate,
          isDone: false,
          addedAt: new Date().getTime(),
        };
        todoItems.push(itemObj);
        // set local storage
        setTasks(todoItems);
        alert('New item has been added.');
      }

      getTasks(todoItems);
      // get list of all tasks
    }
    console.log(todoItems);
    itemInput.value = '';
  });

  // filters
  filters.forEach((tab) => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      const tabType = this.getAttribute('data-type');
      document.querySelectorAll('.nav-link').forEach((nav) => {
        nav.classList.remove('active');
      });
      this.firstElementChild.classList.add('active');
      document.querySelector('#filterType').value = tabType;
      getItemsFilter(tabType);
    });
  });

  // load tasks
  getLocalStorage();
});

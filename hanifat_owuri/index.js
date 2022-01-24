
 var tasks = [

 ];
 const elements = document.getElementById("unordered_list");
 const add = document.getElementsByClassName("addBtn");
 const input = document.getElementById("myInput");
 const delAll = document.getElementById("btn");

 function addItemToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } 
   //to display items on screen
  const display = () => {
    addItemToLocalStorage();
    const listContent = tasks.map((task) => `<li class="update ${task.isCompleted ? "checked" : ""}">
      <span class="list-text" onclick="checkTask(${task.id})">  ${task.text} </span>
      
      <div class="buttons">
       <button onclick="editItem(${task.id})"> edit </button>
       <button class="del" onclick="delItem(${task.id})"> delete </button>
       </div>
        </li>`).join("");
        if(tasks.length > 0){
            delAll.style.display = 'block';
        }
        else{
            delAll.style.display = 'none';
        }
       
        elements.innerHTML = listContent;

       
 }
  //function responsible for adding items 
   const addItem = (e) => {
       e = e || window.event;
       e.preventDefault();
     if(!input.value) {
       alert("you need to add something");
       return;
    }
    
        const id = tasks.length + 1; 
        const text = input.value;
        const isCompleted = false;
         tasks.push(
            {id,text, isCompleted}
         );
         input.value = "";
         display();
        
        
 };
   
   function getItemFromLocalStorage() {
     const ref = localStorage.getItem('tasks');
    if (ref) {
       tasks = JSON.parse(ref);
       display();
    }
   }
   getItemFromLocalStorage();

  //to update the array when an item has been checked
 const checkTask = (id) => {
     console.log(id)
    const updatedTasks = tasks.map((task) => {
      if(task.id === id){
        task.isCompleted = !task.isCompleted
   }
      return task;
    });
   tasks = updatedTasks;
   display();
};
 // to edit item
const editItem = (id) => {
    const itemToEdit = tasks.filter(task => task.id === id)[0]
    input.value = itemToEdit.text;
    const newTasks = tasks.filter(task => task.id != id);
    const editedTask = newTasks.map((task, index) => {
        task.id = index + 1;
        return task
    })
    tasks = editedTask;
    display();
}
 //to delete item
const delItem = (id) => {
    const newTasks = tasks.filter(task => task.id != id);
    const deletedTask = newTasks.map((task, index) => {
        task.id = index + 1;
        return task
    })
    tasks = deletedTask;
    display();
}
 //to delete all
const delAllItem = (id) => {
    var confirmation = confirm("This action is irreversible, do you wish to continue?")
    if(confirmation){
      tasks = [];  
    }
     tasks = tasks;
    display();
}

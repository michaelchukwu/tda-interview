var todo = {
    data : [], 
    addData : null, 
    displayTemplate : null, 
    listItem : null, 
    init : () => {
      if (localStorage.todo == undefined) { 
          localStorage.todo = "[]"; 
        }
  
      todo.data = JSON.parse(localStorage.todo);
  
      
      todo.addData = document.getElementById("todo-item");
      todo.displayTemplate = document.getElementById("todo-template").content;
      todo.listItem = document.getElementById("todo-list");
  
      document.getElementById("todo-add").onsubmit = todo.add;
  
      todo.draw();
    },
  
    draw : () => {
      todo.listItem.innerHTML = "";
      if (todo.data.length>0) { for (let id in todo.data) {
        let row = todo.displayTemplate.cloneNode(true);
        row.querySelector(".todo-edit").onclick = () => { todo.editable(id) }
        row.querySelector(".todo-item").textContent = todo.data[id][0];
        row.querySelector(".todo-done").onclick = () => { todo.toggle(id); };
        row.querySelector(".todo-del").onclick = () => { todo.del(id); };
        if (todo.data[id][1]) {
          row.querySelector(".todo-item").classList.add("todo-ok");
        }
        todo.listItem.appendChild(row);
      }}
    },
  
    save: () => {
      localStorage.todo = JSON.stringify(todo.data);
      todo.draw();
    },
  
    add : () => {
      todo.data.push([todo.addData.value, false]);
      todo.addData.value = "";
      todo.save();
      return false;
    },
  
    toggle: (id) => {
      todo.data[id][1] = !todo.data[id][1];
      todo.save(id);
    },
    
    editable: (id) => {
      let newRows = document.querySelectorAll('.todo-item');
      
      todo.data[id][0] = newRows[id].innerText
      console.log(id, newRows[id].innerText, todo.data[id])
    
       todo.save(id);
    },
  
    del: (id) => { if (confirm("Delete task?")) {
      todo.data.splice(id, 1);
      todo.save();
    }},
    
        
  };
  const deleteall = document.getElementById('deleteall')
  deleteall.addEventListener('click', function(){
      if(confirm('Are you Sure you want to delete all?')){
        localStorage.clear();
        location.reload();
      }
  });
  
  window.addEventListener("load", todo.init);
  
  
  









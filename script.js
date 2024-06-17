//const { default: axios } = require("axios");
const taskInput = document.getElementById("task-input");
const taskForm  = document.getElementById("task-form");
const taskList  = document.getElementById("task-list");

axios.get('http://localhost:3001/api/todos')
    .then(function(res) {
        for (el in res.data.data) {
            li = document.createElement('li')
            li.appendChild(document.createTextNode(res.data.data[el].name))
            taskList.appendChild(li)
        }
    })
    .catch(function(err) {
        console.log(err)
    })
    .finally(function() {
        
    })

document.getElementById('btn-create-task').addEventListener('click', function(e) {
    axios.post('http://localhost:3001/api/todos', {
        task: taskInput.value,
        done: false
    }).then(function(res) {
    }).catch(function(err) {
    }).finally(function() {
    })
})


   taskForm.addEventListener("submit", (e) => {
       e.preventDefault();
       const taskTitle = taskInput.value;
       console.log(taskTitle);


       if (taskTitle == "") {
           alert("Please Enter a New Task");
       }
       else{ 
           const listItem = document.createElement("li");
           listItem.innerHTML = taskTitle;
           taskList.append(listItem);
           let span = document.createElement('span');
           span.innerHTML = `&times;`
           listItem.appendChild(span);
           taskInput.value = "";
           saveListData();
       }
   });

   taskList.addEventListener("click", (e) => {
       if (e.target.tagName == "LI") {
           e.target.classList.toggle("checked");
           saveListData();
       }

       if(e.target.tagName == 'SPAN') {
           const li = e.target.parentElement;
           li.remove();
           saveListData();
       }
   });

//   function showListData() {
//       taskList.innerHTML = localStorage.getItem("listItem");
//   }

   function saveListData(){
       localStorage.setItem("listItem", taskList.innerHTML);
   }

//   showListData();

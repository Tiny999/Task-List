// Variables 
const form = document.querySelector('#task-form');
const tasksList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load Event Listeners
loadListeners();

// Event Listeners 
function loadListeners(){
  
  // Add Task Event
  form.addEventListener('submit', addTask);

  // Remove Task Event
  tasksList.addEventListener('click', removeTasks);

  // Clear Task Event
  clearBtn.addEventListener('click', clearTasks);

  // Filter Tasks Event
  filter.addEventListener('keyup', filterTasks);

  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
}


//Functions

//Get Tasks from LS
function getTasks(){
  let tasks;

  if (localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    const li = document.createElement('li');

    // add class
    li.className = 'collection-item';

    // create text node and append to li
    li.appendChild(document.createTextNode(task));

    // create new link element
    const link = document.createElement('a');

    link.className = 'delete-item secondary-content';

    link.innerHTML = '<i class="fa fa-remove fa-2x"></i>';

    li.appendChild(link);

    // Append li to UL
    tasksList.appendChild(li);
  })
}

// Add Tasks 
function addTask(e){
  e.preventDefault();

  if(taskInput.value === ''){
    alert("Add a Task");
  } else {
    // Create a li element

    const li = document.createElement('li');

    // add class
    li.className = 'collection-item';

    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element
    const link = document.createElement('a');

    link.className = 'delete-item secondary-content';

    link.innerHTML = '<i class="fa fa-remove fa-2x"></i>';

    li.appendChild(link);

    // Append li to UL
    tasksList.appendChild(li);
    
    // Store in LocalStorage
    storeTaskInLocalStorage(taskInput.value);

    // Clear the Input
    taskInput.value = '';
  }

}

function storeTaskInLocalStorage(task){

  let tasks;

  if (localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Remove tasks
function removeTasks(e){

  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm("Remove Task?")){
      e.target.parentElement.parentElement.remove();

      removeFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}


// Remove from LS
function removeFromLocalStorage(taskItem){
  let tasks;

  if (localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear Tasks
function clearTasks(e){

  // tasksList.innerHTML = '';

  // faster
  while(tasksList.firstChild){
    tasksList.removeChild(tasksList.firstChild);
  }

}


// Filter Tasks
function filterTasks(e){

  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(task => {
    
    const item = task.firstChild.textContent.toLowerCase();

    if(item.indexOf(text) != -1){
      task.style.display = 'block';
    } else{
      task.style.display = 'none';
    }

  })

}
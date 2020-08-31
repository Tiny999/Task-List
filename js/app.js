// Variables 
const form = document.querySelector('#task-form');
const tasksList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filer');
const taskInput = document.querySelector('#task');


// Load Event Listeners
loadListeners();

// Event Listeners 
function loadListeners(){
  form.addEventListener('submit', addTask);

  tasksList.addEventListener('click', removeTasks);
}


//Functions

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

    // Clear the Input
    taskInput.value = '';
  }

}


// Remove tasks
function removeTasks(e){

  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm("Remove Task?")){
      e.target.parentElement.parentElement.remove();
    }
  }

  e.preventDefault();
}
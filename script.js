// script.js
const taskInput = document.getElementById('taskInput');
const descriptionInput = document.getElementById('descriptionInput');
const dueDateInput = document.getElementById('dueDateInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const sortButton = document.getElementById('sortButton');
import { showNotification } from "./src/notification.js";
import { TaskManager } from "./src/taskManager.js";
import { renderTask } from "./src/domManipulator.js";

document.addEventListener('DOMContentLoaded', loadTasks);
const taskManager = new TaskManager;
const today = new Date().toISOString().slice(0, 16);
dueDateInput.min = today;

// Function to load tasks from local storage
function loadTasks() {
    const tasks = taskManager.tasks;
    tasks.forEach(task => {
        renderTask(task, descriptionInput, dueDateInput, taskList);
    });
}

// Function to add a new task to the DOM and Local Storage
addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    taskManager.reloadTasks();
    const taskText = taskInput.value.trim();
    const taskDescription = descriptionInput.value.trim();
    const date = dueDateInput.value;
    const dateTime = dueDateInput.value.split('T')

    if (taskText === "" || date === "") {
        return showNotification("Please enter a task and a due date.");
    }


    for (const task of taskManager.tasks) {
       if (task.title === taskText) {
            return showNotification("You already have a task with the same name.");
        } 
    }

    // Add task to Local Storage
    const task = {
        Id:Date.now(),
        title: taskText,
        description: taskDescription,
        dueDate: dateTime[0],
        dueTime: dateTime[1],
        completed: false
    }
    taskManager.addTask(task);
    renderTask(task, descriptionInput, dueDateInput, taskList);
    showNotification("You added a new task to your todo list.");

    // Clear input fields
    taskInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = ''; 
});


// Function to sort tasks by due date
sortButton.addEventListener('click', () => {
    const tasks = taskManager.tasks
    tasks.sort((a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    taskList.innerHTML = "";
    tasks.forEach(task => renderTask(task, descriptionInput, dueDateInput, taskList));
});

'use strict';
import { TaskManager } from './taskManager.js';
import { showNotification } from './notification.js';

const taskManager = new TaskManager();

export function renderTask(task, descriptionInput, dueDateInput, taskList) {
    const taskItem = document.createElement('li');

    const descriptionContainer = createDiv('descriptions');
    const taskTitle = createSpan(`${task.completed ? 'completed' : ''}`, ` ${task.title}</span>`);
    const taskDuedate = createSpan(`${task.completed ? 'completed' : ''}`, ` ${task.dueDate}</span`);
    const taskDescription = createSpan('', `${task.description}`);
    const taskDueTime = createSpan(`${task.completed ? 'completed' : ''}`, `${task.dueTime}`)
    taskDueTime.classList.add('time');
    descriptionContainer.append(taskTitle, taskDuedate, taskDescription,taskDueTime);


    const buttonsContainer = createDiv("buttons", "Edit");
    const editButton = createButton("editButton", "Update");
    const deleteButton = createButton("deleteButton", "Delete");
    const completeButton = createButton("completeButton", `${task.completed ? 'Undo' : 'Complete'}`);
    editButton.addEventListener("click", () => listenToUpdate(task, taskItem, descriptionInput, dueDateInput, taskInput));
    deleteButton.addEventListener("click", () => listenToDelete(task, taskItem, taskList));
    completeButton.addEventListener("click", () => listenToComplete(task, taskItem));
    buttonsContainer.append(editButton, deleteButton, completeButton);
    taskItem.append(descriptionContainer, buttonsContainer);

    document.getElementById('taskList').appendChild(taskItem);
}

function createSpan(classList, content) { 
    const span = document.createElement('span');
    classList &&  span.classList.add(classList)
    span.innerHTML = content;
    return span;
}

function createDiv(classList) {
    const div = document.createElement('div');
    div.classList.add(classList)
    return div;
}
 
function createButton(classList, content, onClick) {
    const button = document.createElement('button');
    button.classList.add(classList)
    button.textContent = content;
    button.addEventListener("click", onClick)
    return button;
 }

function listenToDelete(task, taskItem, taskList) {
    taskList.removeChild(taskItem);
    taskManager.deleteTask(task);
    showNotification("You deleted the task from your todo list");
}
 
function listenToUpdate(task, taskItem, descriptionInput, dueDateInput, taskInput) { 
    taskInput.value = task.title;
    descriptionInput.value = task.description;
    dueDateInput.value = task.dueDate;
    taskManager.deleteTask(task);
    taskItem.remove();
}

function listenToComplete(task, taskItem) {
    taskManager.reloadTasks()
    const Task = taskManager.tasks.filter(Task => task.Id === Task.Id)[0]
    taskItem.classList.toggle('completed', !Task.completed);
    taskItem.querySelector('.completeButton').innerText = !Task.completed ? 'Undo' : 'Complete';
    taskManager.updateTask({ ...task, completed: !Task.completed });
    showNotification(`Task ${!Task.completed? "completed": "uncompleted"}`)
}

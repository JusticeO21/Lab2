"use strict";
export class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
    }

    deleteTask(Task) {
        this.tasks = this.tasks.filter(task => task.Id !== Task.Id);
        this.saveTasks();
    }

    updateTask(Task) {
        this.tasks = this.tasks.map(task => {
            if (task.Id === Task.Id) {
                return {...task,...Task};
            }
            return task;
        });
        this.saveTasks();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    getTasks() {
        return this.tasks;
    }

    reloadTasks() { 
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
}

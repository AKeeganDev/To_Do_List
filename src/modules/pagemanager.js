import Task from './task.js';

export default class PageManager {

  taskList = [];

  storageTaskList;

  storageKeyTaskList = 'storageTaskList';

  storageValueTaskList;

  addButton = document.querySelector('.add-button');

  domTaskList = document.getElementById('task-list');

  taskInput = document.querySelector('.task-input');

  checkBoxes = document.querySelectorAll('.check-box');

  loadCheckBoxListeners = () => {
    this.checkBoxes.forEach((checkbox) => {
      checkbox.addEventListener('click', (e) => {
        e.target.classList.toggle('checked');
      });
    });
  }

  loadTasksFromClass = () => {
    this.domTaskList.innerHTML = '';
    for (let i = 0; i < this.taskList.length; i += 1) {
      const listItem = document.createElement('li');
      listItem.id = i;
      listItem.innerHTML = this.taskList[i].toHTML();
      this.domTaskList.appendChild(listItem);
      this.checkBoxes = document.querySelectorAll('.check-box');
    }
    this.loadCheckBoxListeners();
  }

  addTask = () => {
    const counter = this.taskList.length + 1;
    const newTask = new Task(this.taskInput.value);
    newTask.index = counter;
    this.taskList.push(newTask);
    this.loadTasksFromClass();
  }

  pageSetup = () => {
    console.log(this.addButton.className);
    this.addButton.addEventListener('click', () => {
      this.addTask();
    })
  }
}
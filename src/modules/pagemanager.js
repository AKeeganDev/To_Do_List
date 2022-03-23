import Task from './task.js';

export default class PageManager {
  task1 = new Task('Clean the kitchen');

  task2 = new Task('Clean the car');

  task3 = new Task('Go to the grocery store');

  taskList = [this.task1, this.task2, this.task3];

  storageTaskList;

  storageKey = 'storageTaskList';

  storageKeyValue;

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

  loadTasks = () => {
    for (let i = 0; i < this.taskList.length; i += 1) {
      const listItem = document.createElement('li');
      listItem.id = i;
      this.taskList[i].index = i;
      listItem.innerHTML = this.taskList[i].toHTML();
      this.domTaskList.appendChild(listItem);
      this.checkBoxes = document.querySelectorAll('.check-box');
    }
    this.loadCheckBoxListeners();
  }
}
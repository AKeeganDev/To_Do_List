/* eslint-disable max-classes-per-file */

import './style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';

class Task {
  constructor(description) {
    this.index = 0;
    this.completed = false;
    this.description = description;
  }

  toHTML = () => `<label for="Item${this.index}">
      <button type="button" class="check-box">&check;</button>
      <input type="text" value="${this.description}" name="Item${this.index}" id="Item${this.index}">
    </label>
    <i class="fa-solid fa-ellipsis-vertical"></i>`
}

class PgeManager {
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

const pageManager = new PgeManager();
pageManager.loadTasks();
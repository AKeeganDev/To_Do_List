import Task from './task.js';

export default class PageManager {
  taskList = [];

  storageKeyTaskList = 'storageTaskList';

  storageValueTaskList;

  addButton = document.querySelector('.add-button');

  domTaskList = document.getElementById('task-list');

  taskInput = document.querySelector('.task-input');

  checkBoxes = document.querySelectorAll('.check-box');

  changeTaskTextInputs;

  updateButtons;

  clearButton = document.querySelector('.clear-button');

  roundArrow = '<svg id="turn" class="svg-inline--fa fa-share" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M503.7 226.2l-176 151.1c-15.38 13.3-39.69 2.545-39.69-18.16V272.1C132.9 274.3 66.06 312.8 111.4 457.8c5.031 16.09-14.41 28.56-28.06 18.62C39.59 444.6 0 383.8 0 322.3c0-152.2 127.4-184.4 288-186.3V56.02c0-20.67 24.28-31.46 39.69-18.16l176 151.1C514.8 199.4 514.8 216.6 503.7 226.2z"></path></svg><!-- <i id="turn" class="fa-solid fa-share"></i> Font Awesome fontawesome.com -->';

  trashCan = '<svg class="svg-inline--fa fa-trash-can" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-can" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"></path></svg><!-- <i class="fa-solid fa-trash-can"></i> Font Awesome fontawesome.com -->';

  updateCompletion = (parentIndex) => {
    // takes the parent index of a task and matches it to the correct index in the task Array
    for (let i = 0; i < this.taskList.length; i += 1) {
      if (this.taskList[i].index === parentIndex + 1) {
        if (this.taskList[i].completed === true) {
          this.taskList[i].completed = false;
          this.pushTasksToStorage();
          return;
        }
        if (this.taskList[i].completed === false) {
          this.taskList[i].completed = true;
          this.pushTasksToStorage();
        }
      }
    }
  }

  loadCheckBoxListeners = () => {
    this.checkBoxes.forEach((checkbox) => {
      checkbox.addEventListener('click', (e) => {
        e.target.classList.toggle('checked');
        this.updateCompletion(parseInt(e.target.parentElement.parentElement.id, 10));
      });
    });
  }

  pushTasksToStorage = () => {
    const tasksObj = {};
    let counter = 1;
    for (let i = 0; i < this.taskList.length; i += 1) {
      tasksObj[counter] = this.taskList[i];
      counter += 1;
    }
    this.storageValueTaskList = JSON.stringify(tasksObj);
    localStorage.setItem(this.storageKeyTaskList, this.storageValueTaskList);
  }

  removeTask = (parentIndex) => {
    // Matches the parent element Index to the item in the taskArray and removes it
    let newIndex = 1;
    for (let i = 0; i < this.taskList.length; i += 1) {
      if (this.taskList[i].index === parentIndex + 1) {
        this.taskList.splice(i, 1);
      }
    }
    this.taskList.forEach((task) => {
      task.index = newIndex;
      newIndex += 1;
    });
    this.pushTasksToStorage();
    this.loadTasksFromClass();
  }

  loadTaskItemInputListeners = () => {
    this.changeTaskTextInputs = document.querySelectorAll('.task');
    this.changeTaskTextInputs.forEach((input) => {
      input.addEventListener('input', (e) => {
        const index = e.target.parentElement.parentElement.id;
        this.taskList[index].description = e.target.value;
        this.pushTasksToStorage();
      });
    });
    this.changeTaskTextInputs.forEach((input) => {
      input.addEventListener('focus', (e) => {
        const updateButtonIndex = parseInt(e.target.parentElement.parentElement.id, 10) + 1;
        const icon = document.getElementById(`index${updateButtonIndex}`);
        this.updateButtons.forEach((updateButton) => {
          if (updateButton.classList.contains('trashcan')) {
            const updateButtonIndex = parseInt(e.target.parentElement.parentElement.id, 10) + 1;
            updateButton.classList.toggle('trashcan');
            updateButton.innerHTML = Task.toElipses(updateButtonIndex);
          }
        });
        icon.innerHTML = Task.toTrashCan(updateButtonIndex);
        icon.classList.toggle('trashcan');
        if (icon.getAttribute('listener') !== 'true') {
          icon.setAttribute('listener', 'true');
          icon.addEventListener('click', (e) => {
            if (e.target.parentElement.id === '') {
              e.target.parentElement.parentElement.parentElement.remove();
              this.removeTask(parseInt(e.target.parentElement.parentElement.parentElement.id, 10));
            } else {
              e.target.parentElement.parentElement.remove();
              this.removeTask(parseInt(e.target.parentElement.parentElement.id, 10));
            }
          });
        }
      });
    });
  }

  loadUpdateButtonListeners = () => {
    this.updateButtons = document.querySelectorAll('.update-button');
  }

  pullFromStorage = () => {
    const tasksObj = JSON.parse(localStorage.getItem(this.storageKeyTaskList));
    Object.values(tasksObj).forEach((task) => {
      const index = this.taskList.length + 1;
      const oldTask = new Task(task.description);
      oldTask.completed = task.completed;
      oldTask.index = index;
      this.taskList.push(oldTask);
    });
  }

  loadClearButtonListener = () => {
    this.clearButton.addEventListener('click', () => {
      const incompletedTasks = this.taskList.filter((task) => task.completed === true);
      for (let i = 0; i < incompletedTasks.length; i += 1) {
        const arrayIndex = incompletedTasks[i].index - 1;
        this.removeTask(arrayIndex);
      }
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
    this.loadTaskItemInputListeners();
    this.loadUpdateButtonListeners();
  }

  addTask = () => {
    if (!this.taskInput.value) return;
    const counter = this.taskList.length + 1;
    const newTask = new Task(this.taskInput.value);
    newTask.index = counter;
    this.taskList.push(newTask);
    this.taskInput.value = '';
    this.loadTasksFromClass();
    this.pushTasksToStorage();
  }

  pageSetup = () => {
    // checks local storage and adds content to page if available
    if (localStorage.storageTaskList !== undefined) {
      this.pullFromStorage();
      this.loadTasksFromClass();
    }
    this.addButton.addEventListener('click', () => {
      this.addTask();
    });

    this.taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTask();
      }
    });

    this.loadClearButtonListener();
  };
}
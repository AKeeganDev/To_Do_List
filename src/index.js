/* eslint-disable max-classes-per-file */

import './style.scss';
import PageManager from './modules/pagemanager.js';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';

const pageManager = new PageManager();
pageManager.loadTasks();
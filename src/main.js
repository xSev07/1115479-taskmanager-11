import {createBoardTemplate} from "./components/board.js";
import {createFilterTemplate} from "./components/filter.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";
import {taskCounts, PlaceInsert} from "./const";

const render = (container, htmlText, place = PlaceInsert.BEFORE_END) => {
  container.insertAdjacentHTML(place, htmlText);
};

const renderTasks = (start, finish) => {
  tasks.slice(start, finish)
    .forEach((task) => {
      render(taskListElement, createTaskTemplate(task));
    });
};


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

const tasks = generateTasks(taskCounts.ALL);

render(boardElement, createSortingTemplate(), PlaceInsert.AFTER_BEGIN);
render(taskListElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = taskCounts.SHOWING_ON_START;
renderTasks(1, showingTasksCount);
render(boardElement, createLoadMoreButtonTemplate());

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTaskCount = showingTasksCount;
  showingTasksCount = showingTasksCount + taskCounts.SHOWING_BY_BUTTON;
  renderTasks(prevTaskCount, showingTasksCount);

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});


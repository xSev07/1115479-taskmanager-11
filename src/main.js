import {createSiteMenuTemplate} from "./components/site-menu";
import {createLoadMoreButtonTemplate} from "./components/load-more-button";
import {createTaskTemplate} from "./components/task";
import {createTaskEditTemplate} from "./components/task-edit";
import {createBoardTemplate} from "./components/board";
import {createFilterTemplate} from "./components/filter";
import {createSortingTemplate} from "./components/sorting";

const TASK_COUNT = 3;
const PlaceInsert = {
  BEFORE_END: `beforeend`,
  AFTER_BEGIN: `afterbegin`
};

const render = (container, htmlText, place = PlaceInsert.BEFORE_END) => {
  container.insertAdjacentHTML(place, htmlText);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), PlaceInsert.AFTER_BEGIN);
render(taskListElement, createTaskEditTemplate());
for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate());
}
render(boardElement, createLoadMoreButtonTemplate());

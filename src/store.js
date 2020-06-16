import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "./default-board"; //import default board
import { saveStatePlugin, uuid } from "./utils";

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ""
      });
    },
    UPDATE_TASK(state, { task, key, value }) {
      //task[key] = value
      Vue.set(task, key, value);
    },
    /* move tasks between categories */
    MOVE_TASK(state, { fromTasks, taskIndex, toTasks, toTaskIndex }) {
      //splice() changes the content of array by removing/replacing existing elements and/or adding new elements
      //pick and remove task from fromColumn
      const taskToMove = fromTasks.splice(taskIndex, 1)[0]; //splice(startIndex, deleteCount) -> return array with deleted elements
      //insert task to toColumn
      toTasks.splice(toTaskIndex, 0, taskToMove); //splice(index, 0, insertItem) -> insert item in arr at index
    },
    /* reorder categories */
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns;
      //pick and remove column from columnList
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0];
      //insert column at certain position again in columnList
      columnList.splice(toColumnIndex, 0, columnToMove);
    }
  },
  getters: {
    getTask(state) {
      return id => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task;
            }
          }
        }
      };
    }
  }
});

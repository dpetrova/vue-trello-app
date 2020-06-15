<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <!-- categories -->
      <!-- @drop event make our column can accept an element being dropped -->
      <!-- @dragenter event -> a dragged item enters a valid drop target -->
      <!-- @dragover event -> dragged item is being dragged over a valid drop target, every few hundred milliseconds -->
      <div
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        @drop="moveTask($event, column.tasks)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <!-- tasks -->
          <!-- draggable attribute will make it possible to drag the div around along with its content -->
          <!-- listen to @dragstart event -> react to the task being dragged with pickupTask() -->
          <div
            class="task"
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            @click="goToTask(task)"
            draggable
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
          >
            <span class="w-full flex-no-shrink font-bold">
              {{ task.name }}
            </span>
            <p
              v-if="task.description"
              class="w-full flex-no-shrink mt-1 text-sm"
            >
              {{ task.description }}
            </p>
          </div>
          <!-- enter a new task -->
          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
      </div>
    </div>

    <!-- placeholder for display modal task-->
    <!-- click on this background (click.self -> capture clicks only on this div) will close modal task -->
    <div
      class="task-bg"
      v-if="isTaskOpen"
      @click.self="close"
    >
      <router-view/>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
    },
    close() {
      this.$router.push({ name: "board" });
    },
    createTask(e, tasks) {
      this.$store.commit("CREATE_TASK", { tasks, name: e.target.value });
      // clear the input
      e.target.value = "";
    },
    pickupTask(e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      /* define the drag effect */
      //dropEffect property is used to control the feedback the user is given during a drag-and-drop operation
      //it typically affects which cursor the browser displays while dragging
      e.dataTransfer.dropEffect = "move";
      /* define the drag's data */
      //setData() method is used to add an item to the drag data
      //dataTransfer interface works similar to localStorage in that it can only store properties that can be stringified
      e.dataTransfer.setData("task-index", taskIndex);
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
    },
    moveTask(e, toTasks) {
      //take the information transferred through the dataTransfer interface and locate our tasks list
      const fromColumnIndex = e.dataTransfer.getData("from-column-index");
      const fromTasks = this.board.columns[fromColumnIndex].tasks;
      const taskIndex = e.dataTransfer.getData("task-index");

      this.$store.commit("MOVE_TASK", {
        fromTasks,
        toTasks,
        taskIndex
      });
    }
  }
};
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>

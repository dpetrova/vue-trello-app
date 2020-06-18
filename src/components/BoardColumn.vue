<template>
      <!-- draggable attribute will make it possible to drag the div around along with its content -->
      <!-- @drop event make our column can accept an element being dropped -->
      <!-- @dragenter event -> a dragged item enters a valid drop target -->
      <!-- @dragover event -> dragged item is being dragged over a valid drop target, every few hundred milliseconds -->
      <!-- @dragstart.self event -> react to the column being dragged (.self -> capture event only on this div) -->
    <div
        class="column"
        draggable
        @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        @dragstart.self="pickupColumn($event, columnIndex)"
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <ColumnTask
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            :task="task"
            :taskIndex="$taskIndex"
            :column="column"
            :columnIndex="columnIndex"
            :board="board"
          />
          <!-- enter a new task -->
          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
    </div>
</template>
    
<script>
import ColumnTask from "./ColumnTask";
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";

export default {
  components: { ColumnTask },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    pickupColumn(e, columnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.setData("from-column-index", columnIndex);
      e.dataTransfer.setData("type", "column");
    },
    createTask(e, tasks) {
      this.$store.commit("CREATE_TASK", { tasks, name: e.target.value });
      e.target.value = ""; // clear the input
    }
  }
};
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
<template>
    <!-- add drop event listener on every task, so that we can catch other tasks being dropped on top of it -->
    <!-- @drop.stop -> add stop modifier to stop bubbling propagation of event to DOM -->
    <div
      class="task"
      @click="goToTask(task)"
      draggable
      @dragstart="pickupTask($event, taskIndex, columnIndex)"      
      @dragover.prevent
      @dragenter.prevent
      @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
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
</template>

<script>
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";

export default {
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
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
      e.dataTransfer.setData("type", "task");
    }
  }
};
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
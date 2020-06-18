export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    moveTaskOrColumn(e, toTasks, toColumnIndex, taskIndex) {
      const type = e.dataTransfer.getData("type");
      if (type === "task") {
        this.moveTask(
          e,
          toTasks,
          taskIndex !== undefined ? taskIndex : toTasks.length
        );
      } else {
        this.moveColumn(e, toColumnIndex);
      }
    },
    moveTask(e, toTasks, toTaskIndex) {
      //take the information transferred through the dataTransfer interface and locate our tasks list
      const fromColumnIndex = e.dataTransfer.getData("from-column-index");
      const fromTasks = this.board.columns[fromColumnIndex].tasks;
      const taskIndex = e.dataTransfer.getData("task-index");
      this.$store.commit("MOVE_TASK", {
        fromTasks,
        taskIndex,
        toTasks,
        toTaskIndex
      });
    },
    moveColumn(e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData("from-column-index");
      this.$store.commit("MOVE_COLUMN", {
        fromColumnIndex,
        toColumnIndex
      });
    }
  }
};

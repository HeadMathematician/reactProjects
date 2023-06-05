import React from "react";
import Task from "./Task";
import styles from "./TaskGrid.module.css";

const TaskGrid = ({ tasks, deleteTask, editTask, addFinishedTask }) => {
  return (
    <div className={styles.gridContainer}>
      <h3>Pending Tasks</h3>
      <div className={styles.taskContainer}>
        {tasks.map((task) => (
          <div key={task.taskID}>
            <Task task={task} taskID={task.id} deleteTask={deleteTask} editTask={editTask} addFinishedTask={addFinishedTask} />
          </div>
        ))}
      </div>
      </div>
      
  );
};

export default TaskGrid;

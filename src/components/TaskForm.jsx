// TaskForm.js

import React, { useState } from "react";
import styles from "./TaskForm.module.css";
import { createDocument } from "../services/MainService";

const TaskForm = ({ addTask }) => {
  const [data, setData] = useState("");

  const newTaskHandler = async (event) => {
    event.preventDefault();

    const taskData = {
      taskID: Math.round(Math.random() * 1000),
      taskDesc: data,
    };

    if(data.trim().length < 1){
      alert("You can not add an empty task");
      return;
    }

    await createDocument(taskData);
    addTask(taskData);
    setData("");
  };

  const taskChangeHandler = (event) => {
    setData(event.target.value);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={newTaskHandler}>
        <h3>New Task</h3>
        <div className={styles.formContainer}>
          
          <input
            type="text"
            placeholder="Study React"
            value={data}
            onChange={taskChangeHandler}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Add</button>
        </div>
        
      </form>
    </div>
  );
};

export default TaskForm;

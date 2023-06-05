import React, { useState, useEffect } from "react";
import TaskGrid from "./components/TaskGrid";
import NewTask from "./components/NewTask";
import { getAllDocuments } from "./services/MainService";
import FinishedTasks from "./components/FinishedTasks";
import styles from "./App.module.css";

import { getFinishedTasks } from "./services/FinishedTasksService";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rows = await getAllDocuments();
        setTasks(rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [tasks.length]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const rows = await getFinishedTasks();
        setFinishedTasks(rows);
      }catch(error){
        console.error(error);
      }
    };
    fetchData();
  }, [finishedTasks.length])

  const addTask = (taskData) => {
    setTasks([...tasks, {...taskData, id: taskData.id}]);
  };

  const deleteTask = (id) =>{
    const newData = tasks.filter((row) => row.id !== id)
    setTasks(newData);
  }

  const editTask = (taskData) => {
    const newData = tasks.map((task) => {
      if(task.id === taskData.id) {
        return { ...task, taskDesc: taskData.taskDesc}
      }
      return task;
    })
    setTasks(newData)
  }

  const addFinishedTask = (taskData) => {
    setFinishedTasks([...finishedTasks, {taskData}]);
  };

  const archiveFinishedTask = (id) => {
    const newData = finishedTasks.filter((row) => row.id !== id);
    setFinishedTasks(newData);
  }

  return (
    <div>
      
      <div className={styles.tasksContainer}>
        <NewTask addTask={addTask} />
        <TaskGrid tasks={tasks} deleteTask={deleteTask} editTask={editTask} addFinishedTask={addFinishedTask} />
        <FinishedTasks finishedTasks={finishedTasks} archiveFinishedTask={archiveFinishedTask} />
      </div>
      
    </div>
  );
};

export default App;

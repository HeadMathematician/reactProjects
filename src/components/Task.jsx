import React, { useState } from "react";
import styles from "./Task.module.css";
import { FaCheck, FaEdit, FaTrashAlt } from 'react-icons/fa';

import { deleteDocument, editDocument } from "../services/MainService";
import { createFinishedTask } from "../services/FinishedTasksService";

const Task = ({ task, taskID, deleteTask, editTask, addFinishedTask }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTaskDesc, setEditedTaskDesc] = useState(task.taskDesc);

  const deleteTaskHandler = async () => {
    const finishedTaskData = createFinishedTask({
      taskID: task.taskID,
      taskDesc: task.taskDesc
    });
    addFinishedTask(finishedTaskData);
    await deleteDocument(taskID);
    deleteTask(taskID);
  };

  const removeTaskHandler = async (id) => {
    await deleteDocument(id)
    deleteTask(id);
  }

  const editTaskHandler = () => {
    setEditMode(true);
  };

  const saveTaskHandler = async() => {
	const data = {
		id: taskID,
		taskDesc: editedTaskDesc,
	}
	await editDocument(taskID, data)
	editTask(data);
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    setEditedTaskDesc(event.target.value);
  };

  return (
    <div className={styles.task}>
      {editMode ? (
        <>
          <input
            type="text"
            value={editedTaskDesc}
            onChange={handleInputChange}
          />
          <div className={styles.saveButtonContainer}>
            <button
              onClick={saveTaskHandler}
              className={styles.saveButton}
            >
              <FaCheck />
            </button>
          </div>
        </>
      ) : (
        <>
          <label>{task.taskDesc}</label>
          <div className={styles.buttons}>
            <button onClick={() => removeTaskHandler(taskID)} className={styles.removeTask}><FaTrashAlt /></button>
            <button onClick={editTaskHandler} className={styles.edit}>
              <FaEdit />
            </button>
            <button onClick={deleteTaskHandler} className={styles.done}>
              <FaCheck />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;

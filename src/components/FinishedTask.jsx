import React from "react";
import { MdArchive } from 'react-icons/md';

import styles from "./FinishedTask.module.css";

import { deleteFinishedTask } from "../services/FinishedTasksService";

const FinishedTask = ({ task, archiveFinishedTask }) => {

    const deleteHandler = async (id) => {
        await deleteFinishedTask(id);
        archiveFinishedTask(id);
    }

	return (
		<div className={styles.task}>
			<label>{task.taskDesc}</label>
			<div className={styles.buttons}></div>
            <button onClick={() => deleteHandler(task.id)} className={styles.deleteTask}><MdArchive className={styles.archiveIcon} /></button>
		</div>
	);
};

export default FinishedTask;

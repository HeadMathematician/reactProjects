import React from "react";

import styles from "./FinishedTasks.module.css";

import FinishedTask from "./FinishedTask";

const FinishedTasks = ({finishedTasks, archiveFinishedTask}) => {
    return (<div>
        <h3>Finished Tasks</h3>
        {<div className={styles.taskContainer}>
        {finishedTasks.map((task) => (
          <div key={task.taskID}>
            <FinishedTask task={task} archiveFinishedTask={archiveFinishedTask} />
          </div>
        ))}
      </div> }
    </div>)
}


export default FinishedTasks;
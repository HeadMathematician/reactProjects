import React from 'react';
import TaskForm from './TaskForm';

const NewTask = ({ addTask }) => {
    return(
        <div>
            <TaskForm addTask={addTask} />
        </div>
    )
}

export default NewTask;
import axios from 'axios';
import {TaskTile} from './TaskTile'
import {useEffect, useState} from "react";

export const TaskList = () => {
    const [taskList, setTaskList] = useState([]);
    useEffect(() => {
        getTaskList()
    }, []);

    const getTaskList = () => {
        axios.get(`/engine-rest/task`)
            .then((response) => {
                setTaskList(response.data);
            })
    }
    return (
        <div className='task-list'>
            {
                taskList.map((task) => {
                    return (
                        <TaskTile id={task.id} name={task.name} assignee={task.assignee}/>
                    )
                })
            }
        </div>
    )
}
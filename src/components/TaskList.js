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
    const startProcess = () => {
        axios.post(`/engine-rest/process-definition/key/software/start`, {})
            .then((response) => {
                axios.get(`/engine-rest/task?processInstanceId=${response.data.id}`)
                    .then((response) => {
                        document.location = `/task/${response.data[0].id}`
                    })
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
            <button onClick={startProcess}>Старт</button>
        </div>
    )
}
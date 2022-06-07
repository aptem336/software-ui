import axios from 'axios';
import {TaskTile} from './TaskTile'
import {useEffect, useState} from "react";

export const TaskList = () => {
    const [taskList, setTaskList] = useState([]);
    useEffect(() => {
        getTaskList()
    }, []);

    const getTaskList = () => {
        axios.post(`/task`, {})
            .then((response) => {
                setTaskList(response.data);
            })
    }
    const startProcess = () => {
        axios.post(`/order/start`, {})
            .then((response) => {
                axios.post(`/task`, {
                    processInstanceId: response.data.processInstanceId
                }).then((response) => {
                    document.location = `/task/${response.data[0].id}`
                })
            })
    }
    const filterByOrderNumber = (event) => {
        axios.post(`/task`, {
            orderNumber: event.target.value
        }).then((response) => {
            setTaskList(response.data);
        })
    }
    return (
        <>
            <p className={'title'}>
                Список задач
                <input placeholder={'Номер заявки'} onInput={filterByOrderNumber}/>
                <button className={'submit'} onClick={startProcess}>Создать заявку на закупку ПО</button>
            </p>
            <div className='task-list'>
                {
                    taskList.map((task) => {
                        return (
                            <TaskTile id={task.id}
                                      name={task.name}
                                      orderNumber={task.orderNumber}
                                      assignee={task.assignee}
                                      created={task.created}/>
                        )
                    })
                }
            </div>
        </>
    )
}
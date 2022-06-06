import {useEffect, useState} from "react";
import axios from "axios";

export const Task = ({id}) => {
    const [taskDeployedForm, setTaskDeployedForm] = useState();
    const [taskFormVariables, setTaskFormVariables] = useState(new Map());
    useEffect(() => {
        getTaskDeployedForm()
        getTaskFormVariables()
    }, []);

    const getTaskDeployedForm = () => {
        axios.get(`${id}/form`)
            .then((response) => {
                setTaskDeployedForm(response.data);
            })
    }
    const getTaskFormVariables = () => {
        axios.get(`/task/${id}/variables`)
            .then((response) => {
                setTaskFormVariables(new Map(Object.entries(response.data)));
            })
    }
    const onChange = (event, key) => {
        if (event.target.type === 'checkbox') {
            taskFormVariables.set(key, event.target.checked)
        } else {
            taskFormVariables.set(key, event.target.value)
        }
    }
    const complete = () => {
        axios.post(`/task/${id}/complete`, {
            variables: taskFormVariables
        }).then()
    }
    return (
        <form className={'form'} action={'/task'}>
            <p className={'title'}>
                Заполните форму
                <button className={'submit'} onClick={complete}>Отправить</button>
            </p>
            {
                taskDeployedForm?.fields?.map((field) => {
                    return <div>
                        <label>
                            {field?.label} {field?.validate?.required && '*'}<br/>
                            <input className={'input'}
                                   type={field?.type}
                                   value={taskFormVariables && taskFormVariables[field?.key]?.value}
                                   readOnly={field?.readonly}
                                   disabled={field?.readonly}
                                   required={field?.required}
                                   onChange={event => onChange(event, field.key)}/><br/>
                        </label><br/>
                    </div>
                })
            }
        </form>
    )
}
import {useEffect, useState} from "react";
import axios from "axios";

export const Task = ({id}) => {
    const [taskDeployedForm, setTaskDeployedForm] = useState();
    const [taskFormVariables, setTaskFormVariables] = useState();
    useEffect(() => {
        getTaskDeployedForm()
        getTaskFormVariables()
    }, []);

    const getTaskDeployedForm = () => {
        axios.get(`/engine-rest/task/${id}/deployed-form`)
            .then((response) => {
                setTaskDeployedForm(response.data);
            })
    }
    const getTaskFormVariables = () => {
        axios.get(`/engine-rest/task/${id}/form-variables`)
            .then((response) => {
                setTaskFormVariables(response.data);
            })
    }
    const onChange = (event, key) => {
        if (event.target.type === 'checkbox') {
            taskFormVariables[key].value = event.target.checked
        } else {
            taskFormVariables[key].value = event.target.value
        }
    }
    const complete = () => {
        axios.post(`/engine-rest/task/${id}/complete`, {
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
                taskDeployedForm?.components?.map((component) => {
                    return <div>
                        <label>
                            {component?.label} {component?.validate?.required && '*'}<br/>
                            <input className={'input'}
                                   type={component?.type}
                                   value={taskFormVariables && taskFormVariables[component?.key]?.value}
                                   readOnly={component?.validate?.readonly}
                                   disabled={component?.validate?.readonly}
                                   required={component?.validate?.required}
                                   onChange={event => onChange(event, component.key)}/><br/>
                        </label><br/>
                    </div>
                })
            }
        </form>
    )
}
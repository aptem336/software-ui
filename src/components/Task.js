import {useEffect, useState} from "react";
import axios from "axios";

export const Task = ({id}) => {
    const [taskRenderedForm, setTaskRenderedForm] = useState();
    useEffect(() => {
        getTaskList()
    }, []);

    const getTaskList = () => {
        axios.get(`/engine-rest/task/${id}/rendered-form`)
            .then((response) => {
                setTaskRenderedForm(response.data);
            })
    }
    return (
        <div>
            <form dangerouslySetInnerHTML={{__html: taskRenderedForm}}/>
            <br/>
            {taskRenderedForm}
        </div>
    )
}
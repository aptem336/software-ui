import {useEffect, useState} from "react";
import axios from "axios";
import Moment from "moment";

export const Report = () => {
    const [report, setReport] = useState([]);
    useEffect(() => {
        getReport()
    }, []);

    const getReport = () => {
        axios.get(`/report`)
            .then((response) => {
                setReport(response.data);
            })
    }

    return (
        <>
            <p className={'title'}>
                <button className={'submit'} onClick={() => {
                    document.location = `/task`
                }}>Список задач
                </button>
            </p>
            <p className={'title'}>
                Отчёт по закупке ПО
                <br/>
            </p>
            <table className={'report'}>
                <tr>
                    <th>Название ПО</th>
                    <th>Цена</th>
                    <th>Дата</th>
                    <th>Инициатор</th>
                </tr>
                {
                    report?.map(row => {
                        return <tr>
                            <td>{row.software}</td>
                            <td>{row.price}</td>
                            <td>{Moment(row.startTime).format('hh:mm:ss DD/MM/yyyy')}</td>
                            <td>{row.startUserId}</td>
                        </tr>
                    })
                }
            </table>
        </>
    )
}
import Moment from 'moment';

export const TaskTile = ({id, name, orderNumber, assignee, created}) => {
    return (
        <div className='task-tile' onClick={() => document.location = `/task/${id}`}>
            <p>{name}</p>
            <p>{orderNumber}</p>
            <p>{assignee}</p>
            <p title={created}>{Moment(created).fromNow()}</p>
        </div>
    )
}
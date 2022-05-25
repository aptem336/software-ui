import Moment from 'moment';

export const TaskTile = ({id, name, assignee, created}) => {
    return (
        <div className='task-tile' onClick={() => document.location = `/task/${id}`}>
            <p>{name}</p>
            <p>{assignee}</p>
            <p title={created}>{Moment(created).fromNow()}</p>
        </div>
    )
}
export const TaskTile = ({id, name, assignee}) => {
    return (
        <div className='task-tile' onClick={() => document.location = `/task/${id}`}>
            <p>{name}</p>
            <p>{assignee}</p>
        </div>
    )
}
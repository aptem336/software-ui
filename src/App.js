import './App.css';
import {TaskList} from './components/TaskList'
import {Task} from './components/Task'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
    return (
        <Router>
            <Route exact path='/task' component={TaskList}/>
            <Route exact path='/task/:id' component={(match) => <Task id={(match.match.params.id)}/>}/>
        </Router>
    );
}

export default App;

import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
    state = {
        filterName: '',
        filterStatus: 0, // all 0, Done: 1, Pending: -1
    }

    onChange = (event) => {
        
        let { target: { name, value } } = event;
        
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
        );
        this.setState({
            [name]: value
        });
    }

    onClick = (e)=> {
        e.preventDefault();
        console.log("sort by: " );
        console.log("sort value: ");

    }

    render() {
        const { tasks } = this.props; //const tasks = this.props.tasks
        const { filterName, filterStatus} = this.state;
        const taskElement = tasks.map((task, index) => {
            return <TaskItem 
                key={ task.id } index={ index } task={ task }
                onUpdateStatus={ this.props.onUpdateStatus }
                onDelete= { this.props.onDelete }
                onEdit= { this.props.onEdit }
                onHighlight={ this.props.onHighlight }
            />
        });
        
        
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr className="">
                        <th className="text-center">No.</th>
                        <th className="text-center">Tasks</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Manipulation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="filterName"
                                value={ filterName }
                                onChange={ this.onChange }
                            />
                        </td>
                        <td>
                            <select 
                                className="form-control"
                                name="filterStatus"
                                value={ filterStatus }
                                onChange={ this.onChange }
                            >
                                <option value="0">All</option>
                                <option value="-1" onClick={this.onClick}>Pending</option>
                                <option value="1">Done</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {taskElement}
                </tbody>
            </table>

        );
    }
}

export default TaskList;
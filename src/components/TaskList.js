import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
    state = {}
    render() {
        //const tasks = this.props.tasks
        const {tasks} = this.props;
        const taskElement = tasks.map((task, index) => {
            return <TaskItem 
                key={ task.id } index={ index } task={ task }
                onUpdateStatus={ this.props.onUpdateStatus }
                onDelete= { this.props.onDelete }
                onEdit= { this.props.onEdit }
                //onSubmit={this.props.onSubmit}
            />
        });
        
        
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
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
                            <input type="text" className="form-control" />
                        </td>
                        <td>
                            <select className="form-control">
                                <option value="-1">All</option>
                                <option value="0">Pending</option>
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
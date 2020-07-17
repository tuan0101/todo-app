import React, { Component } from 'react';

class TaskItem extends Component {
    state = {}
    render() {
        const { task, index } = this.props;
        return (
            <tr>
                <td className="text-center">{index + 1}</td>
                <td>{task.title}</td>
                <td className="text-center">
                    <span
                        className={task.status === true ?
                            'label label-success' : 'label label-danger'}
                    >
                        {task.status === true ? 'Done' : 'Pending'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-5"></span>Sửa
                        </button>
                        &nbsp;
                        <button type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5"></span>Xóa
                        </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;
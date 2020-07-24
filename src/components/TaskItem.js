import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable'

class TaskItem extends Component {

    state = {
        title: '',
        isEditing: false
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);

    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onEdit = () => {
        //this.props.onEdit(this.props.task.id);
    }

    onEditing = () => {
        let { isEditing } = this.state;
        isEditing = true;
        this.setState({
            isEditing: isEditing
        });
        console.log('isEditing: ' + isEditing);

        // this direct syntax doesn't work
        // this.setState({
        //     isEditing: !isEditing
        // });
    }

    onChange = (event) => {
        let { target: { name, value } } = event;

        this.setState({
            [name]: value
        });
    }

        

    onSubmit = (event) => {
        if (event.keyCode === 13) {
            console.log('pressed enter');
            event.target.blur(); // remove focus after press enter
            this.props.onSubmit(this.state);
        }
    }

    onSave = () => {
        console.log('title: ' + this.state.title);


    }

    componentWillMount(){
        this.setState({
            title: this.props.task.title
        });
    }
    render() {
        const { task, index } = this.props;
        const addButton = this.state.isEditing ?
            <button
                className="btn"
                style={{ float: 'right', cursor: 'pointer' }}
                onClick={this.onSave}
            >
                <span className="fa fa-plus mr-5"></span>
                    add
                </button> : '';
        const addInput = this.state.isEditing ?
            <input
                style={inputStyle}
            >
            </input> : '';


        return (
            <tr>
                <td className="text-center">{index + 1}</td>
                <td
                /*  contentEditable={this.state.isEditing ? "true" : "false"}
                  suppressContentEditableWarning="true"
                  onClick={this.onEditing}
                  ref={(input) => { this.textInput = input; }}
                  type="text"
                  name="title"
                  value={this.state.title}
                  onKeyUp={this.onChange} */

                >
                    {/* <ContentEditable 
                        html={task.title}
                        name='title'
                        value={this.state.title}
                        onChange={ this.onChange }>
                        
                    </ContentEditable> */}

                    <input 
                        type="text"
                        name="title"
                        style={ textStyle }
                        value={this.state.title}
                        onChange={this.onChange}
                        onKeyUp={ this.onSubmit }
                    />


                </td>
                <td className="text-center">
                    <span
                        style={{ cursor: 'pointer' }}
                        className={task.status === true ?
                            'label label-success' : 'label label-danger'}
                        onClick={this.onUpdateStatus}
                    >
                        {task.status === true ? 'Done' : 'Pending'}
                    </span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.onEdit}
                    >
                        <span className="fa fa-pencil mr-5">
                        </span>Highlight

                        </button>
                        &nbsp;
                        <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDelete}
                    >
                        <span className="fa fa-trash mr-5"></span>Delete
                        </button>
                </td>
            </tr>
        );
    }
}
const textStyle = {
    border: "none",
    width: "100%",
    height: "inherit%",
}

const inputStyle = {
    width: "auto",
    height: "auto"
}

export default TaskItem;
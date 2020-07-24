import React, { Component } from 'react';
import './css/App.css';
import './components/TaskForm';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import AddItem from './components/AddItem';


class App extends Component {
    state = {
        tasks: [],
        isDisplayForm: false,
        isEditing: false
    }

    // this function is called once after refresh the page
    // to paste the data in localStorage to setState
    componentDidMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            //convert strings to object
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            });
        }
    } 

    // generate UUID
    h4() {
        // Hexadecimal number: 16^4
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID() {
        return this.h4() + this.h4() + '-' + this.h4() + '-' + this.h4() + '-' +
            this.h4() + '-' + this.h4() + this.h4() + this.h4();
    }

    onToggleForm = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        })
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        })
    }

    onSubmit = (data) => {
        // const task = {
        //     id: this.generateID(),
        //     name: data.name,
        //     status: data.target
        // }
        const { tasks } = this.state;
        data.id = this.generateID(); //add ID attribution to data (tasks)
        tasks.push(data);
        this.setState({
            tasks: tasks
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(tasks);
    }

    onUpdateStatus = (id) => {
        let tempTask = this.state.tasks.map((task) => {
            if (task.id === id) {
                task.status = !task.status;
            }
            return task;
        });

        this.setState({
            tasks: tempTask
        });
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }

    onDelete = (id) => {
        let tempTask = this.state.tasks.filter(task =>
            task.id !== id);
        this.setState({
            tasks: tempTask
        });
    
        localStorage.setItem('tasks', JSON.stringify(tempTask));
        // this doesn't work because this.setState may not update fast enough
        //localStorage.setItem('tasks', JSON.stringify(this.state.tasks));       
    }

    onEdit = (id) => {
        console.log('edit: ' + id);
        
    }

    render() {
        // const tasks = this.state.tasks
        const { tasks, isDisplayForm } = this.state;
        const taskFormElement = isDisplayForm ?
            <TaskForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} /> : '';

        return (
            <div className="container">
                <div className="text-center">
                    <h1>To-do List</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={isDisplayForm ? 'width-30' : ''}>
                        {/* form */}
                        {taskFormElement}
                    </div>
                    <div className={isDisplayForm ? 'width-60' : 'width-100'}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-5"></span>Add a task
                        </button>
                        <AddItem onSubmit={this.onSubmit}/>
                        {/* Search - Sort */}
                        <Control />
                        {/* List */}
                        <div className="row">
                            <div className="width-100 mt-15">
                                <TaskList
                                    tasks={tasks}
                                    onUpdateStatus={this.onUpdateStatus}
                                    onDelete={this.onDelete}
                                    onEdit= { this.onEdit }
                                    onSubmit={this.onSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;


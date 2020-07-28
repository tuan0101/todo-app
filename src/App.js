import React, { Component } from 'react';
import './css/App.css';
import './components/TaskForm';
import TaskForm from './components/TaskForm';
import Sort from './components/Sort';
import TaskList from './components/TaskList';
import AddItem from './components/AddItem';


class App extends Component {
    state = {
        tasks: [],
        isDisplayForm: false,
        isEditing: false,
        filter: {
            name: '',
            status: 0
        }
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

    onEdit = (id, data) => {
        const { tasks } = this.state;   
        
        if (id === '') {
            // add a new task
            data.id = this.generateID();
            tasks.push(data);
        } else {
            // edit current task

            let tempTask = this.state.tasks.map((task) => {
                if (task.id === id) {
                    task.title = data.title;
                }
                return task;
            });

            this.setState({
                tasks: tempTask
            });

        }
        console.log('data: ' + JSON.stringify(data.title) );
        // this.setState({
        //     tasks: tasks
        // });

        localStorage.setItem('tasks', JSON.stringify(tasks));

    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        });
    }

    render() {
        // const tasks = this.state.tasks
        let { tasks, isDisplayForm, filter } = this.state;

        const taskFormElement = isDisplayForm ?
            <TaskForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} /> : '';

        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((task) => {
                    return task.title.toLowerCase().indexOf(filter.name) !== -1;
                });
            }

            tasks = tasks.filter((task) => {
                if (filter.status === 0) {
                    return task;
                } else {
                    return task.status === (filter.status === 1 ? true : false)
                }
            });

        }
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

                         {/* Open task form */}
                        {/* <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-5"></span>Add a task
                        </button> */}
                        <AddItem onSubmit={this.onSubmit} />
                        {/* Search - Sort */}
                        <Sort />
                        {/* List */}
                        <div className="row">
                            <div className="width-100 mt-15">
                                <TaskList
                                    tasks={tasks}
                                    onUpdateStatus={this.onUpdateStatus}
                                    onDelete={this.onDelete}
                                    onEdit={this.onEdit}
                                    onSubmit={this.onSubmit}
                                    onFilter={this.onFilter}
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


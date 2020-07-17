import React, { Component } from 'react';

class TaskForm extends Component {
    constructor (props){
        super(props);
        this.state = {
            title: '',
            status: false
        }
    }
    
    

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        // const target = event.target;
        // const field = target.name;
        // let value = target.value;
        let { target: {name, value}} =event;

        if (name === 'status'){
            value = event.target.value === 'true' ? true : false;
        }
        
        
        this.setState({
           [name]: value
        });
        
    }

    onSubmit = (event) => {
        event.preventDefault();
        //this.props.onSubmit(this.state); -> this return the status as a string
        this.props.onSubmit(this.state);
    }

    onClear = () => {
        this.setState({
            title: '',
            status: false
        });
    }

    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h4 className="panel-title">Thêm Công Việc
                            <span
                            className="fa fa-times-circle float-right"
                            onClick={this.onCloseForm}
                        ></span>
                    </h4>

                </div>
                <div className="panel-body">
                    <form onSubmit={ this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text" 
                                name="title"
                                className="form-control" 
                                value={ this.state.title }
                                onChange={this.onChange }
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select 
                            name="status"
                            className="form-control" 
                            required="required"
                            value={ this.state.status }
                            onChange={ this.onChange }
                        >
                            <option value={ true }>Kích Hoạt</option>
                            <option value={ false }>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning "
                            onClick={ this.test }>
                                <i className="fa fa-plus mr-5"></i>
                                        Thêm
                                    </button>&nbsp;
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={ this.onClear }
                            >
                                <i className="fa fa-times mr-5"></i>
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
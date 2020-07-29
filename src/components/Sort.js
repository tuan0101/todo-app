import React, { Component } from 'react';

class Sort extends Component {
    state = { 
        sort: {
            by: 'name',
            value: 1
        }
     }

    onClick = (sortBy, sortValue) =>{
        console.log("sort by: " + sortBy);
        console.log("sort value: " + sortValue);
        
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue
            }
        });
        this.props.onSort(this.state.sort);
    }
    render() { 
        const { sort } = this.state;
        return (  
            <div className="width-50">
                    <div className="dropdown">
                        <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenu1"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                        >
                            Sort <span className="fa fa-caret-square-o-down"></span>

                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={ () => this.onClick('name', 1) }>
                                <a 
                                    role="button"
                                    className={ (sort.by === 'name' && sort.value === 1) ?
                                        "sort-selected" : '' }
                                >
                                    <span className="fa fa-sort-alpha-asc pr-5">
                                        {' '}Name A-Z
                                    </span>
                                </a>
                            </li>
                            <li onClick={ () => this.onClick('name', -1) }>
                                <a 
                                    role="button"
                                    className={ (sort.by === 'name' && sort.value === -1) ?
                                        "sort-selected" : '' }
                                >
                                    <span className="fa fa-sort-alpha-desc pr-5">
                                        {' '}Name Z-A
                                    </span>
                                </a>
                            </li>
                            <li role="separator" className="divider"></li>
                            <li onClick={ () => this.onClick('status', 1) }>
                                <a 
                                    role="button"
                                    className={`fa ${(sort.by === 'status' && sort.value === 1) ?
                                        "sort-selected" : ''}`}
                                    style={{ fontWeight: "bold"}}
                                >
                                    <i className="fa fa-check-circle-o mr-5" aria-hidden="true"></i>
                                    Done
                                </a>
                            </li>
                            <li onClick={ () => this.onClick('status', -1) }>
                                <a 
                                    role="button"
                                    className={`fa ${(sort.by === 'status' && sort.value === -1) ?
                                    "sort-selected" : ''}`}
                                    style={{ fontWeight: "bold"}}
                                >
                                    <i className="fa fa-clock-o mr-5" aria-hidden="true"></i>
                                    Pending
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
        );
    }
}
 
export default Sort;
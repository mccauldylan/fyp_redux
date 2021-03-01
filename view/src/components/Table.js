import React, { Component } from 'react'
import axios from 'axios';


const styles ={

}


class Table extends Component {
    constructor(props) {
		super(props);

		this.state = {
			rows: [],

            categoryId: '1RegisterInfo'
		};

	}

    componentWillMount = () => {
        let categoryId = this.state.categoryId
        axios
			.get(`/category/${categoryId}`)
			.then((response) => {
				this.setState({
					rows: response.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
    };


    render() {
        return (
            <div>
                <ul>
                    {this.state.rows.map((row)=>(
                        <li key = {row.rowId}>{row.body}</li>
                    ))}
                       
                </ul>
            </div>
        )
    }
}

export default Table

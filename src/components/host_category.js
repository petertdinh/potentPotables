import React, { Component } from 'react';


class HostCategory extends Component {
	constructor(props){
		super(props)
		this.state= {
			renderCategories: true,
		}
	}
	render() {
		return(
			<div>
				{props.category}
			</div>
		);
	}
}

export default HostCategory;
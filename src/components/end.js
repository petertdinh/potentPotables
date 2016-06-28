import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class End extends Component {

	render(){
		const scores = _.map(this.props.users, function(user) {
			return (
				<div key={user.username}>
						<span className="finaluser">{user.username}:</span>
						<span>{user.score > 0 ? '$' + user.score : '-$' + user.score}</span>
				</div>
			);
		});

	  return (
	      <div id="end">
	      	<h1 className="thankyou animated infinite flash">Thank you for playing!</h1>
	      	<div className="final header"><strong>Final scores:</strong></div>
	      	<div className="final scores">
		      	<div className="report">
		      		<span className="finaluser">peter:</span>
		      		<span className="finalscore">$5000</span>
		      	</div>
		      	<div>
		      		<span className="finaluser">chris:</span>
		      		<span className="finalscore">$5000</span>
		      	</div>
		      	<div>
		      		<span className="finaluser">lukas:</span>
		      		<span className="finalscore">$5000</span>
		      	</div>
		      	<div>
		      		<span className="finaluser">luasdfasdfkas:</span>
		      		<span className="finalscore">$0</span>
		      	</div>
	      		{ scores }
	      	</div>
	      </div>
	  );
	}
}

function mapStateToProps(state){
	return {
  	users: state.gameplay.users,
  };

}

export default connect(mapStateToProps)(End);
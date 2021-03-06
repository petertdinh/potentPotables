import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSession } from '../actions/index';
import { Link } from 'react-router';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


class InfoIndex extends Component {
	render() {

		return (
			<div className ="landing">
				<ReactCSSTransitionGroup transitionName="logo-transition" transitionAppear={true} transitionAppearTimeout={1500}>
					<div className="logo-holder"><img id="logo" src="http://52.38.175.65/assets/logo.png"/></div>
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="index-transition" transitionAppear={true} transitionAppearTimeout={3000}>
				<div className="buttons">
					<a className="create a" onClick={this.props.createSession}>Create a Game</a>
				</div>
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="index-transition" transitionAppear={true} transitionAppearTimeout={3000}>
				  	<div className="btm">
						  <Link to="linkverification">
						  	<a className="create a">Join a Game</a>
						  </Link>
					  </div>
				<div class="links">
					<span>
						<Link className="about" to="/about"><strong><u>About</u></strong></Link>
					</span>
					<span>
						<Link className="howto" to="/howto"><strong><u>How to Play</u></strong></Link>
					</span>
				</div>
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

export default connect(null, { createSession })(InfoIndex);
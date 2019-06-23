import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Candidates from './components/Candidates';
import Applications from './components/Applications';
import Questions from './components/Questions';
import './App.scss';

class App extends Component {
	constructor () {
		super();
		this.state = {
			candidateApplicationId: null,
			candidateName: null
		};
	}

	handleSelectedCandidate = (e, applicationId, name) => {
		this.setState({
			candidateApplicationId: applicationId,
			candidateName: name
		});
	};

	render () {
		return (
			<Router>
				<div className='App'>
					<div id='nav'>
						<h1>Welcome to Taryn Li's React Assessment!</h1>
					</div>
					<div className='main'>
						<section id='side-panel'>
							<Candidates />
						</section>
						<section>
							<Route path='/application/:id' component={Applications} />
							<Route path='/questions/' exact component={Questions} />
						</section>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;

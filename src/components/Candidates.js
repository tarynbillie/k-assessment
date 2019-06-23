import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import url from '../util/urls';
import '../App.scss';

export default class Candidates extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isLoading: true,
			candidates: []
		};
	}
	// fetch all candidates
	fetchCandidates = () => {
		fetch(`${url.baseUrl}/candidates`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({
					candidates: data,
					isLoading: false
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	componentDidMount () {
		this.fetchCandidates();
	}

	render () {
		let candidates = this.state.candidates;
		return (
			<div className='side-panel'>
				<h2>Candidates: </h2>
				{candidates.map((candidate) => {
					return (
						<Link
							className='candidates-container'
							to={{
								pathname: `/application/${candidate.applicationId}`,
								state: {
									applicant: candidate
								}
							}}
							key={candidate.id}>
							<span>{candidate.name}</span>
						</Link>
					);
				})}
			</div>
		);
	}
}

import React, { Component } from 'react';
import url from '../util/urls';
import Video from './Video';
import '../App.scss';

export default class Applications extends Component {
	state = {
		application: [],
		questions: []
	};

	// fetching application function to keep DRY
	getApplication () {
		let array = [];
		fetch(`${url.baseUrl}/applications/${this.props.location.state.applicant.applicationId}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				// if video doesn't equal undefined then map and fetch questions
				if (data.videos !== undefined) {
					data.videos.map((questions) => {
						fetch(`${url.baseUrl}/questions/${questions.questionId}`)
							.then((res) => {
								return res.json();
							})
							// push the questions from the request into the empty array
							.then((data) => {
								array.push(data.question);
								return data.question;
							})
							.then(() => {
								this.setState({
									questions: array
								});
							});
						return array;
					});
					// change state
					this.setState({
						candidate: this.props.location.state.applicant,
						application: data.videos
					});
					return data;
				}
				else {
					// else if videos equals undefined change state, no data in application array
					this.setState({
						candidate: this.props.location.state.applicant,
						application: []
					});
				}
			});
	}

	componentWillMount () {
		this.getApplication();
	}

	componentDidUpdate () {
		if (this.props.location.state.applicant !== this.state.candidate) {
			this.setState(
				{
					candidate: this.props.location.state.applicant,
					application: []
				},
				() => {
					this.getApplication();
				}
			);
		}
	}
	render () {
		const { application, questions } = this.state;
		const applicant = this.props.location.state.applicant;

		if (application.length > 0) {
			return (
				<div className='application-title'>
					<h2>Application for: {applicant.name}</h2>
					{application.map((videos, index) => {
						return (
							<Video
								video={application}
								questions={questions}
								index={index}
								applicantId={applicant.applicationId}
								key={index}
							/>
						);
					})}
				</div>
			);
		}
		else {
			return (
				<div className='application-title'>
					<h2>Application for: {applicant.name}</h2>
					<p>No answers were found for {applicant.name}.</p>
				</div>
			);
		}
	}
}

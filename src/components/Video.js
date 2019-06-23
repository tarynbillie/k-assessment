import React, { Component } from 'react';
import url from '../util/urls';

export default class Video extends Component {
	state = {
		commentInput: ''
	};

	commentUpdate (data) {
		const { video, applicantId, index } = this.props;
		video[index].comments = data;
		let update = {
			id: '',
			videos: video
		};

		fetch(`${url.baseUrl}/applications/${applicantId}`, {
			method: 'PUT',
			body: JSON.stringify(update),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				console.log(res);
				return res.json();
			})
			.catch((error) => console.error('Error: ', error));
	}

	componentWillUnmount () {
		this.setState({
			commentInput: ''
		});
	}

	handleCommentChange = (commentInput) => {
		this.setState({
			commentInput
		});
	};

	render () {
		const { video, questions, index } = this.props;
		return (
			<div className='application-details'>
				<div className='application-details__video'>
					<h3>
						Question # {index}: {questions[index]}
					</h3>
					<video controls>
						<source src={video[index].src} type='video/mp4' />
					</video>
				</div>
				<div className='notes'>
					<h3>Notes:</h3>
					<textarea
						placeholder='Enter comments on this video response...'
						value={this.state.commentInput}
						onChange={(e) => this.handleCommentChange(e.target.value)}
					/>
					<button onClick={() => this.commentUpdate(this.state.input)}>Save Comment</button>
				</div>
			</div>
		);
	}
}

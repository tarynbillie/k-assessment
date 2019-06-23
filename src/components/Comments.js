import React, { Component } from 'react';
import url from '../util/urls';
import '../App.scss';

export default class Comments extends Component {
	constructor () {
		super();
		this.state = {
			isLoading: true,
			commentInput: '',
			applications: {
				id: null,
				videos: [
					{
						src: null,
						questionId: null,
						comments: null
					}
				]
			},
			saveBtn: false,
			typing: false
		};
	}

	componentDidMount () {
		fetch(`${url.baseUrl}/applications` + this.props.applicationId)
			.then((response) => {
				let applications = response.data;
				this.setState({
					applications: { ...applications },
					isLoading: false
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render () {
		return <div />;
	}
}

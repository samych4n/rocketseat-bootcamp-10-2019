import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

export default class Repository extends Component {
	state = {
		repository: {},
		issues: [],
		loading: true,
	};

	async componentDidMount() {
		const { match } = this.props;
		const repoName = decodeURIComponent(match.params.repository);
		const response = await api.get(`repos/rocketseat/unform`);
		console.log(repoName, match, response);
	}

	componentDidUpdate(_, prevState) {
		console.log(prevState);
	}

	setNewState() {
		const { repository, issues, loading } = this.state;
		this.setState({ repository, issues, loading });
	}

	render() {
		return <h1>Repository</h1>;
	}
}

Repository.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			repository: PropTypes.string,
		}),
	}).isRequired,
};

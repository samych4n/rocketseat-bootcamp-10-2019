import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import './config/reactotronConfig';
import Routes from './routes';

export default class App extends Component {
	render() {
		console.tron.log('ola1234');
		return (
			<>
				<StatusBar barStyle="light-content" backgroundColor="#7159c1" />
				<Routes />
			</>
		);
	}
}

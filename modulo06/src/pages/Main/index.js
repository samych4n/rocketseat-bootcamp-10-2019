import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
	Container,
	SubmitButton,
	Form,
	Input,
	List,
	User,
	Avatar,
	Name,
	Bio,
	ProfileButton,
	ProfileButtonText,
} from './styles';
import api from '../../services/api';

export class Main extends Component {
	state = {
		newUser: '',
		users: [],
	};

	handleAddUser = async () => {
		const { users, newUser } = this.state;
		const userInfo = await api.get(`/users/${newUser}`);

		const data = {
			name: userInfo.data.name,
			login: userInfo.data.login,
			bio: userInfo.data.bio,
			avatar: userInfo.data.avatar_url,
		};

		this.setState({
			users: [data, ...users],
			newUser: '',
		});
		Keyboard.dismiss();
		console.log(data);
	};

	static navigationOptions = { title: 'Usuários' };

	render() {
		const { users, newUser } = this.state;
		console.log(newUser);
		return (
			<Container>
				<Form>
					<Input
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Adicionar usuário"
						value={newUser}
						onChangeText={text => this.setState({ newUser: text })}
						returnKeyType="send"
						onSubmitEditing={this.handleAddUser}
					/>
					<SubmitButton onPress={this.handleAddUser}>
						<Icon name="add" size={20} color="#FFF" />
					</SubmitButton>
				</Form>
				<List
					data={users}
					keyExtractor={user => user.login}
					renderItem={({ item }) => (
						<User>
							<Avatar source={{ uri: item.avatar }} />
							<Name>{item.name}</Name>
							<Bio>{item.bio}</Bio>
							<ProfileButton onPress={() => {}}>
								<ProfileButtonText>
									Ver Perfil
								</ProfileButtonText>
							</ProfileButton>
						</User>
					)}
				/>
			</Container>
		);
	}
}

export default Main;

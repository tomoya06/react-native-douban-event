import React, { Component } from 'react';

import {
	View,
	Text,
	Button,
	Icon,
	Tile,
	Image,
	Title,
	Subtitle,
} from "@shoutem/ui";

import { Grid, Row, Col } from 'react-native-easy-grid';
import FullScaleTouchable from '../components/FullScaleTouchable';
import { fetchMeInfoService, fetchMEinfoAsync } from '../../services/UserServices';

class MineScreen extends Component {
	static navigationOptions = {
		tabBarLabel: 'Mine',
		tabBarIcon: ({ tintColor }) => (
			<Icon name="add-to-favorites-on" style={{ color: tintColor }} />
		)
	}

	constructor(props) {
		super(props);

		this.state = {
			userMEinfo: null,
		}
	}

	_willFocusHandler = async () => {
		const MEinfoRes = await fetchMEinfoAsync();
		console.log("mine info:", MEinfoRes);
		await this.setState({
			userMEinfo: MEinfoRes,
		})
	}

	async componentDidMount() {
		// this.willFocusListener = this.props.navigation.addListener('willFocus', this._willFocusHandler);
		await this._willFocusHandler();
	}

	componentWillUnmount() {
		// this.willFocusListener.remove();
	}

	_blankAvatar = () => {
		const info = this.state.userMEinfo;
		return (
			<View styleName="clear vertical h-center">
				<Image
					styleName="small"
					source={require('./../../src/img/conversation.png')}
				/>
				<View styleName="md-gutter-bottom"></View>
				<Title>Log In For More Fun</Title>
			</View>
		)
	}

	_loginAvatar = () => {
		const info = this.state.userMEinfo;
		return (
			<View styleName="clear vertical h-center">
				<Image
					styleName="medium-avatar"
					source={{ uri: info.large_avatar }}
				/>
				<View styleName="md-gutter-bottom"></View>
				<Title>{info.name}</Title>
				<View styleName="sm-gutter-bottom"></View>
				<Subtitle>{info.desc}</Subtitle>
			</View>
		)
	}

	render() {
		const MEinfo = this.state.userMEinfo;

		if (MEinfo === null) {
			return (
				<Grid>
					<Row size={1}>
						<FullScaleTouchable
							callback={() => this.props.navigation.navigate('Login')}
							source={require('./../../src/img/black.jpg')}
							content={this._blankAvatar()}
						/>
					</Row>
				</Grid>
			)
		} else {
			// TODO: add two photos as background
			// TODO: add navigations
			return (
				<Grid>
					<Row size={3}>
						<FullScaleTouchable
							callback={null}
							source={{}}
							content={this._loginAvatar()}
						/>
					</Row>
					<Row size={2}>
						<Col>
							<FullScaleTouchable
								callback={null}
								source={{}}
								content={<Title>LIKES</Title>}
							/>
						</Col>
						<Col>
							<FullScaleTouchable
								callback={null}
								source={{}}
								content={<Title>IN</Title>}
							/>
						</Col>
					</Row>
				</Grid>
			)
		}
	}
}

export default MineScreen;
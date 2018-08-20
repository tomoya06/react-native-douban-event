/**
 * @params:
 * uri: image background uri
 * content: show in button center
 * callback: click and then do it.
 */

import React, { Component } from 'react';
import {
	TouchableOpacity,
	ImageBackground,
	Overlay,
	Title,
} from "@shoutem/ui";

/**
 * props: 
 * callback: function
 * uri: background image uri
 * content: central title
 */
export default class FullScaleTouchable extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableOpacity
				onPress={this.props.callback}
				style={{ flex: 1 }}
			>
				<ImageBackground
					style={{ flex: 1 }}
					source={{ uri: this.props.uri }}
				>
					<Overlay styleName="fill-parent image-overlay">
						<Title>{this.props.content}</Title>
					</Overlay>
				</ImageBackground>
			</TouchableOpacity>
		)
	}
}

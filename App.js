import React, { Component } from 'react';
import {
	createStackNavigator,
	StackNavigator
} from "react-navigation";

import HomeTabNavigation from "./views/navigations/HomeTabNavigation";
import EventDetailsScreen from "./views/screens/EventDetailsScreen";
import LoginScreen from "./views/screens/LoginScreen";
import EventListScreen from "./views/screens/EventListScreen";
import CityPickerScreen from './views/screens/CityPickerScreen';
import MyCollectionsScreen from "./views/screens/MyCollectionsScreen";
import SettingScreen from "./views/screens/SettingScreen";

import DemoScreen from "./views/screens/DemoScreen";

// TODO: change status bar background color
// TODO: log out request for re-ensure 

/**
 * Disable Debug Yellow Warning Box
 */
console.disableYellowBox = true;

export default createStackNavigator({
	HomeTab: {
		screen: HomeTabNavigation,
	},
	CityPicker: {
		screen: CityPickerScreen,
	},
	EventDetails: {
		screen: EventDetailsScreen,
	},
	Login: {
		screen: LoginScreen,
	},
	EventList: {
		screen: EventListScreen,
	},
	Demo: {
		screen: DemoScreen,
	},
	MyCollections: {
		screen: MyCollectionsScreen,
	},
	Setting: {
		screen: SettingScreen,
	}
}, {
	initialRouteName: 'HomeTab',
	navigationOptions: {
		header: null,
	}
});
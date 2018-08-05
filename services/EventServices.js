// import ConvertPinyin from "./../utils/pinyin";

import {
	BASE_URL,
	FAKE_DATA_00,
	FAKE_DATA_20,
} from "./../utils/const";

import {
	getToken,
	setToken,
	getUser,
} from "./StorageService";

export const EVENT_DAY_TYPES = [
	{ displayName: '所有', typeName: '' },
	{ displayName: '今天', typeName: 'today' },
	{ displayName: '明天', typeName: 'tomorrow' },
	{ displayName: '周末', typeName: 'weekend' },
	{ displayName: '本周', typeName: 'week' },
];
export const EVENT_TYPES = [
	{ displayName: '所有', typeName: 'all' },
	{ displayName: '音乐', typeName: 'music' },
	{ displayName: '电影', typeName: 'film' },
	{ displayName: '戏剧', typeName: 'drama' },
	{ displayName: '公益', typeName: 'comonweal' },
	{ displayName: '沙龙', typeName: 'salon' },
	{ displayName: '展览', typeName: 'exhibition' },
	{ displayName: '聚会', typeName: 'party' },
	{ displayName: '运动', typeName: 'sports' },
	{ displayName: '旅行', typeName: 'travel' },
	{ displayName: '其他', typeName: 'others' }
];

export function fetchEventDetails(id) {
	return new Promise((resolve, reject) => {
		fetch(`${BASE_URL}/event/${id}`)
			.then((response) => response.json())
			.then((json) => {
				return resolve(json);
			})
			.catch((error) => {
				return reject(error);
			})
	})
}

export function fetchCityEvents(city, day_type = '', event_type = '', start_index = 0) {
	// const cityPY = ConvertPinyin(city);
	// const EVENTS_URL = `${BASE_URL}/event/list?loc=${cityPY}&day_type=${day_type}&type=${event_type}&start=${start_index}`;
	const EVENTS_URL = start_index == 0 ? FAKE_DATA_00 : FAKE_DATA_20;
	return new Promise((resolve, reject) => {
		console.log("fetching events from...", EVENTS_URL);
		fetch(EVENTS_URL)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				return resolve(json);
			})
			.catch((error) => {
				return reject(error);
			})
	})
}

export function markEvent(id, statusID = 0, flagID = true) {
	return new Promise((resolve, reject) => {

		const _status = statusID == 0 ? 'wishers' : 'participants';
		const _flag = flagID ? 'POST' : 'DELETE';
		console.log(`Marking Event ${id} as ${_status} with flag `)
	})
}
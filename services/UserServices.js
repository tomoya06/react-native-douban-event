import {
    setUserInfo,
    getUserInfo,
    setUserLogin,
    getUserLogin,
    setToken,
    getToken,
    setLoginDate,
    getLoginDate,
} from "./StorageService";

import {
    AUTH_URL, ME_URL,
} from "./../utils/const";

const CLIENT_ID = '0b2bdeda43b5688921839c8ecb20399b';
const CLIENT_SECRET = '822e2ca55c426005';
const GRAND_TYPE = 'password';

function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        const loginForm = new FormData();
        loginForm.append('client_id', CLIENT_ID);
        loginForm.append('client_secret', CLIENT_SECRET);
        loginForm.append('grant_type', GRAND_TYPE);
        loginForm.append('username', username);
        loginForm.append('password', password);

        const loginHeaders = new Headers({
            'Content-Type': 'multipart/form-data',
        })

        const loginConfig = {
            method: 'POST',
            headers: loginHeaders,
            body: loginForm,
        }

        fetch(AUTH_URL, loginConfig)
            .then((response) => {
                if (response.ok) { return response.json(); }
                throw new Error(response.status);
            })
            .then((jRes) => {
                if (typeof jRes.msg !== 'undefined') { throw new Error('user info mismatched'); }
                return resolve([null, jRes]);
            })
            .catch((error) => {
                return resolve([error, null]);
            })
    })
}

function fetchMEinfoPromise(token) {
    return new Promise((resolve, reject) => {
        const fetchHeaders = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": 'Bearer ' + token,
        })
        const fetchOption = {
            method: 'GET',
            headers: fetchHeaders,
        }
        fetch(ME_URL, fetchOption)
            .then((response) => {
                console.log(response);
                if (response.ok) { return response.json(); }
                throw new Error(response.status);
            })
            .then((jRes) => {
                console.log(jRes);
                if (typeof jRes.msg !== 'undefined') { throw new Error(jRes.msg); }
                return resolve([null, jRes]);
            })
            .catch((error) => {
                return resolve([error, null]);
            })
    })
}

async function fetchMEinfoAsync() {
    const token = await getToken();
    const isTokenExpiredRes = await isTokenExpired();
    if (token === null || isTokenExpiredRes) { return null; }
    const [error, fetchRes] = await fetchMEinfoPromise(token.access_token);
    if (error) { return null; }
    return fetchRes;
}

async function isTokenExpired() {
    const curLoginDate = await getLoginDate();
    const FIVEDAYS = 24 * 60 * 60 * 5;
    const currentTS = (new Date()).toString();
    return (currentTS - curLoginDate.date > FIVEDAYS);
}

export async function fetchMEinfoAsync() {
    const token = await getToken();
    const isTokenExpiredRes = await isTokenExpired();
    if (token === null || isTokenExpiredRes) { return null; }
    const [error, fetchRes] = await fetchMEinfoPromise(token.access_token);
    if (error) { return null; }
    return fetchRes;
}

/**
 * login, store token service.
 * return true if everything goes right, otherwise return false.
 * @param {string} username username
 * @param {string} password password
 */
export async function userLoginService(username, password) {
    const [loginError, loginRes] = await userLogin(username, password);
    if (loginError) {
        return false;
    }
    try {
        const setTokenRes = await setToken(loginRes);
        const setUserLoginRes = await setUserLogin({ username, password });
        const setLoginDateRes = await setLoginDate({ date: (new Date()).getTime() });

        console.log(setTokenRes, setUserLoginRes, setLoginDateRes);

        if (setTokenRes && setUserLoginRes && setLoginDateRes) {
            // const curToken = await getToken();
            return true;
        }
        throw new Error('storage failed');
    } catch (error) {
        return false;
    }
}

export async function userLogoutService() {
    const logoutUserRes = await setUserLogin(null);
    const logoutTokenRes = await setToken(null);
    const logoutDateRes = await setLoginDate(null);
    return (logoutUserRes && logoutTokenRes && logoutDateRes);
}

/**
 * if it can log in, return true,
 *      else return false.
 */
export async function autoLogin() {
    const curUserLogin = await getUserLogin();
    if (curUserLogin == null) { return false; }
    if (!isTokenExpired) { return true; }
    const { username, password } = curUserLogin;
    const loginRes = await userLoginService(username, password);
    return loginRes;
}

export async function isLogin() {
    const curUserLogin = await getUserLogin();
    const curToken = await getToken();
    if (curUserLogin !== null && curToken !== null) { return curToken; }
    return null;
}

/**
 * fetch current login user's infomation with ME url
 * if has someone login, return his/her info.
 *      else return null.
 */
// export async function fetchMeInfoService() {
//     const fetchMEinfoRes = await fetchMEinfoAsync();
//     return fetchMEinfoRes;
// }

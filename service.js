// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const HOST = "http://119.45.38.130:8000/api";
const login = async function(name, pwd) {
	// let ret = '';
	// ret = uni.getStorageSync(USERS_KEY);
	// if (!ret) {
	// 	ret = '[]';
	// }
	// return JSON.parse(ret);
	
	var [error, res] = await uni.request({
		url: '/api/user/login',
		method: "POST",
		data: {
		    name: name,
		    password: pwd,
		}
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

const addUser = function(userInfo) {
	
}

export default {
	login,
	addUser
}

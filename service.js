// const HOST="http://119.45.38.130:8000";
const HOST = ""; //H5用，需要配置manifest.json中的h5 proxy

function getToken() {
	try {
		const token = uni.getStorageSync('token');
		return token;
	} catch (e) {
		return "";
	}
}

const login = async function(name, pwd) {
	var [error, res] = await uni.request({
		url: HOST + '/api/user/login',
		method: "POST",
		header: {
			'Access-Control-Token': getToken()
		},
		sslVerify: false,
		withCredentials: false,
		data: {
			name: name,
			password: pwd,
		}
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

const getEventList = async function(params) {
	const queryParams = {
		page: params.page,
		page_size: params.size
	};
	var [error, res] = await uni.request({
		url: HOST + '/api/event_record/search',
		method: "GET",
		header: {
			'Access-Control-Token': getToken()
		},
		data: queryParams
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

const getEventInfo = async function(id) {
	const queryParams = {
		id: id
	};
	var [error, res] = await uni.request({
		url: HOST + '/api/event_record/info',
		method: "GET",
		header: {
			'Access-Control-Token': getToken()
		},
		data: queryParams
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

const createEvent = async function(params) {
	const queryParams = params;
	var [error, res] = await uni.request({
		url: HOST + '/api/event_record/create',
		method: "POST",
		header: {
			'Access-Control-Token': getToken()
		},
		data: queryParams
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

const updateEvent = async function(params) {
	const queryParams = params;
	var [error, res] = await uni.request({
		url: HOST + '/api/event_record/update',
		method: "POST",
		header: {
			'Access-Control-Token': getToken()
		},
		data: queryParams
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

const getUsers = async function(params) {
	const queryParams = {
		page: 1,
		page_size: 50
	};
	var [error, res] = await uni.request({
		url: HOST + '/api/user/search',
		method: "GET",
		header: {
			'Access-Control-Token': getToken()
		},
		data: queryParams
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

const getEventNames = async function(params) {
	const queryParams = {
		page: 1,
		page_size: 50
	};
	var [error, res] = await uni.request({
		url: HOST + '/api/event/search',
		method: "GET",
		header: {
			'Access-Control-Token': getToken()
		},
		data: queryParams
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

const getProductArchive = async function(params) {
	const queryParams = {
		page: 1,
		page_size: 50
	};
	var [error, res] = await uni.request({
		url: HOST + '/api/product_archive/search',
		method: "GET",
		header: {
			'Access-Control-Token': getToken()
		},
		data: queryParams
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

export default {
	login,
	getEventList,
	getEventInfo,
	createEvent,
	updateEvent,
	getUsers,
	getEventNames,
	getProductArchive
}

const login = async function(name, pwd) {
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

const getEventList = async function(params) {
	const queryParams = {
		page: params.page,
		page_size: params.limit
	};
	var [error, res] = await uni.request({
		url: '/api/event_record/search',
		method: "GET",
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
		url: '/api/event_record/info',
		method: "GET",
		data: queryParams
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

const createEvent = async function(params) {
	const queryParams = params;
	var [error, res] = await uni.request({
		url: '/api/event_record/create',
		method: "POST",
		data: queryParams
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

const updateEvent = async function(params) {
	const queryParams = params;
	var [error, res] = await uni.request({
		url: '/api/event_record/update',
		method: "POST",
		data: queryParams
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

const getUsers = async function(params) {
	const queryParams = { page: 1, page_size: 50 };
	var [error, res] = await uni.request({
		url: '/api/user/search',
		method: "GET",
		data: queryParams
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

const getEventNames = async function(params) {
	const queryParams = { page: 1, page_size: 50 };
	var [error, res] = await uni.request({
		url: '/api/event/search',
		method: "GET",
		data: queryParams
	});
	console.log("res", res.data);
	console.log("error", error);
	return res.data;
}

const getProductArchive = async function(params) {
	const queryParams = { page: 1, page_size: 50 };
	var [error, res] = await uni.request({
		url: '/api/product_archive/search',
		method: "GET",
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

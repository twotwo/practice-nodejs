const axios = require('axios');

if (process.env.NODE_ENV == 'development') {
	var hostname = ``;
} else {
	var hostname = ``;
}

export const doPost = (url, postData) => axios({
	method: 'post',
	url: `${hostname}`+url,
	data: postData,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
});

export const doGet = (url, getData) => axios({
	method: 'get',
	url: `${hostname}`+url,
	params: getData
});


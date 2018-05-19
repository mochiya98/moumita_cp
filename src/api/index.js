import axios from "axios";

const API_URL = "http://127.0.0.1/api/v1/moumita_cp";

export default {

	API_URL,

	request(method, url, params){
		let result = null;
		let fullurl = API_URL + url;

		if (method === "get"){
			result = axios.get(fullurl, {
				params         : params,
				withCredentials: true,
			});
		} else if (method === "post"){
			params.withCredentials = true;
			result = axios.post(fullurl, params);
		}
		result.catch(function(){
			//AnErrorOccoused
		});
		return result;
	},

	get(url, params){
		return this.request("get", url, params);
	},

	post(url, params){
		return this.request("post", url, params);
	},
};

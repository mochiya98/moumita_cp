import axios from "axios";

const API_URL = "http://m98.be/api/v1/moumita_cp";

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
			result = axios.post(fullurl, params, {withCredentials: true});
		}
		result.catch(function(){
			//AnErrorOccoused
		});
		return result.then((r)=>{
			if(r.data.error)throw new Error(r.data.error);
			return r.data.result;
		});
	},

	get(url, params){
		return this.request("get", url, params);
	},

	post(url, params){
		return this.request("post", url, params);
	},

	put(url, params){
		params = {
			_method: "PUT",
			...params,
		};
		return this.request("post", url, params);
	},
};

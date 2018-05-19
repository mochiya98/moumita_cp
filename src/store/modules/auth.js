import api from "api";

const store = {
	actions: {
		logout({commit}, payload){
			api.get("/logout", {})
				.then(function(response){
					commit("logout");
				});
		},
		updateState({commit}, payload){
			api.get("/state", {})
				.then(function(response){
					commit("updateState", response.data);
				});
		},
	},
	mutations: {
		logout(state){
			state.loggedIn = false;
		},
		updateState(state, api_state){
			state.checking = false;
			state.loggedIn = api_state.isLoggedIn;
			state.uname = api_state.uname;
		},
	},
	namespaced: true,
	state     : {
		checking: true,
		loggedIn: false,
		uname   : "ゲスト",
	},


};

export default store;

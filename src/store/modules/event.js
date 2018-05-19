import api from "api";
import router from "router";

const store = {
	actions: {
		getNextMoumita({commit, state}, payload){
			return new Promise((resolve, reject)=>{
				api.get("/events/moumita", {unreceived: state.unreceived_moumita})
					.then(function(response){
						if(!response.data.result){
							router.push("/");
							location.reload();
							return false;
						}
						let result = response.data.result;
						commit("addEvents", result);
						if(result.length > 0)commit("updateUnreceivedMoumita", result[result.length - 1].moumita);
						resolve(result.length);
					});
			});
		},
		getNextUnread({commit, state}, payload){
			return new Promise((resolve, reject)=>{
				api.get("/events/unread", {unreceived: state.unreceived_unread})
					.then(function(response){
						if(!response.data.result){
							location.reload();
							return false;
						}
						let result = response.data.result;
						commit("addEvents", result);
						if(result.length > 0)commit("updateUnreceivedUnread", result[result.length - 1].data.updated_at);
						resolve(result.length);
					});
			});
		},
		moumita({commit}, payload){
			return new Promise((resolve, reject)=>{
				commit("moumita", payload);
				resolve();
				api.get("/moumita", {event_id: payload.event_id});
			});
		},
		restore({commit}, payload){
			return new Promise((resolve, reject)=>{
				commit("restore", payload);
				resolve();
				api.get("/restore", {event_id: payload.event_id});
			});
		},
	},
	getters: {
		moumita_events(state, getters){
			return state.events
				.filter(c=>c.moumita !== null)
				.sort((a, b)=>Math.sign(b.moumita - a.moumita));
		},
		unread_events(state, getters){
			return state.events
				.filter(c=>c.moumita === null)
				.sort((a, b)=>Math.sign(b.data.updated_at - a.data.updated_at));
		},
	},
	mutations: {
		addEvents(state, _events){
			for(let event of _events){
				if(state.event_having.has(event.event_id))continue;
				state.event_having.add(event.event_id);
				state.events.push(event);
			}
		},
		updateUnreceivedMoumita(state, value){
			state.unreceived_moumita = value;
		},
		updateUnreceivedUnread(state, value){
			state.unreceived_unread = value;
		},
		moumita(state, options){
			let event = state.events.find(c=>c.event_id === options.event_id);
			event.moumita = Math.floor(Date.now() / 1000);
		},
		restore(state, options){
			let event = state.events.find(c=>c.event_id === options.event_id);
			event.moumita = null;
		},
	},
	namespaced: true,
	state     : {
		event_having      : new Set(),
		events            : [],
		unreceived_moumita: Math.floor(Date.now() / 1000),
		unreceived_unread : Math.floor(Date.now() / 1000),
	},
};

export default store;

import api from "api";
import router from "router";

const store = {
	actions: {
		getEventDetail({commit, state}, payload){
			return new Promise((resolve, reject)=>{
				api.get("/events/" + payload.event_id, {})
					.then(function(result){
						if(!result.event){
							//router.push("/");
							//location.reload();
							return false;
						}
						let event = result.event;
						commit("addEvents", [event]);
						resolve(event);
					});
			});
		},
		getNextMoumita({commit, state}, payload){
			return new Promise((resolve, reject)=>{
				api.get("/events", {
					filter    : "moumita",
					unreceived: state.unreceived_moumita,
				})
					.then(function(result){
						if(!result.events){
							router.push("/");
							location.reload();
							return false;
						}
						let events = result.events;
						commit("addEvents", events);
						if(events.length > 0)commit("updateUnreceivedMoumita", events[events.length - 1].moumita);
						resolve(events.length);
					});
			});
		},
		getNextUnread({commit, state}, payload){
			return new Promise((resolve, reject)=>{
				api.get("/events", {filter    : "unread",
					unreceived: state.unreceived_unread})
					.then(function(result){
						if(!result.events){
							location.reload();
							return false;
						}
						let events = result.events;
						commit("addEvents", events);
						if(events.length > 0)commit("updateUnreceivedUnread", events[events.length - 1].data.updated_at);
						resolve(events.length);
					})
					.catch(function(err){
						location.reload();
						return false;
					});
			});
		},
		moumita({commit}, payload){
			return new Promise((resolve, reject)=>{
				commit("moumita", payload);
				resolve();
				api.put("/events/" + payload.event_id, {moumita: "true"});
			});
		},
		restore({commit}, payload){
			return new Promise((resolve, reject)=>{
				commit("restore", payload);
				resolve();
				api.put("/events/" + payload.event_id, {moumita: "false"});
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

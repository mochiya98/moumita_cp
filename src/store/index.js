import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import event from "./modules/event";

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		auth,
		event,
	},
});

store.dispatch("auth/updateState");

export default store;

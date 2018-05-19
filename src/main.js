import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import InfiniteLoading from "vue-infinite-loading";
Vue.component("infinite-loading", InfiniteLoading);
import VueMq from "vue-mq";
 
Vue.use(VueMq, {
	breakpoints: {
		mobile : 470,
		desktop: Infinity,
	},
});

import titleMixin from "./util/title";

Vue.mixin(titleMixin);

import PageContainer from "components/app/page-container";
Vue.component("page-container", PageContainer);

import lang from "element-ui/lib/locale/lang/ja";
import locale from "element-ui/lib/locale";
import "element-ui/lib/theme-chalk/icon.css";
import "css/element-custom.scss";
locale.use(lang);

import {Card, Button, Loading, Menu, MenuItem, Submenu, Tag} from "element-ui";
Vue.use(Loading);
import "element-ui/lib/theme-chalk/button.css";
import "element-ui/lib/theme-chalk/card.css";
import "element-ui/lib/theme-chalk/loading.css";
import "element-ui/lib/theme-chalk/menu.css";
import "element-ui/lib/theme-chalk/menu-item.css";
import "element-ui/lib/theme-chalk/submenu.css";
import "element-ui/lib/theme-chalk/tag.css";
for (let part of [Button, Card, Menu, MenuItem, Submenu, Tag]){
	Vue.component(part.name, part);
}


new Vue({
	components: {App},
	el        : "#app",
	router,
	store,
	template  : "<App/>",
});

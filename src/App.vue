<style>
* {
	margin: 0;
	padding: 0;
}
html,
body {
	height: 100%;
}
body {
	font-family: Meiryo, sans-serif;
}
#app {
	min-height: 100vh;
}
</style>
<template>
	<div id="app">
		<header>
			<header-menu/>
		</header>
		<extended-router-view/>
	</div>
</template>
<script>
import ExtendedRouterView from "./components/app/extended-router-view.vue";
import HeaderMenu from "./components/app/header-menu.vue";

export default {
	components: {
		ExtendedRouterView,
		HeaderMenu,
	},
	data(){
		return {
			activeLink: this.$root.$route.path,
		};
	},
	mounted: function(){
		this.$root.$router.afterEach((to, from) => {
			this.activeLink = to.path;
		});
	},
};
</script>

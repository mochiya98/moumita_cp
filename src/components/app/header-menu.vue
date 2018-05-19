<style>
.el-submenu--hide-icon .el-submenu__icon-arrow {
	display: none;
}
</style>
<style lang="scss" scoped>
.app-header-menu {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 999;
}
.el-menu-item:hover {
	background-color: #fa0;
}
.el-menu--horizontal {
	border-bottom: 0px solid #000;
}
.el-menu--horizontal > .el-menu-item.is-active {
	border-bottom-width: 4px;
}
.el-menu--right {
	float: right;
}
.el-submenu-item--right {
	text-align: right;
}
</style>
<template>
	<el-menu @select="hoge" background-color="#234" text-color="#fff" active-text-color="#fa0" :default-active="currentPath" class="app-header-menu" mode="horizontal">
		<el-submenu v-show="!isBackMode && $mq==='mobile'" index="submenu-cc" class="el-submenu--hide-icon" :show-timeout=0 :hide-timeout=150>
			<template slot="title"><i class="el-icon-menu"></i></template>
			<el-menu-item index="/">Home</el-menu-item>
			<el-menu-item index="/moumita" v-show="loggedIn">もう見た</el-menu-item>
		</el-submenu>
		<el-menu-item v-show="!isBackMode && $mq!=='mobile'" index="/">Home</el-menu-item>
		<el-menu-item v-show="!isBackMode && $mq!=='mobile' && loggedIn" index="/moumita">もう見た</el-menu-item>
		<el-menu-item v-show="isBackMode" index="_back" @click="backHistory">＜戻る</el-menu-item>
		<template v-if="loggedIn">
			<el-submenu index="_submenu-user" class="el-menu--right" :show-timeout=0 :hide-timeout=150>
				<template slot="title">{{uname}}さん</template>
				<el-menu-item class="el-submenu-item--right" index="/setting">設定</el-menu-item>
				<el-menu-item class="el-submenu-item--right" index="/logout" click="logout">ログアウト</el-menu-item>
			</el-submenu>
		</template>
		<template v-else>
			<el-menu-item index="/login" style="float:right;">Login</el-menu-item>
		</template>
	</el-menu>
</template>

<script>
import {mapState} from "vuex";
export default {
	components: {},
	computed  : {
		isBackMode(){
			let mode = false;
			if (this.currentPath.match(/^\/events\//)) mode = true;
			return mode;
		},
		...mapState({
			loggedIn: state => state.auth.loggedIn,
			uname   : state => state.auth.uname,
		}),
	},
	data(){
		return {
			currentPath: this.$root.$route.path,
		};
	},
	methods: {
		backHistory(){
			this.$root.$router.back();
		},
		hoge(path, menu_desc, menu_item_inst){
			if (path[0] !== "_") this.$root.$router.push(path);
		},
	},
	mounted: function(){
		console.log(this);
		this.$root.$router.afterEach((to, from) => {
			this.currentPath = to.path;
		});
	},
	watch: {
		$route(to, from){
			//console.log(to,from);
		},
	},
};
</script>

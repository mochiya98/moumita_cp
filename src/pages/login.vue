<style lang="scss" scoped>
.page {
	color: #fff;
	text-align: center;
	* {
		margin: 15px 0;
	}
}
</style>
<template>
	<page-container class="purple">
		<article>
			<h1>ログイン</h1>
			<div>
				<el-button class="el-button--ghost" round :loading="moveWaitTwitter" v-on:click="loginWithTwitter">Login with Twitter</el-button>
			</div>
		</article>
	</page-container>
</template>
<script>
export default {
	components: {},
	data(){
		return {
			moveWaitTwitter: false,
		};
	},
	methods: {
		loginWithTwitter: function(){
			this.moveWaitTwitter = true;
			window.top.location.href =
				"http://mochiya98.starfree.jp/api/v1/login/twitter/auth?callback=moumita_cp";
		},
	},
};
</script>

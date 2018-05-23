<style lang="scss" scoped>
.not-logged-in {
	color: #fff;
	text-align: center;
	> * {
		margin: 15px 10px;
	}
	a {
		color: #fff !important;
	}
}
</style>
<template>
	<article class="not-logged-in">
		<h1 class="hoge">もう見たconnpass</h1>
		<mock-mobile/>
		<p>忙しい人のためのconnpassWebアプリ</p>
		<p>まだ見てないイベント"だけ"チェック出来ます</p>
		<p><i>高速画面遷移,簡単操作,ログイン式だからどんな端末でも見れる,モバイルで使いやすい</i></p>
		<div>
			<el-button class="el-button--ghost" round :loading="checking" v-on:click="moveToLogin">{{ loginBtnText }}</el-button>
		</div>
	</article>
</template>
<script>
import MockMobile from "components/mock-mobile";
export default {
	components: {
		MockMobile,
	},
	computed: {
		checking(){
			return this.$store.state.auth.checking;
		},
		loginBtnText(){
			return this.$store.state.auth.checking
				? "Loading..."
				: "ログインして始める";
		},
	},
	methods: {
		moveToLogin(){
			this.$router.push("/login");
		},
	},
};
</script>

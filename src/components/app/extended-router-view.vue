<template>
	<div class="router-pages">
		<transition name="router-page-trans">
      <keep-alive :exclude="/^events\//">
       <router-view/>
      </keep-alive>
		</transition>
	</div>
</template>
<style lang="scss">
body .el-button--ghost {
	background-color: transparent;
	color: #fff;
	border-width: 1px;
	transition: all 0.2s ease;
	font-size: 1.1em;
	&:hover {
		background-color: #fff;
		color: #0084d1;
		border-width: 1px;
	}
	.purple &:hover {
		color: #8e54e9;
	}
}
.el-card {
	a {
		color: #04f;
		&:hover {
			color: #08f;
		}
	}
}
.el-card__body {
	padding: 0px;
}
</style>
<style lang="scss" scoped>
$container-class: "router-pages";
$trans-class: "router-page-trans";

.#{$container-class} {
	overflow-x: hidden;
	white-space: nowrap;
	min-height: 100vh;
	> * {
		background-color: #00c6ff;
		background: -webkit-linear-gradient(to bottom, #00c6ff, #0072ff);
		background: linear-gradient(to bottom, #00a0ff, #0040ff);
		display: inline-block;
		overflow: hidden;
		vertical-align: top;
		white-space: normal;
		width: 100%;
		margin-top: 60px;
		padding: 30px 0;
		min-height: 100vh;
		background-attachment: fixed;
		z-index: 100;
	}
	> .purple {
		background: #4776e6;
		background: -webkit-linear-gradient(to bottom, #4776e6, #8e54e9);
		background: linear-gradient(to bottom, #4776e6, #8e54e9);
	}
	.#{$trans-class}-leave-active {
		transition: visivility 0.2s;
	}
	.#{$trans-class}-leave > * {
		visibility: visible;
	}
	.#{$trans-class}-leave-to > * {
		visibility: hidden;
	}
	.#{$trans-class}-enter-active {
		transition: transform 0.2s ease;
	}
	.#{$trans-class}-enter {
		transform: none;
	}
	.#{$trans-class}-enter-to {
		transform: translate(-100%, 0);
	}
}
@media screen and (max-width: 470px) {
	.#{$container-class} {
		> * {
			margin-top: 50px;
			padding: 10px 0;
		}
	}
}
</style>
<script>
export default {
	data(){
		return {};
	},
	/*watch: {
		'$route' (to, from) {
			console.log(to,from);
		}
	}*/
};
</script>

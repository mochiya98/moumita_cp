<style lang="scss">
.evlist-main {
	.infinite-status-prompt {
		padding: 0 !important;
	}
}
</style>
<style lang="scss" scoped>
.evlist-main {
	color: #fff;
	text-align: center;
	> * {
		margin: 10px;
	}
}
.box-card {
	width: 100%;
	display: block;
	opacity: 0;
}
.event-card {
	margin: 10px;
}
.event-card--info {
	text-align: center;
	background-color: #fff;
	border-radius: 10px;
	color: #000;
	margin: 10px;
	padding: 10px;
	font-size: 16px;
	font-weight: bold;
	color: #03c;
}
@media screen and (max-width: 470px) {
	.event-card {
		margin: 10px 0;
	}
	.evlist-main {
		> * {
			margin: 10px 0;
		}
	}
}

.list-enter-active,
.list-leave-active {
	transition: all 0.4s;
}
.list-enter {
	opacity: 0;
}
.list-leave-to {
	opacity: 0;
	margin-bottom: -100px;
}
.evlist--animate-dir--right .list-leave-to {
	transform: translateX(100%);
}
.evlist--animate-dir--left .list-leave-to {
	transform: translateX(-100%);
}
</style>
<template>
	<article class="evlist-main" v-bind:class="wrapClass">
		<transition-group tag="div" name="list" infinite-wrapper>
			<section v-for="event in events" :key="event.event_id">
				<cpevent :el-button-type="elButtonType" :el-button-icon="elButtonIcon" :event="event" @action-click="onAction"/>
			</section>
		</transition-group>
		<infinite-loading @infinite="onInfinite" :force-use-infinite-wrapper=true :distance=100 ref="infiniteLoading">
			<template slot="spinner">
					<cpevent v-for="i in 10" el-button-type="info" el-button-icon="el-icon-more" :loading="true" :key="'cpevent-placeholder'+i"/>
			</template>
			<template slot="no-more">
				<div class="event-card--info">これ以上イベントは存在しません</div>
			</template>
			<template slot="no-results">
				<div class="event-card--info">何もリストにありません</div>
			</template>
		</infinite-loading>
	</article>
</template>
<script>
import Cpevent from "components/cpevent";
export default {
	components: {Cpevent},
	computed  : {
		wrapClass(){
			return ["evlist--animate-dir--" + this.animateDir];
		},
	},
	methods: {
		fireInfinite(){
			return this.$refs.infiniteLoading.attemptLoad();
		},
		onAction(event_id){
			this.$emit("action-click", event_id);
		},
		onInfinite($infinite){
			this.$emit("infinite", $infinite);
		},
	},
	props: {
		animateDir: {
			default: "right",
			type   : String,
		},
		elButtonIcon: {
			type: String,
		},
		elButtonType: {
			type: String,
		},
		events: {
			default: [],
			type   : Array,
		},
	},
};
</script>

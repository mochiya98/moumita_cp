<style>
.event-card .el-tag {
	color: #0084d1;
	border-color: #0af;
}
.event-card .el-tag--danger {
	color: #f33;
	border-color: #f66;
}
.event-card .el-tag--info {
	color: #333;
	border-color: #aaa;
}
</style>
<style lang="scss" scoped>
.event-card {
	position: relative;
	top: 0;
	left: 0;
	text-align: left;
	background-color: #fff;
	border-radius: 10px;
	color: #000;
	padding-left: 135px;
	padding-right: 60px;
	overflow: hidden;
	&:after {
		content: " ";
		display: block;
		clear: both;
	}
}
*[data-loading] {
	font-size: 0;
}
*[data-placeholder] {
	border-radius: 3px;
	overflow: hidden;
}
@keyframes pulse {
	0% {
		background-color: rgba(165, 165, 165, 0.1);
	}
	50% {
		background-color: rgba(165, 165, 165, 0.3);
	}
	100% {
		background-color: rgba(165, 165, 165, 0.1);
	}
}
*[data-placeholder] {
	animation-duration: 1s;
	animation-fill-mode: forwards;
	animation-iteration-count: infinite;
	animation-name: pulse;
	animation-timing-function: linear;
	position: relative;
}
.event-datetime-box {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	text-align: center;
	width: 135px;
	height: 60px;
	margin: auto;
	overflow: hidden;
	> [data-placeholder] {
		margin: 0 auto;
	}
	.year[data-placeholder] {
		width: 50px;
		height: 14px;
	}
	.date[data-placeholder] {
		width: 100px;
		height: 20px;
		margin: 5px auto;
	}
	.time[data-placeholder] {
		width: 105px;
		height: 16px;
	}
	.year {
		color: #777;
		font-size: 14px;
		line-height: 14px;
	}
	.date {
		font-weight: bold;
		font-size: 20px;
		line-height: 30px;
		color: #111;
	}
	.time {
		font-size: 16px;
		line-height: 16px;
	}
}
.event-detail-box {
	padding: 10px 0;
	.taglist {
		font-size: 0;
	}
	.taglist > * {
		margin-right: 5px;
	}
	.ev-tag--pcnt[data-placeholder] {
		width: 60px;
	}
	.ev-tag--gname[data-placeholder] {
		width: 100px;
	}
	.el-tag--placeholder {
		height: 24px;
		display: inline-block;
	}
	.title[data-placeholder] {
		width: 200px;
		height: 20px;
		margin: 5px 0;
		display: block;
	}
	.address[data-placeholder] {
		width: 270px;
		height: 14px;
		margin: 1px 0;
		display: inline-block;
	}
	.title {
		font-size: 20px;
		line-height: 30px;
		font-weight: bold;
	}
	.address {
		font-size: 14px;
		line-height: 16px;
	}
}
.event-detail-box {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.event-moumita-box {
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	width: 40px;
	padding: 10px;
}
/*
ココらへんキモいから書き直したい
(クリック判定を広げるためにゴニョゴニョした)
*/
.event-moumita-box > * {
	position: absolute;
	top: 50%;
	left: 10px;
	margin-top: -20px;
}
.address {
	color: #444;
}
@media screen and (max-width: 470px) {
	.event-card {
		padding-left: 10px;
	}
	.event-datetime-box {
		display: none;
	}
	.event-detail-box {
		.title {
			font-size: 16px;
		}
	}
}
</style>
<template>
		<div v-loading="loading && false" :data-loading="loading" class="event-card">
			<div class="event-datetime-box">
				<template v-if="loading">
					<p class="year" data-placeholder></p>
					<p class="date" data-placeholder></p>
					<p class="time" data-placeholder></p>
				</template>
				<template v-else>
					<p class="year">{{start_year}}年</p>
					<p class="date">
						{{start_md}}
						<span :style="dayStyle">({{start_day}})</span></p>
					<p class="time">{{start_hm}}-{{end_hm}}</p>
				</template>
			</div>
			<div class="event-detail-box">
				<template v-if="loading">
					<div class="taglist">
						<div class="el-tag--placeholder ev-tag--pcnt" data-placeholder></div>
						<div class="el-tag--placeholder ev-tag--gname" data-placeholder></div>
					</div>
					<a class="title" data-placeholder></a>
					<p class="address" data-placeholder></p>
				</template>
				<template v-else>
					<div class="taglist">
						<el-tag size="small" :type="tagtype_day" v-show="$mq==='mobile'">{{start_md}}({{start_day}}) {{start_hm}}-{{end_hm}}</el-tag>
						<el-tag size="small" :type="tagtype_pcnt" v-show="$mq!=='mobile'">{{data.pcnt}}{{data.limit===null?"":"/"+data.limit}}</el-tag>
						<el-tag size="small" type="info" v-if="data.group_title!==''">{{data.group_title}}</el-tag>
					</div>
					<h3>
						<router-link :to="'/events/'+data.event_id" class="title">{{data.title}}</router-link>
					</h3>
					<p class="address">{{data.address}}</p>
				</template>
			</div>
			<div class="event-moumita-box" v-on:click="doMoumita">
				<el-button :type="elButtonType" :icon="elButtonIcon" circle></el-button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	created(){
		//createにてcomputedが処理される
		if (!this.event) return;
		let now = Date.now();
		if (this.start_date > now){
			this.status = 1;
		} else if (this.end_date > now){
			this.status = 2;
		} else {
			this.status = 3;
		}
	},
	computed: {
		data(){
			return this.event && this.event.data;
		},
		end_hm(){
			if (this.event){
				var h = ("0" + this.end_date.getHours()).slice(-2);
				var m = ("0" + this.end_date.getMinutes()).slice(-2);
				return `${h}:${m}`;
			}
		},
		start_date(){
			return this.event && new Date(this.data.started_at * 1000);
		},
		end_date(){
			return this.event && new Date(this.data.ended_at * 1000);
		},
		day(){
			return this.start_date.getDay();
		},
		start_day(){
			return this.event && "日月火水木金土"[this.day];
		},
		dayStyle(){
			let style = {
				color: "#030",
			};
			if (this.day === 0) style.color = "#f11";
			if (this.day === 6) style.color = "#04f";
			return style;
		},
		tagtype_day(){
			let type = "info";
			if (this.day === 0) type = "danger";
			if (this.day === 6) type = "";
			return type;
		},
		start_hm(){
			if (this.event){
				var h = ("0" + this.start_date.getHours()).slice(-2);
				var m = ("0" + this.start_date.getMinutes()).slice(-2);
				return `${h}:${m}`;
			}
		},
		start_md(){
			if (this.event){
				var m = ("0" + (this.start_date.getMonth() + 1)).slice(-2);
				var d = ("0" + this.start_date.getDate()).slice(-2);
				return `${m}/${d}`;
			}
		},
		start_year(){
			return this.event && this.start_date.getFullYear();
		},
		status_text(){
			return (
				this.event
				&& {
					0: "？？？",
					1: "開催前",
					2: "開催中",
					3: "終了",
				}[this.status]
			);
		},
		tagtype_pcnt(){
			return this.event
				&& this.data.limit !== null
				&& this.data.pcnt * 1 >= this.data.limit * 1
				? "danger"
				: "";
		},
	},
	data(){
		return {
			status: 0, //e=[？？？,開催前,開催中,終了];
		};
	},
	methods: {
		doMoumita(e){
			if (!this.event) return;
			this.$emit("action-click", this.data.event_id);
		},
	},
	props: {
		elButtonIcon: {
			default: "el-icon-plus",
			type   : String,
		},
		elButtonType: {
			default: "primary",
			type   : String,
		},
		event: {
			default: null,
			type   : Object,
		},
		loading: {
			default: false,
			type   : Boolean,
		},
	},
};
</script>

<style lang="scss">
.event-description {
	h1,
	h2,
	h3,
	h4 {
		margin: 5px 0;
		color: #33f;
	}
	h1 {
		border-bottom: 1px solid #33f;
		font-size: 1.5em;
	}
	h2 {
		border: 3px solid #33f;
		border-width: 0 0 1px 3px;
		font-size: 1.3em;
		padding-left: 5px;
	}
	img {
		max-width: 100%;
	}
	ul {
		margin-left: 1.5em;
	}
	table {
		border-collapse: collapse;
	}
	table tr,
	th,
	td {
		border: 1px solid #99f;
	}
	th {
		background-color: #33f;
		color: #fff;
	}
	th,
	td {
		padding: 5px;
	}
	pre {
		white-space: inherit;
	}
}
</style>
<style lang="scss" scoped>
.event-card,
.history-back-button {
	background-color: #fff;
	border-radius: 10px;
	color: #000;
}
.event-card {
	position: relative;
	top: 0;
	left: 0;
	text-align: left;
	overflow: hidden;
	h1 a {
		color: #009;
		text-decoration: none;
	}
	h1 a:hover {
		color: #02f;
		text-decoration: underline;
	}
	h2 {
		font-size: 1em;
		color: #999;
	}
	> * {
		margin: 10px;
	}
	hr {
		border-width: 0;
		border-bottom: 3px solid #999;
	}
}
.event_meta {
	font-size: 0.9em;
}
.history-back-button {
	margin-top: 10px;
	padding: 15px;
	color: #00f;
	text-decoration: underline;
	text-align: center;
	cursor: pointer;
}
@media screen and (max-width: 470px) {
	.event-card > h1 {
		font-size: 140%;
	}
}
</style>
<template>
	<page-container class="purple">
		<div class="event-card">
			<h1><a :href="event.event_url" target="_blank">{{event.title}}</a></h1>
			<h2>{{event.catch}}</h2>
			<div class="taglist">
				<el-tag size="small" :type="tagtype_pcnt">{{event.pcnt}}{{event.limit===null?"":"/"+event.limit}}</el-tag>
				<el-tag size="small" type="info" v-if="event.group_title!==''">{{event.group_title}}</el-tag>
			</div>
			<hr>
			<div class="event_meta">
				<p class="datetime">{{event_datetime}}</p>
				<p class="address">{{event.address}}</p>
				<p class="place">{{event.place}}</p>
			</div>
			<hr>
			<div class="event-description" v-html="event.description"></div>
		</div>
		<div class="history-back-button" v-on:click="historyBack">
			＜ リストに戻る
		</div>
	</page-container>
</template>
<script>
export default {
	components: {},
	computed  : {
		event(){
			let raw = this.$store.state.event.events.find(
				c => c.event_id - 0 === this.event_id
			);
			let event = raw
				? raw.data
				: {
					address    : "(未指定)",
					catch      : "NULL",
					description:
							"<p style=\"color:red\">[!]イベント詳細は一覧ロード時のキャッシュから読み込んでいるため、このページをリロード/別のタブで開いた時は表示されません。</p><p>connpass公式ページにジャンプするにはタイトルをクリックして下さい。</p>",
					ended_at   : "1527071400",
					event_id   : "85010",
					event_url  : "https://connpass.com/event/" + this.event_id + "/",
					group_title: "Unknown",
					limit      : null,
					pcnt       : "0",
					place      : null,
					started_at : "1527067800",
					title      : "[!]データのないイベントです",
					updated_at : "1523364663",
				};
			if(!raw){
				this.$store.dispatch("event/getEventDetail",{event_id:this.event_id})
			}
			return event;
		},
		event_datetime(){
			let started_dt = new Date(this.event.started_at * 1000);
			let ended_dt = new Date(this.event.ended_at * 1000);
			return (
				started_dt.getFullYear()
				+ "/"
				+ ("0" + (started_dt.getMonth() + 1)).slice(-2)
				+ "/"
				+ ("0" + started_dt.getDate()).slice(-2)
				+ " "
				+ ("0" + started_dt.getHours()).slice(-2)
				+ ":"
				+ ("0" + started_dt.getMinutes()).slice(-2)
				+ "-"
				+ ("0" + ended_dt.getHours()).slice(-2)
				+ ":"
				+ ("0" + ended_dt.getMinutes()).slice(-2)
			);
		},
		tagtype_pcnt(){
			return this.event.limit !== null
				&& this.event.pcnt * 1 >= this.event.limit * 1
				? "danger"
				: "";
		},
	},
	data(){
		return {};
	},
	methods: {
		historyBack(){
			this.$root.$router.back();
		},
	},
	props: {
		event_id: {
			required: true,
			type    : Number,
		},
	},
};
</script>

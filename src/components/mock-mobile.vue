<style lang="scss" scoped>
body .mock-mobile {
	width: 150px;
	height: 218px;
	border: 5px solid #000;
	margin: 0 auto;
	border-radius: 10px;
	overflow: hidden;
	background-color: #06f;
}
.mock-mobile .mock-header {
	height: 20px;
	background-color: #234;
}
.mock-event-card {
	padding: 7px;
	height: 16px;
	background-color: #fff;
	margin: 5px;
	border-radius: 5px;
	position: relative;
	top: 0;
	left: 0;
}
.mock-event-card:before {
	content: "";
	display: block;
	width: 80px;
	height: 6px;
	margin: 2px 0;
	border-radius: 2px;
	background-color: #ccc;
}
.mock-event-card:after {
	content: "";
	display: block;
	position: absolute;
	right: 7px;
	top: 7px;
	width: 16px;
	height: 16px;
	overflow: hidden;
	border-radius: 8px;
	background-color: #f66;
}
.mock-event-card--moumita--1 {
	animation: event-moumita 4s ease -0s infinite;
}
.mock-event-card--moumita--2 {
	animation: event-moumita 4s ease -2.5s infinite;
}
.mock-event-card--moumita--3 {
	animation: event-moumita 4s ease -0.5s infinite;
}
.mock-event-card--moumita--4 {
	animation: event-moumita 4s ease -1s infinite;
}
.mock-event-card--moumita--5 {
	animation: event-moumita 4s ease -2s infinite;
}

.mock-eventdetail-card {
	height: 240px;
	background-color: #fff;
	margin: 5px;
	border-radius: 5px;
	position: relative;
	top: 0;
	left: 0;
	overflow: hidden;
	padding: 5px 10px;
}
.mock-eventdetail-card > hr {
	width: 100%;
	border-width: 0;
	border-bottom: 2px solid #999;
	margin: 10px 0;
}
.mock-eventdetail-card--title {
	display: block;
	width: 110px;
	height: 10px;
	margin: 5px 0;
	border-radius: 2px;
	background-color: #ccc;
}
.mock-eventdetail-card--subtitle {
	display: block;
	width: 90px;
	height: 6px;
	margin: 5px 0;
	border-radius: 2px;
	background-color: #ccc;
}
.mock-eventdetail-card--misc {
	display: block;
	width: 100px;
	height: 6px;
	margin: 5px 0;
	border-radius: 2px;
	background-color: #ccc;
}
.mock-eventdetail-card--detail {
	display: block;
	width: 100px;
	height: 6px;
	margin: 5px 0;
	border-radius: 2px;
	background-color: #ccc;
}
.mock-eventdetail-card--detail-1 {
	width: 110px;
}
.mock-eventdetail-card--detail-2 {
	width: 80px;
}
.mock-eventdetail-card--detail-3 {
	width: 90px;
}
.mock-eventdetail-card--detail-4 {
	width: 70px;
}
.mock-eventdetail-card--detail-5 {
	width: 85px;
}

@keyframes event-moumita {
	0% {
	}
	90% {
		transform: none;
		opacity: 1;
		margin-bottom: 0;
	}
	100% {
		transform: translateX(100%);
		opacity: 0;
		margin-bottom: -35px;
	}
}
.mock-pages {
	white-space: nowrap;
	position: relative;
	top: 0;
	left: 0;
}
.mock-page {
	background-color: #06f;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 208px;
	white-space: normal;
	overflow: hidden;
	vertical-align: top;
}
.mock-pages .mock-page:nth-child(2) {
	transform: translateX(100%);
}
.mock-page--cover-1 {
	z-index: 2;
	animation: pagemove-cover-1 4s ease -0s infinite;
}
.mock-page--cover-2 {
	z-index: 3;
	animation: pagemove-cover-2 4s ease -0s infinite;
}
@keyframes pagemove-cover-1 {
	0% {
		z-index: 2;
	}
	87.49% {
		transform: translateX(0%);
		z-index: 2;
	}
	87.5% {
		transform: translateX(100%);
		z-index: 3;
	}
	100% {
		transform: translateX(0%);
		z-index: 3;
	}
}
@keyframes pagemove-cover-2 {
	0% {
		z-index: 3;
	}
	50% {
		transform: translateX(100%);
		z-index: 3;
	}
	62.5% {
		transform: translateX(0%);
		z-index: 2;
	}
	100% {
		transform: translateX(0%);
		z-index: 2;
	}
}
</style>
<template>
	<div class="mock-mobile">
		<div class="mock-header"></div>
		<div class="mock-pages">
			<template v-if="mode==='moumita'">
					<div class="mock-page">
						<div class="mock-event-card mock-event-card--moumita--1"></div>
						<div class="mock-event-card mock-event-card--moumita--2"></div>
						<div class="mock-event-card mock-event-card--moumita--3"></div>
						<div class="mock-event-card mock-event-card--moumita--4"></div>
						<div class="mock-event-card mock-event-card--moumita--5"></div>
						<div class="mock-event-card"></div>
						<div class="mock-event-card"></div>
					</div>
			</template>
			<template v-if="mode==='full'">
				<div class="mock-page mock-page--cover-1">
					<div class="mock-event-card"></div>
					<div class="mock-event-card mock-event-card--moumita--2"></div>
					<div class="mock-event-card"></div>
					<div class="mock-event-card mock-event-card--moumita--5"></div>
					<div class="mock-event-card"></div>
					<div class="mock-event-card"></div>
					<div class="mock-event-card"></div>
				</div>
				<div class="mock-page mock-page--cover-2">
					<div class="mock-eventdetail-card">
						<div class="mock-eventdetail-card--title"></div>
						<div class="mock-eventdetail-card--subtitle"></div>
						<hr>
						<div class="mock-eventdetail-card--misc"></div>
						<hr>
						<div class="mock-eventdetail-card--detail mock-eventdetail-card--detail-1"></div>
						<div class="mock-eventdetail-card--detail mock-eventdetail-card--detail-2"></div>
						<div class="mock-eventdetail-card--detail mock-eventdetail-card--detail-3"></div>
						<div class="mock-eventdetail-card--detail mock-eventdetail-card--detail-4"></div>
						<div class="mock-eventdetail-card--detail mock-eventdetail-card--detail-1"></div>
						<div class="mock-eventdetail-card--detail mock-eventdetail-card--detail-2"></div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		mode: {
			default: "full",
			type   : String,
		},
	},
};
</script>

<style lang="scss" scoped>

</style>
<template>
	<page-container>
		<evlist :events="moumita_events" @action-click="onAction" @infinite="onInfinite" el-button-type="success" el-button-icon="el-icon-refresh" animate-dir="left" ref="evlist"/>
	</page-container>
</template>
<script>
import Cpevent from "components/cpevent";
import Evlist from "components/evlist";
import {mapGetters} from "vuex";
export default {
	components: {
		Cpevent,
		Evlist,
	},
	computed: {
		...mapGetters({
			moumita_events: "event/moumita_events",
		}),
	},
	methods: {
		onAction(event_id){
			this.$store.dispatch("event/restore", {event_id})
.then(() => {
				this.$refs.evlist.fireInfinite();
			});
		},
		onInfinite($infinite){
			this.$store
				.dispatch("event/getNextMoumita")
				.then(cnt => {
					console.log("getNextMoumita Successful");
					$infinite.loaded();
					if (cnt === 0){
						$infinite.complete();
					}
				})
				.catch(e => {
					$infinite.loaded();
				});
		},
	},
	props: {},
};
</script>

<style lang="scss" scoped>

</style>
<template>
	<evlist :events="unread_events" @action-click="onAction" @infinite="onInfinite" el-button-type="danger" el-button-icon="el-icon-delete" ref="evlist"/>
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
			unread_events: "event/unread_events",
		}),
	},
	methods: {
		onAction(event_id){
			this.$store.dispatch("event/moumita", {event_id})
.then(() => {
				this.$refs.evlist.fireInfinite();
			});
		},
		onInfinite($infinite){
			this.$store
				.dispatch("event/getNextUnread")
				.then(cnt => {
					console.log("getNextUnread Successful");
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

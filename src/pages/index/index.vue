<style lang="scss" scoped>

</style>
<template>
	<page-container>
		<evlist-unread v-if="loggedIn"/>
		<not-logged-in v-else/>
	</page-container>
</template>
<script>
import EvlistUnread from "./evlist-unread";
import NotLoggedIn from "./not-logged-in";
export default {
	components: {
		EvlistUnread,
		NotLoggedIn,
	},
	computed: {
		loggedIn(){
			return this.$store.state.auth.loggedIn;
		},
	},
};
</script>

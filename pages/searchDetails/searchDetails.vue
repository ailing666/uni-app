<template>
	<view>
		<mySearchBar></mySearchBar>
	</view>
</template>

<script>
	import mySearchBar from '../../components/mySearchBar.vue'
	export default {
		components: {
			mySearchBar
		},
		onLoad(options) {
			console.log(options);
		}
	}
</script>

<style scoped>

</style>

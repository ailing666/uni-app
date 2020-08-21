<template>
	<view>
		<mySearchBar :keyword="keyword"></mySearchBar>
		<!-- <input type="text" > -->
	</view>
</template>

<script>
	import mySearchBar from '../../components/mySearchBar.vue'
	export default {
		components: {
			mySearchBar
		},
		data() {
			return {
				keyword: ''
			}
		},
		onLoad(options) {
			this.keyword = options.cat_name
		},
		mounted() {
			console.log(this.keyword);
		}
	}
</script>

<style scoped>

</style>

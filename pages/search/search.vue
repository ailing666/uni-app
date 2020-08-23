<template>
	<view class="search">
		<mySearchBar  @confirm="toSearchList"></mySearchBar>
	</view>
</template>

<script>
	import mySearchBar from '../../components/mySearchBar.vue'
	export default {
		name: 'search',
		components: {
			mySearchBar
		},
		data() {
			return {
				inputVal: ''
			}
		},
		methods: {
			toSearchList(val) {
				console.log('val', val);
				uni.navigateTo({
					url: '/pages/searchList/searchList?cat_name=' + val
				});
			}
		}
	}
</script>

<style lang="less">

</style>

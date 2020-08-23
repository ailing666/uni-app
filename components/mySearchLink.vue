<template>
	<!-- 搜索区域 -->
	<view class="header">
		<view class="search-link" @click="toSearchList(type)">
			<icon type="search" size="20" />
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'search-link',
		data() {
			return {
				type: 'link'
			}
		},
		methods:{
			toSearchList(type) {
				uni.navigateTo({
					url: '/pages/searchList/searchList?type='+type
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.header {
		padding: 20rpx 16rpx;
		background-color: #eb4450;

		.search-link {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			height: 60rpx;
			color: #bbb;
			border-radius: 8rpx;

			icon {
				margin-right: 16rpx;
			}
		}
	}
</style>

<template>
	<view class="search-bar">
		<input type="text" v-model="val">
		<icon class="search-icon" type="search" size="16"></icon>
	</view>
</template>

<script>
	export default {
		name:'search-bar',
		props:{
			keyword:{
				type:String,
			}
		},
		data() {
			return {
				val: this.keyword
			}
		},
		watch: {
		  keyword (newValue) {
		    this.val = newValue
		  }
		}
	}
</script>

<style lang="less" scoped>
.search-bar{
	position: relative;
	overflow: hidden;
	background-color: #eeeeee;
	height: 100rpx;
	input{
		height: 60rpx;
		width: 718rpx;
		margin: 20rpx auto;
	padding-left: 100rpx;
		border-radius: 8rpx;
		background-color: #fff;
	}
	.search-icon {
	  position: absolute;
		top: 34rpx;
	  left: 40rpx;
	}
}
</style>
<template>
	<view class="search-bar">
		<input confirm-type="search" :maxlength="15" v-model="val" @confirm="confirm">
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
		methods:{
			confirm(){
				console.log('this.val',this.val);
				this.$emit('confirm',this.val)
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
	padding: 0 20rpx;
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
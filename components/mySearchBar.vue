<template>
	<view class="search-bar">
		<!-- type:默认text  val:双向绑定的输入框值 @confirm:确认事件-->
		<input type="text" confirm-type="search" :maxlength="15" v-model="val" @confirm="confirm">
		<icon class="search-icon" type="search" size="16"></icon>
	</view>
</template>

<script>
	export default {
		name: 'search-bar',
		props: {
			keyword: {
				type: String,
			}
		},
		data() {
			return {
				val: this.keyword
			}
		},
		methods: {
			confirm() {
				// 触发父组件的confim方法,参数为this.val
				this.$emit('confirm', this.val)
			}
		},
		watch: {
			// 监听父组件传来的keyword,实时赋值给val
			keyword(newValue) {
				this.val = newValue
			}
		}
	}
</script>

<style lang="less" scoped>
	.search-bar {
		position: relative;
		overflow: hidden;
		background-color: #eeeeee;
		height: 100rpx;
		padding: 0 20rpx;

		input {
			height: 60rpx;
			margin: 20rpx auto;
			padding-left: 80rpx;
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

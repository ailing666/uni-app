<template>
	<view class="search-bar">
		<!-- type:默认text  val:双向绑定的输入框值 @confirm:确认事件-->
		<input type="text" confirm-type="search" :maxlength="15" v-model="val" @confirm="confirm">
		<icon class="search-icon" type="search" size="16"></icon>
		<view v-if="val" @click="cancelVal" class="cancel">取消</view>
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
				console.log(this.val);
			},
			cancelVal(){
				this.val = ''
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
		display: flex;
		align-items: center;
		background-color: #eeeeee;
		height: 100rpx;
		padding: 20rpx;

		input {
			flex: 1;
			height: 60rpx;
			padding-left: 80rpx;
			border-radius: 8rpx;
			background-color: #fff;
		}

		.search-icon {
			position: absolute;
			top: 54rpx;
			left: 40rpx;
		}

		.cancel {
			height: 60rpx;
			width: 160rpx;
			margin-left: 20rpx;
			line-height: 60rpx;
			text-align: center;
			border: 1px solid #bfbfbf;
			border-radius: 8rpx;
		}
	}
</style>

<template>
	<view class="my-list">
		<view class="left">
			<slot name="left">
				{{lable}}
			</slot>
		</view>

		<view class="right">
			<slot name="right" class="rs">
				<text :style="{ color: valueColor}">{{value}}</text>
				<text v-if="icon" class="iconfont icon-icon-test18"></text>
			</slot>
		</view>

	</view>
</template>
<script>
	export default {
		name: "my-list",
		props: {
			lable: {
				type: String,
			},
			value: {
				type: String,
			},
			valueColor: {
				type: String
			},
			icon: {
				default: false
			}
		},
		data() {
			return {}
		}
	}
</script>

<style lang="less" scoped>
	.my-list {
		display: flex;
		align-items: center;
		height: 100rpx;
		padding: 20rpx 15rpx;
		box-sizing: border-box;

		.right {
			flex: 1;
			margin-left: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.iconfont {
				font-size: 50rpx;
			}

		}
	}
</style>

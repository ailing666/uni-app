<template>
	<view class="my-list">
		<view class="left">
			<slot name="left">
				{{title}}
			</slot>
		</view>

		<view class="right">
			<slot name="right">
				{{value}}
				<text>></text>
			</slot>
		</view>

	</view>
</template>
<script>
	export default {
		name: "my-list",
		props: {
			title: {
				type: ['String', 'Number'],
			},
			value: {
				type: String,
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
		padding: 20rpx 15rpx;

		.left {}

		.right {
			flex: 1;
			margin-left: 40rpx;
			text{
				
			}
		}
	}
</style>

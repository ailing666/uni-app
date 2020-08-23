<template>
	<view class="shop-cart">
		<myList lable="收货人:苏" value="15811111111" icon></myList>
		<myList lable="收货地址" value="广东省xx省xx市xx路xx号"></myList>
		<image class="cart-border" src="../../static/images/cart_border@2x.png" mode=""></image>
		<view class="main">
			<view class="shop">
				<text class="iconfont icon-icon-test6"></text>
				优购生活馆
			</view>
			<view class="goods">
				<radio :value="value" :checked="index === current" />
			</view>
		</view>
	</view>
</template>

<script>
	import myList from '../../components/myList.vue'
	export default {
		name: 'shop-cart',
		components: {
			myList
		},
		data() {
			return {
				value:''
			}
		},
		onLoad(options){
			this,getCartGoodsList(options.goods_ids)
		},
		methods:{
			async getCartGoodsList(goods_ids){
				this.cartGoodsList = await this.$request({
					url:'/api/public/v1/goods/goodslist?goods_ids='+goods_ids
				})
			}
		}
	}
</script>

<style lang="less">
	.shop-cart {
		.cart-border {
			width: 100vw;
			height: 12rpx;
		}

		.main {
			.shop {
				.iconfont {}
			}
		}
	}
</style>

<template>
	<view class="shop-cart">
		<myList lable="收货人:苏" value="15811111111" icon></myList>
		<myList lable="收货地址" value="广东省xx省xx市xx路xx号"></myList>
		<image class="cart-border" src="../../static/images/cart_border@2x.png" mode=""></image>
		<view class="main">
			<!-- 店铺 -->
			<view class="shop">
				<text class="iconfont icon-icon-test6"></text>
				优购生活馆
			</view>
			<!-- 商品 -->
			<view class="goods" v-for="item in cartGoodsList" :key="item.goods_id">
				<view class="left">
					<radio @click="isChecked=!isChecked" :checked="isChecked" color="#eb4450" />
					<image :src="item.goods_small_logo" mode=""></image>
				</view>
				<view class="right">
					<text class="goods_name">{{item.goods_name}}</text>
					<view class="buttom">
						<text class="goods_price">$<text>{{item.goods_price}}</text>.00</text>
						<!-- 按钮 -->
						<view class="goods-num">
							<button @click="decNum(item)" class="dec" size="mini">-</button>
							<input type="text" v-model="num" />
							<button @click="addNum(item)" class="add" size="mini">+</button>
						</view>
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="cart-buttom">
				<view class="choose">
					<radio @click="isChecked=!isChecked" :checked="isChecked" color="#eb4450" />
					全选
				</view>
				<view class="sum">
					合计:{{sum}}
				</view>
				<view class="pay">
					结算
				</view>
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
				num: 1,
				sum:0,
				cartGoodsList: [],
				isChecked: false
			}
		},
		onLoad(options) {
			this.getCartGoodsList(options.goods_ids)
		},
		watch:{
			num(newVal,oldVal){
			}
		},
		methods: {
			// 获取购物车要展示的
			async getCartGoodsList(goods_ids) {
				this.cartGoodsList = await this.$request({
					url: '/api/public/v1/goods/goodslist?goods_ids=' + 140 +','+359
				})
			},
			// 减少
			decNum(item) {
				console.log(item);
				item[num] = this.num
				console.log(item[num]);
				this.num && this.num--
			},
			// 增加
			addNum(item) {
				console.log(item);
				this.num <= 99 && this.num++
			}
		}
	}
</script>

<style lang="less">
	.shop-cart {
		padding-bottom: 90rpx;

		.cart-border {
			width: 100vw;
			height: 12rpx;
		}

		.main {
			.shop {
				height: 90rpx;
				line-height: 90rpx;

				.iconfont {
					margin: 0 16rpx;
				}
			}

			.goods {
				height: 206rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #eee;
				padding: 20rpx;

				.left {
					radio {}

					image {
						width: 162rpx;
						height: 162rpx;
						vertical-align: middle;
					}
				}

				.right {
					flex: 1;

					.goods_name {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						margin-bottom: 20rpx;
					}

					.buttom {
						display: flex;
						justify-content: space-between;

						.goods_price {
							color: #eb4450;

							text {
								font-size: 40rpx;
							}
						}

						.goods-num {
							display: flex;

							.dec,
							.add {
								text-align: center;
							}

							input {
								text-align: center;
								width: 70rpx;
							}

							.add {}
						}
					}
				}
			}

			.cart-buttom {
				display: flex;
				align-items: center;
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100vw;
				height: 90rpx;

				.choose {
					flex: 1;
					height: 90rpx;
				}

				.sum {
					flex: 1;
					height: 90rpx;
				}

				.pay {
					flex: 1;
					height: 90rpx;
					text-align: center;
					line-height: 90rpx;
					background-color: #EB4450;
				}
			}
		}
	}
</style>

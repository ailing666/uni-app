<template>
	<view class="goods-details">
		<!-- 商品信息 -->
		<view class="g-info">
			<!-- 轮播图 -->
			<swiper indicator-dots :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in goodsDetailsList.pics" :key="index">
					<image :src="item.pics_big" mode="heightFix"></image>
				</swiper-item>
			</swiper>
			<!-- 价格 -->
			<text class="g-price">${{goodsDetailsList.goods_price}}</text>
			<view class="g-info">
				<text class="g-name">{{goodsDetailsList.goods_name}}</text>
				<view class="star">
					<icon type="clear"></icon>
					<text>收藏</text>
				</view>
			</view>
			<view class="express">
				快递:<text>免运费</text>
			</view>

		</view>
		<!-- 卡片 -->
		<view class="g-card">
			<view class="promotion">
				
			</view>
			<view class="choose">
			</view> 
		</view>
		<!-- 地址 -->
		<view class="address">

		</view>
		<!-- tab栏 -->
		<view class="tabs">

		</view>
		<!-- 底部 -->
		<view class="buttom">
			<view class="kefu">

			</view>
			<view class="shopcart">

			</view>
			<view class="add-cart">

			</view>
			<view class="buy">

			</view>
		</view>
	</view>
</template>

<script>
	import myList from '../../components/myList.vue'
	export default {
		name: "goods-details",
		components: {
			myList
		},
		data() {
			return {
				goodsDetailsList: []
			}
		},
		onLoad(options) {
			this.getGoodsDetails(options.goodsId)
		},
		methods: {
			async getGoodsDetails(id) {
				this.goodsDetailsList = await this.$request({
					url: '/api/public/v1/goods/detail?goods_id=' + id
				})
			}
		}
	}
</script>

<style lang="less">
	.goods-details {
		background-color: #f4f4f4;

		.g-info {
			background-color: #fff;

			swiper {
				height: 722rpx;


				swiper-item {
					image {
						height: 722rpx;
					}
				}
			}

			.g-price {
				font-size: 40rpx;
				color: #eb4450;
			}

			.g-info {
				height: 90rpx;
				display: flex;

				.g-name {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.star {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 148rpx;
					margin-left: 70rpx;

					text {
						margin-top: 8rpx;
					}
				}
			}

			.express {
				color: #a5a5a5;
			}
		}

		.g-card {
			background-color: #fff;
			margin-top: 20rpx;

			.promotion {}

			.choose {}
		}

		.address {}

		.tabs {}

		.buttom {
			.kefu {}

			.shopcart {}

			.add-cart {}

			.buy {}
		}
	}
</style>

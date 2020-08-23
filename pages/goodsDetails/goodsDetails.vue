<template>
	<view class="goods-details">
		<!-- 商品信息 -->
		<view class="g-info">
			<!-- 轮播图 -->
			<swiper indicator-dots :interval="3000" :duration="1000" circular indicator-active-color="#fff" indicator-color="rgba(255,255,255,.5)">
				<swiper-item @click="toPreview(index)" v-for="(item,index) in goodsDetailsList.pics" :key="index">
					<image :src="item.pics_big" mode="heightFix"></image>
				</swiper-item>
			</swiper>
			<!-- 价格 -->
			<text class="g-price">${{goodsDetailsList.goods_price}}</text>
			<view class="g-info">
				<text class="g-name">{{goodsDetailsList.goods_name}}</text>
				<view class="share">
					<text @click="isStar=!isStar" class="iconfont" :class="{'icon-icon-test14':isStar,'icon-icon-test13':!isStar}"></text>
					<!-- 只有按钮能触发分享弹框 -->
					<button hover-class='none' open-type="share">分享</button>
				</view>
			</view>
			<view class="express">
				快递:<text>免运费</text>
			</view>

		</view>
		<!-- 卡片 -->
		<view class="g-card">
			<view class="promotion">
				<myList lable="促销" value="满300减30元" valueColor="#eb4450"></myList>
			</view>
			<view class="choose">
				<myList lable="已选" value="黑色/s/1件"></myList>
			</view>
		</view>
		<!-- 地址 -->
		<view class="address">
			<myList lable="送至" value="广东省 广州市 海珠区" icon></myList>
		</view>
		<!-- tab栏 -->
		<view class="tabs">
			<view @click="setIndex(index)" :class="{active:activeIndex===index}" v-for="(item,index) in tabList" :key="index">{{item}}</view>
		</view>
		<view class="content">
			<!-- 图文 -->
			<view v-show="!activeIndex" v-html="goodsDetailsList.goods_introduce"></view>
			<!-- 规格 -->
			<view v-show="activeIndex" class="attrs-table" v-for="(item,idnex) in goodsDetailsList.attrs" :key="index">
				<view class="my-tr">
					<view class="my-td">{{item.attr_name}}</view>
					<view class="my-td">{{item.attr_vals}}</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="buttom">
			<view class="kefu">
				<text class="iconfont icon-kefu"></text>
				<text>联系客服</text>
			</view>
			<view class="shopcart">
				<text class="iconfont icon-icon-test3"></text>
				<text>购物车</text>
			</view>
			<view class="add-cart">
				加入购物车
			</view>
			<view class="buy">
				立即购买
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
				isStar: false,
				// tab栏列表
				tabList: ['图文介绍', '规格参数'],
				// 商品详情列表
				goodsDetailsList: [],
				// 点击的索引
				activeIndex: 0
			}
		},
		onLoad(options) {
			this.getGoodsDetails(options.goodsId)
		},
		methods: {
			// 获取商品详情
			async getGoodsDetails(id) {
				this.goodsDetailsList = await this.$request({
					url: '/api/public/v1/goods/detail?goods_id=' + id
				})
			},
			// 设置点击索引
			setIndex(index) {
				this.activeIndex = index
			},
			// 点击预览图片
			toPreview(index) {
				// 将商品详情中的图片地址存到urls中
				let urls = this.goodsDetailsList.pics.map(item => item.pics_big)
				uni.previewImage({
					current: index, //索引
					urls //地址数组
				});
			},
			// 自定义分享弹窗
			onShareAppMessage() {
				return {
					title: this.goodsDetailsList.goods_name,
					desc: '芝麻开门'
				};
			},
		}
	}
</script>

<style lang="less">
	.goods-details {
		background-color: #f4f4f4;
		padding-bottom: 100rpx;

		.g-info {
			background-color: #fff;

			swiper {
				height: 722rpx;
				margin-bottom: 20rpx;

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
				margin: 20rpx 0;
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

				.share {
					display: flex;
					flex-direction: column;
					align-items: center;
					border-left: 1px solid #eee;
					width: 148rpx;
					margin-left: 70rpx;
					color: #9b9a9b;

					button {
						background-color: #fff;
						font-size: 26rpx;
						line-height: 1.5;

						&::after {
							border: none;
						}
					}

					.iconfont {
						font-size: 40rpx;
					}

					text {
						margin-top: 8rpx;
					}
				}
			}

			.express {
				color: #a5a5a5;
				margin-bottom: 20rpx;
			}
		}

		.g-card {
			background-color: #fff;
			margin-top: 20rpx;

			.promotion {}

			.choose {}
		}

		.address {
			margin: 20rpx 0;
			background-color: #fff;
		}

		.tabs {
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 100rpx;
			background-color: #fff;
			text-align: center;

			view {
				width: 50%;
				height: 96rpx;
				line-height: 96rpx;
			}

			.active {
				&::after {
					content: '';
					display: block;
					border-bottom: 8rpx solid #EB4450;
				}
			}
		}

		.content {
			padding: 10rpx;
			background-color: #fff;

			.attrs-table {
				margin-bottom: -3rpx;

				.my-tr {
					display: flex;
				}

				.my-td {
					flex: 1;
					height: 88rpx;
					line-height: 88rpx;
					text-align: center;
					width: 334rpx;
					border: 1px solid #cdcdcd;

					&:last-child {
						text-align: left;
						text-indent: 50rpx;
						margin-left: -1rpx;
					}
				}
			}
		}

		.buttom {
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			height: 92rpx;
			width: 100vw;
			background-color: #fff;
			z-index: 999;

			.kefu,
			.shopcart {
				flex: 2;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.shopcart {}

			.add-cart,
			.buy {
				flex: 3;
				line-height: 92rpx;
				text-align: center;
				color: #fff;
			}

			.add-cart {
				background-color: #ffae00;
			}

			.buy {
				background-color: #ff2d4a;
			}
		}
	}
</style>

<template>
	<div class="home">
		<!-- 搜索框 -->
		<view class="search-link">
			<view class="inner">
				<icon type="search" size="16"></icon>
				<text>搜索</text>
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper indicator-dots autoplay :interval="3000" :duration="1000">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<image :src="item.image_src" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 导航栏 -->
		<view class="nav">
			<image v-for="(item,index) in catitemsList" :key="index" :src="item.image_src"></image>
		</view>
		<!-- 楼层 -->
		<view class="floor">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<image class="floor-title" :src="item.floor_title.image_src"></image>
				<view class="floor-list">
						<image :src="item.product_list[0].image_src" mode=""></image>
					<view class="right">
						<block  v-for="(item2,index2) in item.product_list" :key="index2">
						<image v-show="index2" :src="item2.image_src" mode=""></image>
						</block>
					</view>
				</view>
			</view>
		</view>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				catitemsList: [],
				floorList: []
			}
		},
		onLoad() {
			this.getSwiperList()
			this.getCatitemsList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				this.swiperList = await this.$request({
					url: '/api/public/v1/home/swiperdata'
				})
			},
			async getCatitemsList() {
				this.catitemsList = await this.$request({
					url: '/api/public/v1/home/catitems'
				})
			},
			async getFloorList() {
				this.floorList = await this.$request({
					url: '/api/public/v1/home/floordata'
				})
			}
		}
	}
</script>

<style lang="less">
	.home {

		// 搜索框
		.search-link {
			height: 100rpx;
			padding: 20rpx 16rpx 0 16rpx;
			box-sizing: border-box;
			background-color: #ff2d4a;

			.inner {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #fff;
				height: 60rpx;
				border-radius: 8rpx;
				text-align: center;

				icon {
					margin: 16rpx;
				}
			}
		}

		// 轮播图
		swiper {
			height: 340rpx;

			swiper-item {
				image {
					width: 100vw;
					height: 100%;
				}
			}
		}

		// 导航栏
		.nav {
			height: 190rpx;
			width: 100vw;
			display: flex;
			align-items: center;
			justify-content: space-around;

			image {
				width: 20%;
				height: 150rpx;
			}
		}

		// 楼层
		.floor {
			.floor-item {
				>image {
					width: 100vw;
					height: 88rpx;
				}

				.floor-list {
					display: flex;

						>image {
							width: 232rpx;
							height: 386rpx;
						}

					.right {
						height: 386rpx;
						flex: 1;
						display: flex;
						flex-wrap: wrap;

						>image {
							width: 232rpx;
							height: 188rpx;
							margin:  0 0 10rpx 10rpx;
						}
					}
				}
			}
		}
	}
</style>

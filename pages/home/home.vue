<template>
	<view class="home">
		<mySearchLink></mySearchLink>
		<!-- 轮播图 -->
		<swiper indicator-dots autoplay indicator-color="rgbs(255,255,255,.5)" indicator-active-color="#fff" :interval="3000"
		 :duration="1000">
			<swiper-item v-for="item in swiperList" :key="goods_id">
				<image :src="item.image_src"></image>
			</swiper-item>
		</swiper>
		<!-- 子导航 -->
		<view class="sub-nav">
			<view class="nav-list" v-for="(item,index) in subNavList" :key="index">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<view class="floor" v-for="(item,index) in floorList" :key="index">
			<!-- 楼层列表 -->
			<view class="f-title">
				<image :src="item.floor_title.image_src"></image>
			</view>
			<view class="f-content" v-for="(item,index) in item.product_list" :key="index">
				<image :src="item.image_src"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import mySearchLink from '../../components/mySearchLink.vue'
	export default {
		name:'home',
		components: {
			mySearchLink
		},
		data() {
			return {
				// 轮播图列表
				swiperList: [],
				// 子导航列表
				subNavList: [],
				// 楼层列表
				floorList: []
			}
		},
		onLoad() {
			// 页面加载后调用数据
			this.getSwiperList()
			this.getsubNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				this.swiperList = await this.$request({
					url: '/api/public/v1/home/swiperdata'
				})
			},
			async getsubNavList() {
				this.subNavList = await this.$request({
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

		/* 轮播图 */
		swiper {
			width: 100vw;
			height: 340rpx;

			swiper-item {
				image {
					width: 100%;
					height: 340rpx;
				}
			}
		}

		/* 子导航 */
		.sub-nav {
			display: flex;
			align-items: center;
			height: 194rpx;

			.nav-list {
				width: 25%;
				text-align: center;

				image {
					width: 128rpx;
					height: 140rpx;
				}
			}
		}

		float: left;

		.floor {
			overflow: hidden;

			.f-title {
				margin: 10rpx 0;

				image {
					width: 100vw;
					height: 88rpx;
				}
			}

			.f-content {
				float: left;

				image {
					width: 232rpx;
					height: 386rpx;
					margin-right: 10rpx;
				}

				&:nth-child(n+3) {
					width: 232rpx;
					height: 188rpx;
					margin-right: 10rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				&:nth-last-child(-n+2) {
					margin-top: 10rpx;
				}
			}
		}
	}
</style>
